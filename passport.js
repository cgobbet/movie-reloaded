const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Models = require('./models.js');
const passportJWT = require('passport-jwt');

var Users = Models.User;
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
 usernameField: 'username',
 passwordField: 'password'
}, (username, password, callback) => {
 console.log(username + '  ' + password);
 Users.findOne({ username: username }, (error, user) => {
   if (error) {
     console.log(error);
     return callback(error);
   }
   if (!user) {
     console.log('incorrect username');
     return callback(null, false, {message: 'Incorrect username or password.'});
   }
   if (!user.validatePassword(password)) {
     console.log('Incorrect password provided');
     return callback(null, false, { message : 'Incorrect password provided' });
   } 
   console.log('finished');
   return callback(null, user);
 });
}));

passport.use(new JWTStrategy({
 jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
 secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
 return Users.findById(jwtPayload._id)
 .then((user) => {
   return callback(null, user);
 })
 .catch((error) => {
   return callback(error)
 });
}));
