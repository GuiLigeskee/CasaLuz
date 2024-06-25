const Ads = require("../models/Ads");

// Utils
const { deleteImages } = require("../utils/deleteImages");

// Inserir um anúncio
const insertAds = async (req, res) => {
  try {
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
      stateAddress,
      methodOfSale,
      landMeasurement,
      tell,
      whatsapp,
      bedrooms,
      bathrooms,
      carVacancies,
    } = req.body;

    const images = req.files.map((file) => file.filename);

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
      stateAddress,
      methodOfSale,
      landMeasurement,
      tell,
      whatsapp,
      bedrooms,
      bathrooms,
      carVacancies,
      images,
    });

    if (!newAds) {
      res.status(422).json({
        errors: ["Houve um erro, por favor tente novamente mais tarde."],
      });
      return;
    }

    res.status(201).json(newAds);
  } catch (error) {
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        deleteImages("ads", file.filename);
      });
    }

    console.log(error);
    res
      .status(500)
      .send("Houve um erro, por favor tente novamente mais tarde.");
  }
};

// Remover um anúncio
const deleteAds = async (req, res) => {
  try {
    const { id } = req.params;

    const ads = await Ads.findById(id);

    if (!ads) {
      return res.status(404).json({ errors: ["Anúncio não encontrado!"] });
    }

    await Ads.findByIdAndDelete(id);

    if (ads.images && ads.images.length > 0) {
      ads.images.forEach((image) => {
        deleteImages("ads", image);
      });
    }

    return res.status(200).json({
      id: ads._id,
      message: "Anúncio excluído com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao excluir anúncio", error });
  }
};

// Obter os anúncios da homepage
const getHomeAds = async (req, res) => {
  try {
    const saleAds = await Ads.aggregate([
      { $match: { methodOfSale: "Venda" } },
      { $sample: { size: 10 } },
      {
        $project: {
          _id: 1,
          images: { $arrayElemAt: ["$images", 0] },
          typeOfRealty: 1,
          price: 1,
          district: 1,
          city: 1,
          methodOfSale: 1,
        },
      },
    ]);

    const rentAds = await Ads.aggregate([
      { $match: { methodOfSale: "Aluguel" } },
      { $sample: { size: 10 } },
      {
        $project: {
          _id: 1,
          images: { $arrayElemAt: ["$images", 0] },
          typeOfRealty: 1,
          price: 1,
          district: 1,
          city: 1,
          methodOfSale: 1,
        },
      },
    ]);

    const combinedAds = [...saleAds, ...rentAds];

    return res.status(200).json(combinedAds);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching ads", error });
  }
};

// Obter anúncio por ID
const getAdsById = async (req, res) => {
  try {
    const { id } = req.params;

    const add = await Ads.findById(id).select(`
      -createdAt
      -updatedAt
    `);

    if (!add) {
      return res.status(404).json({ errors: ["Anúncio não encontrado!"] });
    }

    return res.status(200).json(add);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar anúncio", error });
  }
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
    stateAddress,
    methodOfSale,
    landMeasurement,
    tell,
    whatsapp,
    bedrooms,
    bathrooms,
    carVacancies,
  } = req.body;

  const add = await Ads.findById(id);

  let images;

  if (req.files) {
    images = req.files.map((file) => file.filename);
  }

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

  if (stateAddress) {
    add.stateAddress = stateAddress;
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

  if (carVacancies) {
    add.carVacancies = carVacancies;
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
    page = 1,
    limit = 5,
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
        priceFilter.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        priceFilter.$lte = parseFloat(maxPrice);
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

    const results = await Ads.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select({
        title: 1,
        typeOfRealty: 1,
        methodOfSale: 1,
        city: 1,
        district: 1,
        price: 1,
        landMeasurement: 1,
        images: { $slice: 1 },
      });

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
  getHomeAds,
  getAdsById,
  updateAds,
  searchAds,
};
