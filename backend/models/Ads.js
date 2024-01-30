const mongoose = require("mongoose");
const { Schema } = mongoose;

const adsSchema = new Schema(
  {
    images: Array,
    title: String,
    description: String,
    address: String,
    landMeasurement: String,
    tell: String,
    whatsapp: String,
  },
  {
    timestamps: true,
  }
);

Ads = mongoose.model("Ads", adsSchema);

module.exports = Ads;