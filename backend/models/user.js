const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const userSchema = Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  sameTownConfig: Schema.Types.Mixed,
  differentTownConfig: Schema.Types.Mixed,
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
