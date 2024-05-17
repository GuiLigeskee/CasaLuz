const fs = require("fs").promises;
const fse = require("fs-extra");
const path = require("path");

const deleteImages = async (imageType, oldImageName) => {
  const uploadsFolder = path.join(__dirname, "../", "uploads");

  try {
    if (imageType === "ads") {
      await fse.unlink(path.join(uploadsFolder, "ads", oldImageName));
    }

    if (imageType === "depoiment") {
      await fse.unlink(path.join(uploadsFolder, "depoiment", oldImageName));
    }
  } catch (error) {
    console.error("Erro ao excluir as imagens:", error);
    throw new Error("Erro ao excluir as imagens.");
  }
};

module.exports = { deleteImages };
