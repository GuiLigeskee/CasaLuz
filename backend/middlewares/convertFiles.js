const sharp = require("sharp");
const fse = require("fs-extra");
const path = require("path");

// Middleware para converter imagens e atualizar nomes
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

      try {
        await sharp(inputPath).webp().toFile(outputPath);
        // Remover o arquivo original quando a conversão for bem sucedida
        await fse.remove(inputPath).catch(() => {});
        file.filename = path.basename(outputPath);
      } catch (err) {
        console.error(`Erro ao converter arquivo ${inputPath}:`, err);
        // fallback: mantém o arquivo original para não bloquear a requisição
        file.filename = path.basename(inputPath);
      }
    });

    await Promise.all(filesPromises);

    next();
  } catch (error) {
    console.error("Erro ao processar os arquivos:", error);
    // Não interrompe toda a requisição apenas por falha na conversão
    next();
  }
};

module.exports = { convertFiles };
