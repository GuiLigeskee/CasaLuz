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
    typeOfRealty: String,
    description: String,
    price: Number,
    address: String,
    district: String,
    city: String,
    methodOfSale: String,
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
