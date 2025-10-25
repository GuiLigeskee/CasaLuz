const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fse = require("fs-extra");

// Função para criar os diretórios necessários
const ensureUploadsFolder = async () => {
  const uploadsPath = path.join(__dirname, "..", "uploads");
  const adsPath = path.join(uploadsPath, "ads");
  const depoimentPath = path.join(uploadsPath, "depoiment");

  try {
    await fse.ensureDir(uploadsPath);

    await fse.ensureDir(adsPath);

    await fse.ensureDir(depoimentPath);

    console.log(
      "Pastas de uploads/ads/depoiment criadas com sucesso ou já existentes!"
    );
  } catch (err) {
    console.error("Erro ao criar pastas:", err);
  }
};

// Chama a função para garantir que as pastas existam
ensureUploadsFolder().catch((err) => {
  console.error("Erro ao garantir que as pastas existam:", err);
});

// Destino para armazenar as imagens
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
    if (!file.originalname.match(/\.(png|jpg|jpeg|heif|hevc|webp)$/i)) {
      return cb(
        new Error(
          "Por favor, envie apenas imagens WEBP, PNG, JPG, HEIF, HEVC ou JPEG"
        )
      );
    }
    cb(null, true);
  },
});

module.exports = { imagesUpload };
