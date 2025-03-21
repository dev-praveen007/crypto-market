const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const HoldingSchema = new mongoose.Schema(
  {
    userId: { type: objectId, default: null, index: true },
    crypto: { type: String, default: "", index: true },
    qty: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    type: { type: String, enum: ["BUY", "SELL"] },
    date: { type: Date, default: Date.now, index: true },
    symbol: { type: String, default: "", index: true },
  },
  { timestamps: true }
);

HoldingSchema.index({ userId: 1, crypto: 1 });

module.exports = mongoose.model("Holding", HoldingSchema);
