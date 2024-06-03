// const mongoose = require("mongoose");

// // Define a schema for credentials
// const credentialsSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true // Ensure email is unique
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// // Create a model using the schema
// const Credentials = mongoose.model("Credentials", credentialsSchema);

// module.exports = Credentials;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
