const multer = require("multer");
const path = require("path");

// Destination to store images
const imagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("ads")) {
      folder = "ads";
    }
    cb(null, `uploads/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imagesUpload = multer({
  storage: imagesStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|heif|hevc)$/i)) {
      // upload only png, jpg, jpeg, heif, hevc format
      return cb(new Error("Por favor, envie apenas imagens PNG, JPG, HEIF, HEVC ou JPEG"));
    }
    cb(null, true);
  },
});

module.exports = { imagesUpload };
