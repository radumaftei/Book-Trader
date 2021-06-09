const mongoose = require('mongoose');
const { Schema } = mongoose;

const tradeSchema = new Schema({
  fromUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
  toUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  accepted: { type: Boolean, required: true },
  rejected: { type: Boolean, required: true },
})

module.exports = mongoose.model('Trade', tradeSchema);
