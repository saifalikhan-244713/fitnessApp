const mongoose = require("mongoose");

// Define a schema for credentials
const credentialsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Ensure email is unique
  },
  password: {
    type: String,
    required: true
  }
});

// Create a model using the schema
const Credentials = mongoose.model("Credentials", credentialsSchema);

module.exports = Credentials;
