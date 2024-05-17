const Depoiment = require("../models/Depoiments");
const Admin = require("../models/Admin");
const mongoose = require("mongoose");

// Utils
const { deleteImages } = require("../utils/deleteImages");

// Inserir um anúncio
const insertDepoiment = async (req, res) => {
  const { title, description } = req.body;

  try {
    const images = req.files.map((file) => file.filename);

    const reqAdmin = req.admin;

    const admin = await Admin.findById(reqAdmin._id);
    throw new Error("Este é um erro gerado de propósito!");
    // Criar anúncio
    const newDepoiment = await Depoiment.create({
      title,
      description,
      images,
      adminId: admin._id,
      adminName: admin.name,
    });

    // Se o anúncio foi criado com sucesso, retornar os dados
    if (!newDepoiment) {
      res.status(422).json({
        errors: ["Houve um erro, por favor tente novamente mais tarde."],
      });
      return;
    }

    res.status(201).json(newDepoiment);
  } catch (error) {
    if (req.files) {
      req.files.map((file) => deleteImages("depoiment", file.filename));
    }
    console.log(error);
    res
      .status(500)
      .send("Houve um erro, por favor tente novamente mais tarde.");
  }
};

// Remover um anúncio do banco de dados
const deleteDepoiment = async (req, res) => {
  const { id } = req.params;

  const depoiment = await Depoiment.findById(new mongoose.Types.ObjectId(id));

  // Verificar se o anúncio existe
  if (!depoiment) {
    res.status(404).json({ errors: ["Depoimento não encontrado!"] });
    return;
  }

  await Depoiment.findByIdAndDelete(depoiment._id);

  res
    .status(200)
    .json({ id: depoiment._id, message: "Depoimento excluído com sucesso." });
};

// Obter todos os anúncios
const getAllDepoiments = async (req, res) => {
  const depoiments = await Depoiment.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(depoiments);
};

// Obter anúncios do admin
const getAdminDepoiments = async (req, res) => {
  const { id } = req.params;

  const depoiment = await Depoiment.find({ adminId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(depoiment);
};

// Obter anúncio por ID
const getDepoimentById = async (req, res) => {
  const { id } = req.params;

  const depoiment = await Depoiment.findById(new mongoose.Types.ObjectId(id));

  // Verificar se o anúncio existe
  if (!depoiment) {
    res.status(404).json({ errors: ["Anúncio não encontrado!"] });
    return;
  }

  res.status(200).json(depoiment);
};

// Atualizar um anúncio
const updateDepoiment = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const depoiment = await Depoiment.findById(id);

  let images;

  if (req.files) {
    images = req.files.map((file) => file.filename);
  }

  // Verificar se o anúncio existe
  if (!depoiment) {
    res.status(404).json({ errors: ["Anúncio não encontrado!"] });
    return;
  }

  if (title) {
    depoiment.title = title;
  }

  if (description) {
    depoiment.description = description;
  }

  if (images) {
    depoiment.images = images;
  }

  await depoiment.save();

  res
    .status(200)
    .json({ depoiment, message: "Anúncio atualizado com sucesso!" });
};

// Pesquisar um anúncio pelo título
const searchDepoiment = async (req, res) => {
  const { q } = req.query;

  const depoiment = await Depoiment.find({ titulo: new RegExp(q, "i") }).exec();

  res.status(200).json(depoiment);
};

module.exports = {
  insertDepoiment,
  deleteDepoiment,
  getAllDepoiments,
  getDepoimentById,
  getAdminDepoiments,
  updateDepoiment,
  searchDepoiment,
};
