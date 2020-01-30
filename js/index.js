const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let topMovies = [{
    title: 'Der Untergang',
    director: 'Oliver Hirschbiegel'
  },
  {
    title: 'Matrix',
    director: 'The Wachowski Brothers'
  },
  {
    title: 'Judgment at Nuremberg',
    director: 'Stanley Kramer'
  },
  {
    title: 'Once Upon a Time in The West',
    director: 'Sergio Leone'
  },
  {
    title: 'The Godfather',
    director: 'Francis Ford Coppola'
  },
  {
    title: 'Trainspotting',
    director: 'Danny Boyle'
  },
  {
    title: 'Fight Club',
    director: 'David Fincher'
  },
  {
    title: 'Tropa de Elite',
    director: 'Jose Padilha'
  },
  {
    title: 'Spartacus',
    director: 'Stanley Kubrick'
  },
  {
    title: 'The Keeper of Lost Causes - Wikipedia',
    director: 'Mikkel Nørgaard'
  }
]

// GET requests
app.get('/', function(req, res) {
  res.send('This is the success phrase of the movieclub!')
});

app.use(express.static('public'));

app.get('/movies', function(req, res) {
  res.json(topMovies)
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
