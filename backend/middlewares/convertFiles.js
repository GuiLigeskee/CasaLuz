const sharp = require("sharp");
const fse = require("fs-extra");
const path = require("path");

// Middleware para converter imagens e atualizar nomes em req.files
const convertFiles = async (req, res, next) => {
  try {
    if (!req.files && !req.file) {
      return next();
    }

    let fieldFiles = [];

    if (req.files) {
      fieldFiles = Object.values(req.files).flat();
    } else {
      fieldFiles = [req.file];
    }

    const filesPromises = fieldFiles.map(async (file) => {
      const inputPath = file.path;
      const outputPath = inputPath.replace(/\.[^.]+$/, "") + ".webp";

      // Usando o Sharp para converter a imagem para WebP
      await sharp(inputPath).webp().toFile(outputPath);

      // Excluir o arquivo original
      await fse.move(inputPath, outputPath, { overwrite: true });

      file.filename = path.basename(outputPath);
    });

    await Promise.all(filesPromises);

    next();
  } catch (error) {
    console.error("Erro ao processar os arquivos:", error);
    res.status(500).send("Erro ao processar os arquivos.");
  }
};

module.exports = { convertFiles };
