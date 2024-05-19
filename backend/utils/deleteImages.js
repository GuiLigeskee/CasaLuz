const path = require("path");
const fs = require("fs").promises;

const deleteImages = async (imageType, oldImageNames) => {
  const uploadsFolder = path.join(__dirname, "../", "uploads");

  try {
    for (const oldImageName of oldImageNames) {
      let imagePath = "";

      if (imageType === "ads") {
        imagePath = path.join(uploadsFolder, "ads", oldImageName);
      } else if (imageType === "depoiment") {
        imagePath = path.join(uploadsFolder, "depoiment", oldImageName);
      } else {
        throw new Error("Tipo de imagem inválido.");
      }

      // Excluir a imagem usando fs.promises.unlink
      await fs.unlink(imagePath);

      console.log(`Imagem ${imagePath} excluída com sucesso.`);
    }
  } catch (error) {
    console.error("Erro ao excluir as imagens:", error);
    throw new Error("Erro ao excluir as imagens.");
  }
};

module.exports = { deleteImages };
