const Ads = require("../models/Ads");
const Admin = require("../models/Admin");
const mongoose = require("mongoose");

// Utils
// const { deleteImages } = require("../utils/deleteImages");

// Inserir um anúncio
const insertAds = async (req, res) => {
  const {
    title,
    typeOfRealty,
    description,
    price,
    zipCode,
    address,
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

// const getByTypeOfRealty = async (req, res) => {
//   const { q } = req.query;
//   if (!q) {
//     return res.status(400).json({ error: "Parâmetro 'q' ausente ou vazio." });
//   }

//   try {
//     const results = await Ads.find({ typeOfRealty: q });
//     if (results.length === 0) {
//       return res.status(404).json({ error: "Anúncio não encontrado." });
//     }
//     res.json(results);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Erro ao buscar anúncios por tipo de imóvel." });
//   }
// };

// const getByMethodOfSale = async (req, res) => {
//   const { q } = req.query;
//   if (!q) {
//     return res.status(400).json({ error: "Parâmetro 'q' ausente ou vazio." });
//   }

//   try {
//     const results = await Ads.find({ methodOfSale: q });
//     if (results.length === 0) {
//       return res.status(404).json({ error: "Anúncio não encontrado." });
//     }
//     res.json(results);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Erro ao buscar anúncios por tipo de imóvel." });
//   }
// };

// const getByTitle = async (req, res) => {
//   const { q } = req.query;

//   // Verificar se a palavra-chave está presente na consulta
//   // if (!q) {
//   //   return res.status(400).json({ error: "Parâmetro 'q' ausente." });
//   // }

//   try {
//     const regex = new RegExp(q, "i"); // 'i' para ignorar maiúsculas e minúsculas
//     const results = await Ads.find({ title: { $regex: regex } });

//     // if (results.length === 0) {
//     //   return res.status(404).json({ error: "Anúncio não encontrado." });
//     // }

//     res.json(results);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Erro ao buscar anúncios por palavra-chave." });
//   }
// };

// const getByCity = async (req, res) => {
//   const { q } = req.query;
//   if (!q) {
//     return res.status(400).json({ error: "Parâmetro 'q' ausente ou vazio." });
//   }

//   try {
//     const results = await Ads.find({ city: q });
//     if (results.length === 0) {
//       return res.status(404).json({ error: "Anúncio não encontrado." });
//     }
//     res.json(results);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Erro ao buscar anúncios por tipo de imóvel." });
//   }
// };

// const getByDistrict = async (req, res) => {
//   const { q } = req.query;
//   if (!q) {
//     return res.status(400).json({ error: "Parâmetro 'q' ausente ou vazio." });
//   }

//   try {
//     const results = await Ads.find({ district: q });
//     if (results.length === 0) {
//       return res.status(404).json({ error: "Anúncio não encontrado." });
//     }
//     res.json(results);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Erro ao buscar anúncios por tipo de imóvel." });
//   }
// };

// const getByPrice = async (req, res) => {
//   let { minSpace, maxSpace } = req.query;

//   // Validar e converter minSpace e maxPrice para números
//   minSpace = parseFloat(minSpace);
//   maxSpace = parseFloat(maxSpace);

//   // Verificar se minSpace e maxSpace são números válidos
//   if (!isNaN(minSpace) && !isNaN(maxSpace) && minSpace > maxSpace) {
//     return res
//       .status(400)
//       .json({ error: "Preço mínimo não pode ser maior que o preço máximo." });
//   }

//   try {
//     let filterConditions = {};

//     // Se minSpace e/ou maxSpace forem definidos, adicione condições de filtro
//     if (!isNaN(minPrice)) {
//       filterConditions.$gte = minPrice;
//     }
//     if (!isNaN(maxSpace)) {
//       filterConditions.$lte = maxSpace;
//     }

//     const results = await Ads.find({ landMeasurement: filterConditions });
//     if (results.length === 0) {
//       return res.status(404).json({ error: "Anúncio não encontrado." });
//     }

//     res.json(results);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Erro ao buscar anúncios por tamanho de terreno." });
//   }
// };

// const getByLandMeasurement = async (req, res) => {
//   let { minSpace, maxSpace } = req.query;

//   // Validar e converter minSpace e maxSpace para números
//   minSpace = parseFloat(minSpace);
//   maxSpace = parseFloat(maxSpace);

//   // Verificar se minSpace e maxSpace são números válidos
//   if (!isNaN(minSpace) && !isNaN(maxSpace) && minSpace > maxSpace) {
//     return res.status(400).json({
//       error:
//         "A medição mínima da terra não pode ser maior que a medição máxima.",
//     });
//   }

//   try {
//     let filterConditions = {};

//     // Se minSpace e/ou maxSpace forem definidos, adicione condições de filtro
//     if (!isNaN(minSpace)) {
//       filterConditions.$gte = minSpace;
//     }
//     if (!isNaN(maxSpace)) {
//       filterConditions.$lte = maxSpace;
//     }

//     const results = await Ads.find({ landMeasurement: filterConditions });
//     if (results.length === 0) {
//       return res.status(404).json({ error: "Anúncio não encontrado." });
//     }

//     res.json(results);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Erro ao buscar anúncios por medição da terra." });
//   }
// };

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
      const regex = new RegExp(keyword, "i"); // 'i' para ignorar maiúsculas e minúsculas
      filter.title = { $regex: regex };
    }

    if (typeOfRealty) {
      const regex = new RegExp(typeOfRealty, "i"); // 'i' para ignorar maiúsculas e minúsculas
      filter.typeOfRealty = { $regex: regex };
    }

    if (methodOfSale) {
      const regex = new RegExp(methodOfSale, "i"); // 'i' para ignorar maiúsculas e minúsculas
      filter.methodOfSale = { $regex: regex };
    }

    if (city) {
      const regex = new RegExp(city, "i"); // 'i' para ignorar maiúsculas e minúsculas
      filter.city = { $regex: regex };
    }

    if (district) {
      const regex = new RegExp(district, "i"); // 'i' para ignorar maiúsculas e minúsculas
      filter.district = { $regex: regex };
    }

    // Validar e converter minPrice e maxPrice para números
    if (minPrice || maxPrice) {
      let priceFilter = {};
      if (minPrice) {
        priceFilter.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        priceFilter.$lte = parseFloat(maxPrice);
      }
      filter.price = priceFilter;
    }

    // Validar e converter minSpace e maxSpace para números
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
  // getByTitle,
  // getByTypeOfRealty,
  // getByMethodOfSale,
  // getByPrice,
  // getByLandMeasurement,
  // getByCity,
  // getByDistrict,
  searchAds,
};
