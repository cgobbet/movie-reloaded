![myFlix, a React Movie Search app](https://i.imgur.com/DWVNjzd.jpg "myFlix, a React Movie Search app")

<body>
  <h1>myFlix - the app</h1>
  <p>This is the document intended to store details about the application myFlix. The app is a lean REST API that allows users to target movies following specific criteria (yet to be added to this document). This file contains technical details
    needed for maintenance, operation or improvement of the app by users and developers and also state the application's public, features, goals, environment and rationale. </p>
  <p>The app is hosted on a server with some technologies (like JavaScript, Node.js, Express, Mongo DB)
    and can be accessed via HTTP methods at any given time. The whole development process of the toll can be found at a different repository, <a href="https://github.com/cgobbet/movie_api" target="_blank">movie_api</a>, at the point of deployment to Heroku. The whole history of the development is documented there.</p>
    
Check the working app looking for  [it on my portfolio](https://cassiano.zeitgeist.digital), under the tab "Projects".

  <h2>Features</h2>
  <p>
    - allows users to sign up, update their own info and delete account if he/she wishes.</br>
    - allows users to check all movies in the database</br>
    - allows users to perform searches by movie title.</br>
    - allows users to perform searches by movie director.</br>
    - allows users to perform searches to get movie directors</br> information.</br>
    - allows users to add and remove movies into their favorites’ lists.
  </p>
  <h2>Dependencies</h2>
  <p>The tool uses the following packages to run effectively (all available on <a href="https://www.npmjs.com/" target="_blank">NPM</a>). You will need to make the installation of the dependencies first in the <pre><code>root</pre></code> level and after in <pre><code>client</pre></code>. This way, all Node-related and React-related packages will give you a full-featured performance.
  <h2>Endpoints</h2>
  <p>Here you can find a list of the endpoints provided in the app, alreday adjusted to the syntax from Mongoose. Further detailsare available whenever possible.</p>
  <h3>All movies</h3>
  <p><strong>Description: </strong>Retrieves a list with all movies in the database.</p>
  <p><strong>Endpoint: </strong>/movies</p>
  <p><strong>Method:&nbsp;</strong>GET</p>
  <p><strong>Query parameters:</strong>&nbsp;none</p>
  <p><strong>Request body data format:</strong>&nbsp;None</p>
  <p><strong>Response body data format: </strong>A&nbsp;JSON Object holding data about all movies in the database.</p>
  <p><strong>Request example:&nbsp;</strong>localhost:8080/movies/</p>
  <p><strong>Response example:&nbsp;</strong></p>
  <pre><code>[
    {
        "id": 1,
        "title": "Night of the Living Dead",
        "genre": "Classical",
        "director": {
            "name": "George P. Romero",
            "bio": "Lorem ipsum dolor sit amet",
            "birth": "01/01/1900",
            "death": "01/01/1900"
        },
        "imgUrl": "https://z.com/1/img/thumb.jpg"
    },
    {
        "id": 2,
        "title": "28 days later",
        "genre": "Apocalypse",
        "director": {
            "name": "Danny Boyle",
            "bio": "Lorem ipsum dolor sit amet consectetur",
            "birth": "01/01/1900",
            "death": "01/01/1900"
        },
        "imgUrl": "https://z.com/2/img/thumb.jpg"
    },
    {
        "id": 3,
        "title": "Cell",
        "genre": "Apocalypse",
        "director": {
            "name": "Christopher Hatton",
            "bio": "ipsum dolor sit",
            "birth": "01/01/1900",
            "death": "01/01/1900"
        },
        "imgUrl": "https://z.com/3/img/thumb.jpg"
    }
]</code>&nbsp;</pre>
  <h3>Find movie by title</h3>
  <p><strong>Description: </strong>Retrieves movie searched by title.</p>
  <p><strong>Endpoint: </strong>/movies/[movie title]</p>
  <p><strong>Method:&nbsp;</strong>GET</p>
  <p><strong>Query parameters:</strong>&nbsp;[title] of the movie</p>
  <p><strong>Request body data format:</strong>&nbsp;None</p>
  <p><strong>Response body data format: </strong>A JSON Object holding data about a specified movie.</p>
  <p><strong>Request example:&nbsp;</strong>http://localhost:8080/movies/Cell</p>
  <p><strong>Response example:&nbsp;</strong>A JSON Object holding information about movies with a specific title.</p>
  <pre><code>{
    "id": 3,
    "title": "Cell",
    "genre": "Apocalypse",
    "director": {
        "name": "Christopher Hatton",
        "bio": "ipsum dolor sit",
        "birth": "01/01/1900",
        "death": "01/01/1900"
    },
    "plot": "Lorem ipsum dolor sit amet consectetur adipiscing."
}</code></pre>
  <p>&nbsp;</p>
  <h3>Genre description</h3>
  <p><strong>Description: </strong>Retrieves the description of a specific genre.</p>
  <p><strong>Endpoint: </strong>/movies/genres/[genre name]</p>
  <p><strong>Method:&nbsp;</strong>GET</p>
  <p><strong>Query parameters:</strong>&nbsp;[genre] of the movie</p>
  <p><strong>Request body data format:</strong>&nbsp;None</p>
  <p><strong>Response body data format:&nbsp;</strong>JSON Object holding name and description of a specific genre</p>
  <p><strong>Request example:&nbsp;</strong>http://localhost:8080/movies/Classical</p>
  <p><strong>Response example:</strong></p>
  <pre><code>{
  "name": "Horror",
  "description": "Horror is a genre of speculative fiction which is intended to frighten, scare, disgust, or startle its readers by inducing feelings of horror and terror. Literary historian J. A. Cuddon defined the horror story as 'a piece of fiction in prose of variable length. which shocks, or even frightens the reader, or perhaps induces a feeling of repulsion or loathing.'"
}</code></pre>
  <h3>Movies by Director</h3>
  <p><strong>Description: </strong>Retrieves inofrmation available about a specific director, by name.</p>
  <p><strong>Endpoint:</strong> /movies/directors/[director name]</span></p>
  <p><strong>Method:&nbsp;</strong>GET</p>
  <p><strong>Query parameters:</strong>&nbsp;[name] of a specific directors.</p>
  <p><strong>Request body data format:</strong>&nbsp;None</p>
  <p><strong>Response body data format:&nbsp;</strong>A JSON Object holding information about ba specific director.</p>
  <p><strong>Request example:&nbsp;</strong>http://localhost:8080/movies/directors/George%20A.%20Romero</p>
  <p><strong>Response example:&nbsp;</strong>.</p>
  <pre><code>{
  "name": "George A. Romero",
  "bio": "George A. Romero, in full George Andrew Romero, was an American film director, writer, and producer best known for his contributions to the horror movie genre. Romero created a niche inside horror with his movies about zombies. Zombies today play a significant part of the 'Horror' genre and are consolidated as a solid part of the Western pop culture. The growth is explained by antrologists with the silent fear of total annihilation that mankind started to have with the danger of a nuclear was during the Cold War.",
  "birth": 1940,
  "death": 2017
}</code></pre>
  <h3>Add New User</h3>
  <p><strong>Description: </strong>Allows the inclusion a new entry in the users database cointaining username, email, password and birth date.</p>
  <p><strong>Endpoint: </strong>/users</p>
  <p><strong>Method:&nbsp;</strong>POST</p>
  <p><strong>Query parameters:</strong>&nbsp;(see below)</p>
  <p><strong>Request body data format:</strong>&nbsp;A JSON holding data about the new user:</p>
  <pre><code>{
	"username" : "JohnJapa",
	"password" : "lovemaster12",
	"email" : "japasforgood@gmail.com",
	"birthday" : "1975-03-13",
}</code></pre>
  <p><strong>Response body data format: </strong>Text message confirming the inclusion was successful, the data inserted, the Mongoose version and the ID generated by the system.</p>
  <p><strong>Response example:&nbsp;</strong></p>
  <pre><code>{
    "favorites": [],
    "_id": "5dbda139b2d8c71854a9c7f2",
    "username": "alsebiades.mormont",
    "password": "greece_meets_westeros",
    "email": "mormont@thewall.com",
    "birthday": "1985-03-13T00:00:00.000Z",
    "__v": 0
}</code></pre>
  <h3>Update user information</h3>
  <p><strong>Description: </strong>feature allowing users to update thei information, searched by name.</p>
  <p><strong>Endpoint: </strong>/users/[username]</p>
  <p><strong>Method:&nbsp;</strong>PUT</p>
  <p><strong>Query parameters:</strong> the new data to be included, ina  JSON format.</p>
  <p><strong>Request body data format:</strong>A JSON object with the information to be changed.</p>
  <p><strong>Request example:</strong><pre><code>  {
    "username" : "NewRandall08",
    "password" : "Newrandal2",
    "email" : "NewwNienow@Goyette.info",
    "birthday" : "1980-01-02"
  }</code></pre>
  <p><strong>Response body data format:</strong> A JSON object with the information updated.</p>
  <p><strong>Response example:</strong><pre><code>{
    "favorites": [],
    "_id": "5dbc5b9a4a89f015eeed2cff",
    "username": "Randall08",
    "password": "NewrNewtonNew11",
    "email": "Randall@gmail.com",
    "birthday": "1980-01-02T00:00:00.000Z"
}</code></pre></p>

  <h3>Add movie to user favorites' list</h3>
  <p><strong>Description: </strong>Includes new item in the user's favorite movies list.&nbsp;</p>
  <p><strong>Endpoint: </strong>/users/[username]/favorites/[movieId]</p>
  <p><strong>Method:</strong>POST</p>
  <p><strong>Query parameters:</strong>&nbsp;[ID] of the movie.</p>
  <p><strong>Request body data format:</strong>&nbsp; the unique ID of the movie to be inserted.</p>
  <p><strong>Request example:</strong>&nbsp; localhost:8080/users/Homenick.Donavon/movies/5db9cd8c1a088e775651688d</p>
  <p><strong>Response body data format:&nbsp;</strong>a JSON object with the users information and the newly updated favorites list.</p>
  <p><strong>Response example:</strong></p><pre><code>{
    "favorites": [
        "5db9cd8c1a088e775651688d",
        "5db9ce081a088e7756516894"
    ],
    "_id": "5dbc654c2e3448096ec37af4",
    "username": "naoexiste",
    "password": "senha1",
    "email": "dead@undead.gov",
    "birthday": "1999-01-04T00:00:00.000Z",
    "__v": 0
}</code></pre>

  <h3>Delete user</h3>
  <p><strong>Description: </strong>Delete an user entry in&nbsp;the database</p>
  <p><strong>Endpoint: </strong>/users/[username]</p>
  <p><strong>Method:&nbsp;</strong>DELETE</p>
  <p><strong>Query parameters:</strong>&nbsp;User [username].</p>
  <p><strong>Request body data format:</strong>&nbsp;None</p>
  <p><strong>Request body example:</strong>localhost:8080/users/doubL/p>
  <p><strong>Response body data format:&nbsp;</strong>Text message confirming the removal was successful.</p>
  <p><strong>Response example:&nbsp;</strong>"DoubL was deleted."</p></br>
  <h3>Delete movie from favorite list</h3>
  <p><strong>Description: </strong>Removes entry from the users' favorite movies list.</p>
  <p><strong>Endpoint: </strong>/users/:username/movies/:movieId</p>
  <p><strong>Method:&nbsp;</strong>DELETE</p>
  <p><strong>Query parameters:</strong>&nbsp;[movieId]</p>
  <p><strong>Request body data format:&nbsp;</strong>None.</p>
  <p><strong>Request body data example:&nbsp;</strong>localhost:8080/users/Homenick.Donavon/movies/5db9cd8c1a088e775651688d</p>
  <p><strong>Response body data format:&nbsp;</strong>A JSON object with the users' information updated after entry removal.</p>
  <strong>Response example:</strong><pre><code>{
    "favorites": [],
    "_id": "5dbc64892e3448096ec37af2",
    "username": "Homenick.Donavon",
    "password": "domsgood",
    "email": "domsgood@hotmail.com",
    "birthday": "1994-04-15T00:00:00.000Z",
    "__v": 0
}</code></pre>
  <h2>Contributing</h2>
  <p>The project is <a href="https://github.com/cgobbet/movie_api" target="_blank">available on Github</a>. You can contact me using the contact form (soon to be installed) at <a href="http://zeitgeist.digital/" target="_blank">zeitgeist.digital</a>.</p>
</body>
</html>
