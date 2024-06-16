const Depoiment = require("../models/Depoiments");

// Utils
const { deleteImages } = require("../utils/deleteImages");

// Inserir um anúncio
const insertDepoiment = async (req, res) => {
  const { title, description } = req.body;

  try {
    const images = req.files.map((file) => file.filename);

    const newDepoiment = await Depoiment.create({
      title,
      description,
      images,
    });

    if (!newDepoiment) {
      res.status(422).json({
        errors: ["Houve um erro, por favor tente novamente mais tarde."],
      });
      return;
    }

    res.status(201).json(newDepoiment);
  } catch (error) {
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        deleteImages("depoiment", file.filename);
      });
    }

    console.log(error);
    res
      .status(500)
      .send("Houve um erro, por favor tente novamente mais tarde.");
  }
};

// Remover um depoimento
const deleteDepoiment = async (req, res) => {
  try {
    const { id } = req.params;

    const depoiment = await Depoiment.findById(id);

    if (!depoiment) {
      res.status(404).json({ errors: ["Depoimento não encontrado!"] });
      return;
    }

    await Depoiment.findByIdAndDelete(depoiment._id);

    if (depoiment.images && depoiment.images.length > 0) {
      depoiment.images.forEach((image) => {
        deleteImages("depoiment", image);
      });
    }

    return res
      .status(200)
      .json({ id: depoiment._id, message: "Depoimento excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir o depoimento:", error);
    return res.status(500).json({ errors: ["Erro ao excluir o depoimento."] });
  }
};

// Obter os depoimentos da homepage
const getHomeDepoiments = async (req, res) => {
  const depoiments = await Depoiment.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 10 },
    {
      $project: {
        _id: 1,
        images: { $arrayElemAt: ["$images", 0] },
        title: 1,
        description: 1,
      },
    },
  ]);

  return res.status(200).json(depoiments);
};

// // Obter depoimento por ID
// const getDepoimentById = async (req, res) => {
//   const { id } = req.params;

//   const depoiment = await Depoiment.findById(id);

//   // Verificar se o anúncio existe
//   if (!depoiment) {
//     res.status(404).json({ errors: ["Depoimento não encontrado!"] });
//     return;
//   }

//   res.status(200).json(depoiment);
// };

// // Atualizar depoimento
// const updateDepoiment = async (req, res) => {
//   const { id } = req.params;
//   const { title, description } = req.body;

//   const depoiment = await Depoiment.findById(id);

//   let images;

//   if (req.files) {
//     images = req.files.map((file) => file.filename);
//   }

//   // Verificar se o anúncio existe
//   if (!depoiment) {
//     res.status(404).json({ errors: ["Depoimento não encontrado!"] });
//     return;
//   }

//   if (title) {
//     depoiment.title = title;
//   }

//   if (description) {
//     depoiment.description = description;
//   }

//   if (images) {
//     depoiment.images = images;
//   }

//   await depoiment.save();

//   res
//     .status(200)
//     .json({ depoiment, message: "Depoimento atualizado com sucesso!" });
// };

module.exports = {
  insertDepoiment,
  deleteDepoiment,
  getHomeDepoiments,
  // getDepoimentById,
  // updateDepoiment,
};
