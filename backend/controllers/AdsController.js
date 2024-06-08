const Ads = require("../models/Ads");
const Admin = require("../models/Admin");
const mongoose = require("mongoose");

// Utils
// const { deleteImages } = require("../utils/deleteImages");
const { parsePrice } = require("../utils/parcePrice");

// Inserir um anúncio
const insertAds = async (req, res) => {
  const {
    title,
    typeOfRealty,
    description,
    price,
    zipCode,
    address,
    addressNumber,
    complement,
    district,
    city,
    methodOfSale,
    landMeasurement,
    tell,
    whatsapp,
    bedrooms,
    bathrooms,
  } = req.body;

  try {
    const images = req.files.map((file) => file.filename);

    const reqAdmin = req.admin;
    const admin = await Admin.findById(reqAdmin._id);

    // Criar anúncio no seu site
    const newAds = await Ads.create({
      title,
      typeOfRealty,
      description,
      price,
      zipCode,
      address,
      addressNumber,
      complement,
      district,
      city,
      methodOfSale,
      landMeasurement,
      tell,
      whatsapp,
      bedrooms,
      bathrooms,
      images,
      adminId: admin._id,
      adminName: admin.name,
    });

    // Se o anúncio foi criado com sucesso no seu site
    if (!newAds) {
      res.status(422).json({
        errors: ["Houve um erro, por favor tente novamente mais tarde."],
      });
      return;
    }

    res.status(201).json(newAds);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Houve um erro, por favor tente novamente mais tarde.");
  }
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
    typeOfRealty,
    description,
    price,
    zipCode,
    address,
    addressNumber,
    complement,
    district,
    city,
    methodOfSale,
    landMeasurement,
    tell,
    whatsapp,
    bedrooms,
    bathrooms,
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

  if (typeOfRealty) {
    add.typeOfRealty = typeOfRealty;
  }

  if (description) {
    add.description = description;
  }

  if (price) {
    add.price = price;
  }

  if (zipCode) {
    add.zipCode = zipCode;
  }

  if (address) {
    add.address = address;
  }

  if (addressNumber) {
    add.addressNumber = addressNumber;
  }

  if (complement) {
    add.complement = complement;
  }

  if (district) {
    add.district = district;
  }

  if (city) {
    add.city = city;
  }

  if (methodOfSale) {
    add.methodOfSale = methodOfSale;
  }

  if (landMeasurement) {
    add.landMeasurement = landMeasurement;
  }

  if (tell) {
    add.tell = tell;
  }

  if (whatsapp) {
    add.whatsapp = whatsapp;
  }

  if (images) {
    add.images = images;
  }

  if (bedrooms) {
    add.bedrooms = bedrooms;
  }

  if (bathrooms) {
    add.bathrooms = bathrooms;
  }

  await add.save();

  res.status(200).json({ add, message: "Anúncio atualizado com sucesso!" });
};

const searchAds = async (req, res) => {
  const {
    keyword,
    typeOfRealty,
    methodOfSale,
    city,
    district,
    minPrice,
    maxPrice,
    minSpace,
    maxSpace,
  } = req.query;

  try {
    let filter = {};

    if (keyword) {
      const regex = new RegExp(keyword, "i");
      filter.title = { $regex: regex };
    }

    if (typeOfRealty) {
      const regex = new RegExp(typeOfRealty, "i");
      filter.typeOfRealty = { $regex: regex };
    }

    if (methodOfSale) {
      const regex = new RegExp(methodOfSale, "i");
      filter.methodOfSale = { $regex: regex };
    }

    if (city) {
      const regex = new RegExp(city, "i");
      filter.city = { $regex: regex };
    }

    if (district) {
      const regex = new RegExp(district, "i");
      filter.district = { $regex: regex };
    }

    if (minPrice || maxPrice) {
      let priceFilter = {};
      if (minPrice) {
        priceFilter.$gte = parsePrice(minPrice);
        // console.log(minPrice);
      }
      if (maxPrice) {
        priceFilter.$lte = parsePrice(maxPrice);
        // console.log(maxPrice);
      }
      filter.price = priceFilter;
    }

    if (minSpace || maxSpace) {
      let spaceFilter = {};
      if (minSpace) {
        spaceFilter.$gte = parseFloat(minSpace);
      }
      if (maxSpace) {
        spaceFilter.$lte = parseFloat(maxSpace);
      }
      filter.landMeasurement = spaceFilter;
    }

    const results = await Ads.find(filter);

    if (results.length === 0) {
      return res.status(404).json({ error: "Anúncio não encontrado." });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar anúncios." });
  }
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
