const mongoose = require("mongoose");
const { Schema } = mongoose;

const adsSchema = new Schema(
  {
    images: [
      {
        type: String,
      },
    ],
    title: String,
    description: String,
    price: Number,
    address: String,
    landMeasurement: Number,
    tell: String,
    whatsapp: String,
  },
  {
    timestamps: true,
  }
);

Ads = mongoose.model("Ads", adsSchema);

module.exports = Ads;
