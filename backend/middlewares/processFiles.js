const sharp = require("sharp");
const fs = require("fs/promises");
const path = require("path");

// Middleware to convert images and update names in req.files
const processFiles = async (req, res, next) => {
  try {
    const filesArray = req.body.photos; // Array de fotos enviado pelo router

    if (!filesArray || filesArray.length === 0) {
      return next();
    }

    const filesPromises = filesArray.map((file) => {
      const inputPath = file.path;
      const outputPath = inputPath.replace(/.[^.]+$/, "") + ".webp";

      // Usando Sharp para converter a imagem para WebP
      return sharp(inputPath)
        .webp()
        .toFile(outputPath)
        .then(() => {
          return fs.unlink(inputPath);
        })
        .then(() => {
          file.filename = path.basename(outputPath);
        });
    });

    await Promise.all(filesPromises);

    next();
  } catch (error) {
    console.error("Erro ao processar os arquivos:", error);
    res.status(500).send("Erro ao processar os arquivos.");
  }
};

module.exports = { processFiles };
