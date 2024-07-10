const mongoose = require("mongoose");
const { Schema } = mongoose;

const adsSchema = new Schema(
  {
    images: [
      {
        type: String,
      },
    ],
    referenceAds: String,
    title: String,
    typeOfRealty: String,
    description: String,
    price: Number,
    zipCode: String,
    address: String,
    addressNumber: String,
    complement: String,
    district: String,
    city: String,
    stateAddress: String,
    methodOfSale: String,
    landMeasurement: Number,
    tell: String,
    whatsapp: String,
    bedrooms: Number,
    bathrooms: Number,
    carVacancies: Number,
  },
  {
    timestamps: true,
  }
);

Ads = mongoose.model("Ads", adsSchema);

module.exports = Ads;
