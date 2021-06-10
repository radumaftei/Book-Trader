const mongoose = require('mongoose');
const { Schema } = mongoose;

const tradeSchema = Schema({
  fromUser: { type: String, ref: "User", required: true },
  toUser: { type: String, ref: "User", required: true },
  description: { type: String, required: true },
  tradedBookTitle: { type: String, required: true },
  tradedWithBookTitle: { type: String, required: true },
  tradedBookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  tradedWithBookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  accepted: { type: Boolean, required: true },
  rejected: { type: Boolean, required: true },
  tradeMethod: Schema.Types.Mixed
})

module.exports = mongoose.model('Trade', tradeSchema);
