const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dataIscrizione: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
