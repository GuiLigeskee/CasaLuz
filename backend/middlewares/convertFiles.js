const sharp = require("sharp");
const fs = require("fs/promises");
const path = require("path");
const fse = require("fs-extra");
const { v4: uuidv4 } = require("uuid");

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
      const randomFileName = `${uuidv4()}.webp`; // Gerar um nome de arquivo aleatório
      const outputPath = path.join(
        __dirname,
        `../uploads/ads/${randomFileName}`
      );

      // Usando o Sharp para converter a imagem para WebP
      await sharp(inputPath).webp().toFile(outputPath);

      // Movendo o arquivo convertido para a pasta de destino e excluindo o original
      await fse.move(inputPath, outputPath, { overwrite: true });

      file.filename = randomFileName;
    });

    await Promise.all(filesPromises);

    next();
  } catch (error) {
    console.error("Erro ao processar os arquivos:", error);
    res.status(500).send("Erro ao processar os arquivos.");
  }
};

module.exports = { convertFiles };
