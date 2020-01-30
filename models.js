const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var movieSchema = mongoose.Schema({
  "title" : {type: String, required: true},
  "plot" : {type: String, required: true},
  "genre": {
    "name" : String,
    "description" : String
  },
  "director" : {
    "name" : String,
    "bio" : String
  },
  "actors" : [String],
  "imagePath" : String,
  "featured" : Boolean
});

var userSchema = mongoose.Schema({
  "username" : {type: String, required: true},
  "password" : {type: String, required: true},
  "email" : {type: String, required: true},
  "birthday" : Date,
  "favorites" : [{ type : mongoose.SchemaTypes.ObjectId, ref: 'movie'}]
});

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var Movie = mongoose.model('movie', movieSchema);
var User = mongoose.model('user', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
