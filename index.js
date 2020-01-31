const path = require("path");

const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  mongoose = require("mongoose"),
  passport = require("passport");
require("./passport");

const { check, validationResult } = require("express-validator");

const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;

const app = express();
const cors = require("cors");

// mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});
mongoose.connect(
  "mongodb+srv://admin:mongoMyApp@flixnewmongodb-da9ev.mongodb.net/myFlixDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.use("/client", express.static(path.join(__dirname, "client", "dist")));
app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use(cors());
const auth = require("./auth")(app);

// Get all movies
// app.get('/movies', function(req, res) {
// removal of passport.authenticate
app.get("/movies", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Movies.find()
    .then(function(movies) {
      res.status(201).json(movies);
    })
    .catch(function(err) {
      console.error(err);
      res.status(502).send("Error " + err);
    });
});

// Get movie by title
app.get(
  "/movies/:title",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne({ title: req.params.title })
      .then(function(movie) {
        res.json(movie);
      })
      .catch(function(err) {
        console.error(err);
        res.status(502).send("Error " + err);
      });
  }
);

// Gets the data about a movie genre by name
app.get(
  "/movies/genres/:name",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne({ "genre.name": req.params.name })
      .then(function(movie) {
        res.json(movie.genre);
      })
      .catch(function(err) {
        console.error(err);
        res.status(502).send("Error " + err);
      });
  }
);

// Gets the data about a director by name
app.get(
  "/movies/directors/:name",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Movies.findOne({ "director.name": req.params.name })
      .then(function(movie) {
        res.json(movie.director);
      })
      .catch(function(err) {
        console.error(err);
        res.status(502).send("Error " + err);
      });
  }
);

// Get a user info by username
app.get(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Users.findOne({ username: req.params.username })
      .then(function(user) {
        res.json(user);
      })
      .catch(function(err) {
        console.error(err);
        res.status(502).send("Error: " + err);
      });
  }
);

// Adds new user
app.post(
  "/users",
  [
    check("username", "username is a required field").isLength({ min: 5 }),
    check(
      "username",
      "Username contains non-alphanumeric characters"
    ).isAlphanumeric(),
    check("password", "Password is a required field")
      .not()
      .isEmpty(),
    check("email", "This is not a valid email").isEmail()
  ],
  (req, res) => {
    var errors = validationResult(req); // check the validation object for errors
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var hashedPassword = Users.hashPassword(req.body.password);
    Users.findOne({ username: req.body.username }) // Search to see if a user with the requested username already exists
      .then(function(user) {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(401).send(req.body.username + " already exists");
        } else {
          Users.create({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            birthday: req.body.birthday
          })
            .then(function(user) {
              res.status(201).json(user);
            })
            .catch(function(error) {
              console.error(error);
              res.status(502).send("Error: " + error);
            });
        }
      })
      .catch(function(error) {
        console.error(error);
        res.status(502).send("Error: " + error);
      });
  }
);

//Update user's info by username
app.put(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    var hashedPassword = Users.hashPassword(req.body.password);
    Users.findOneAndUpdate(
      { username: req.params.username },
      {
        $set: {
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          birthday: req.body.birthday
        }
      },
      { new: true }, // This line makes sure that the updated document is returned
      function(err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(502).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Delete a user by username
app.delete(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Users.findOneAndRemove({ username: req.params.username })
      .then(function(user) {
        if (!user) {
          res.status(400).send(req.params.username + " was not found");
        } else {
          res.status(200).send(req.params.username + " was deleted.");
        }
      })
      .catch(function(err) {
        console.error(err);
        res.status(502).send("Error: " + err);
      });
  }
);

// Add a movie to a user's list of favorites OK
app.post(
  "/users/:username/movies/:movieId",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Users.findOneAndUpdate(
      { username: req.params.username },
      {
        $push: { favorites: req.params.movieId }
      },
      { new: true }, // This line makes sure that the updated document is returned
      function(err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(502).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Remove  a movie from favorites
app.delete(
  "/users/:username/:movies/:movieId",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Users.findOneAndUpdate(
      {
        favorites: req.params.movieId
      },
      {
        $pull: {
          favorites: req.params.movieId
        }
      },
      {
        new: true
      },
      function(err, updatedFavorites) {
        if (err) {
          console.error(err);
          res.status(500).send("Users.findOneandUPdate " + err);
        } else {
          res.json(updatedFavorites);
        }
      }
    );
  }
);

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
});
