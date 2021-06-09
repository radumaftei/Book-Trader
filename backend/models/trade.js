const mongoose = require('mongoose');
const { Schema } = mongoose;

const tradeSchema = Schema({
  fromUser: { type: String, ref: "User", required: true },
  toUser: { type: String, ref: "User", required: true },
  bookTitle: { type: String, required: true },
  accepted: { type: Boolean, required: true },
  rejected: { type: Boolean, required: true },
  tradeMethod: Schema.Types.Mixed
})

module.exports = mongoose.model('Trade', tradeSchema);
