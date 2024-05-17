const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Destination to store images
const imagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (req.baseUrl.includes("ads")) {
      folder = "ads";
    } else if (req.baseUrl.includes("depoiment")) {
      folder = "depoiment";
    }

    cb(null, `uploads/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${uuidv4()}${path.extname(file.originalname)}`);
  },
});

const imagesUpload = multer({
  storage: imagesStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|heif|hevc)$/i)) {
      // upload only png, jpg, jpeg, heif, hevc format
      return cb(
        new Error(
          "Por favor, envie apenas imagens PNG, JPG, HEIF, HEVC ou JPEG"
        )
      );
    }
    cb(null, true);
  },
});

module.exports = { imagesUpload };
