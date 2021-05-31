const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  tradingPreferenceAuthor: { type: String },
  tradingPreferenceBook: { type: String },
  tradingPreferenceGenre: { type: String },
  tradingPreferenceDescription: { type: String },
  imagePath: { type: String, required: true },
  sameTownConfig: Schema.Types.Mixed,
  differentTownConfig: Schema.Types.Mixed,
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
