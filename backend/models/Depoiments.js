const mongoose = require("mongoose");
const { Schema } = mongoose;

const depoimentSchema = new Schema(
  {
    images: [
      {
        type: String,
      },
    ],
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

Depoiment = mongoose.model("Depoiment", depoimentSchema);

module.exports = Depoiment;
