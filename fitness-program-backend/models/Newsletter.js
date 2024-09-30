const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  dataIscrizione: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Newsletter", newsletterSchema);