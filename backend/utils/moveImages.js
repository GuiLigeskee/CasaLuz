const fs = require("fs").promises;
const path = require("path");

const moveImages = async (imageType, oldImageName) => {
  const uploadsFolder = path.join(__dirname, "../", "uploads");
  const backupFolder = path.join(__dirname, "../", "uploads", "imagesDelete");

  try {
    let sourcePath = "";
    let targetPath = "";

    if (imageType === "ads") {
      sourcePath = path.join(uploadsFolder, "ads", oldImageName);
      targetPath = path.join(backupFolder, oldImageName);
    } else if (imageType === "depoiment") {
      sourcePath = path.join(uploadsFolder, "depoiment", oldImageName);
      targetPath = path.join(backupFolder, oldImageName);
    } else {
      throw new Error("Tipo de imagem inválido.");
    }

    // Verifica se o arquivo existe antes de tentar mover
    try {
      await fs.access(sourcePath, fs.constants.F_OK);
    } catch (error) {
      throw new Error(`Arquivo ${sourcePath} não encontrado.`);
    }

    // Cria o diretório de backup, se ainda não existir
    await fs.mkdir(path.dirname(targetPath), { recursive: true });

    // Move o arquivo para o novo diretório
    await fs.rename(sourcePath, targetPath);
  } catch (error) {
    console.error("Erro ao mover a imagem:", error);
    throw new Error("Erro ao mover a imagem.");
  }
};

module.exports = { moveImages };
// efgafyaefyafeygafy
// efgafyaefyafeygafy
// efgafyaefyafeygafy
// efgafyaefyafeygafy
// efgafyaefyafeygafy
// efgafyaefyafeygafy
// efgafyaefyafeygafy
// efgafyaefyafeygafy
