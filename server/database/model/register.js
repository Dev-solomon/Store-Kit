const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// this is the model for the register
const userSchema = Schema({
    first: {
        type: String,
        require: true,
      },
      last: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
      },
  username: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
 confirmpass: {
    type: String,
    require: true,
  },
  user: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
});

 
  const userdb = mongoose.model("User", userSchema);
  module.exports = userdb;