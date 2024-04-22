const Ads = require("../models/Ads");
const Admin = require("../models/Admin");
const mongoose = require("mongoose");

// Inserir um anúncio
const insertAds = async (req, res) => {
  const {
    title,
    description,
    tell,
    whatsapp,
    address,
    landMeasurement,
    price,
    typeOfRealty,
    district,
    city,
    methodOfSale,
  } = req.body;
  const images = req.files.map((file) => file.filename);

  const reqAdmin = req.admin;

  const admin = await Admin.findById(reqAdmin._id);

  // Criar anúncio
  const newAds = await Ads.create({
    title,
    description,
    tell,
    whatsapp,
    address,
    price,
    landMeasurement,
    typeOfRealty,
    district,
    city,
    methodOfSale,
    images,
    adminId: admin._id,
    adminName: admin.name,
  });

  // Se o anúncio foi criado com sucesso, retornar os dados
  if (!newAds) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  res.status(201).json(newAds);
};

// Remover um anúncio do banco de dados
const deleteAds = async (req, res) => {
  const { id } = req.params;

  const reqAdmin = req.admin;

  const ads = await Ads.findById(new mongoose.Types.ObjectId(id));

  // Verificar se o anúncio existe
  if (!ads) {
    res.status(404).json({ errors: ["Anúncio não encontrado!"] });
    return;
  }

  // Verificar se o anúncio pertence ao usuário
  // if (!ads.adminId.equals(reqAdmin._id)) {
  //   res
  //     .status(422)
  //     .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
  //   return;
  // }

  await Ads.findByIdAndDelete(ads._id);

  res
    .status(200)
    .json({ id: ads._id, message: "Anúncio excluído com sucesso." });
};

// Obter todos os anúncios
const getAllAds = async (req, res) => {
  const ads = await Ads.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(ads);
};

// Obter anúncios do admin
const getAdminAds = async (req, res) => {
  const { id } = req.params;

  const ads = await Ads.find({ adminId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(ads);
};

// Obter anúncio por ID
const getAdsById = async (req, res) => {
  const { id } = req.params;

  const ads = await Ads.findById(new mongoose.Types.ObjectId(id));

  // Verificar se o anúncio existe
  if (!ads) {
    res.status(404).json({ errors: ["Anúncio não encontrado!"] });
    return;
  }

  res.status(200).json(ads);
};

// Atualizar um anúncio
const updateAds = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    tell,
    whatsapp,
    address,
    price,
    landMeasurement,
    typeOfRealty,
    district,
    city,
    methodOfSale,
  } = req.body;

  const add = await Ads.findById(id);

  let images;

  if (req.files) {
    images = req.files.map((file) => file.filename);
  }

  // Verificar se o anúncio existe
  if (!add) {
    res.status(404).json({ errors: ["Anúncio não encontrado!"] });
    return;
  }

  if (title) {
    add.title = title;
  }

  if (description) {
    add.description = description;
  }

  if (price) {
    add.price = price;
  }

  if (tell) {
    add.tell = tell;
  }

  if (whatsapp) {
    add.whatsapp = whatsapp;
  }

  if (address) {
    add.address = address;
  }

  if (landMeasurement) {
    add.landMeasurement = landMeasurement;
  }

  if (images) {
    add.images = images;
  }

  if (typeOfRealty) {
    add.typeOfRealty = typeOfRealty;
  }

  if (city) {
    add.city = city;
  }

  if (district) {
    add.district = district;
  }

  if (methodOfSale) {
    add.methodOfSale = methodOfSale;
  }

  await add.save();

  res.status(200).json({ add, message: "Anúncio atualizado com sucesso!" });
};

// Pesquisar um anúncio pelo título
const searchAds = async (req, res) => {
  const { q } = req.query;

  const ads = await Ads.find({ titulo: new RegExp(q, "i") }).exec();

  res.status(200).json(ads);
};

module.exports = {
  insertAds,
  deleteAds,
  getAllAds,
  getAdminAds,
  getAdsById,
  updateAds,
  searchAds,
};
