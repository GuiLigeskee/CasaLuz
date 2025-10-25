const Ads = require("../models/Ads");
const { v4: uuidv4 } = require("uuid");

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

    const reference =
      typeOfRealty.substring(0, 2).toUpperCase() + uuidv4().substring(0, 10);

    const newAds = await Ads.create({
      referenceAds: reference,
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
          referenceAds: 1,
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
          referenceAds: 1,
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
      -__v
    `);

    if (!add) {
      return res.status(404).json({ errors: ["Anúncio não encontrado!"] });
    }

    return res.status(200).json(add);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar anúncio", error });
  }
};

// Obter anúncio por ID
const getAdsByReference = async (req, res) => {
  try {
    const { referenceAds } = req.params;

    const add = await Ads.findOne({ referenceAds }).select(`
      -createdAt
      -updatedAt
      -__v
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
    existingImages,
  } = req.body;

  const add = await Ads.findById(id);

  let newImages;

  if (req.files) {
    newImages = req.files.map((file) => file.filename);
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

  if (bedrooms) {
    add.bedrooms = bedrooms;
  }

  if (bathrooms) {
    add.bathrooms = bathrooms;
  }

  if (carVacancies) {
    add.carVacancies = carVacancies;
  }

  let deletedImages = [];
  let currentImages = [];

  if (existingImages && existingImages.length > 0) {
    add.images.forEach((imgName) => {
      if (!existingImages.includes(imgName)) {
        deletedImages.push(imgName);
      } else {
        currentImages.push(imgName);
      }
    });
  }

  if (deletedImages.length > 0) {
    add.images = currentImages;
    deletedImages.forEach((imgName) => {
      deleteImages("ads", imgName);
    });
  }

  if (newImages.length > 0) {
    add.images = [...add.images, ...newImages];
  }

  await add.save();

  res.status(200).json({ add, message: "Anúncio atualizado com sucesso!" });
};

const searchAds = async (req, res) => {
  const {
    referenceAds,
    keyword,
    typeOfRealty,
    methodOfSale,
    city,
    district,
    minPrice,
    maxPrice,
    minSpace,
    maxSpace,
    bedrooms,
    bathrooms,
    carVacancies,
    page,
    limit,
  } = req.query;

  try {
    // Validação e conversão dos parâmetros de paginação
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * limitNumber;

    // Validação dos parâmetros de paginação
    if (pageNumber < 1 || limitNumber < 1 || limitNumber > 100) {
      return res.status(400).json({
        error:
          "Parâmetros de paginação inválidos. Page deve ser >= 1, limit entre 1 e 100.",
      });
    }

    let filter = {};

    if (referenceAds) {
      const regex = new RegExp(referenceAds, "i");
      filter.referenceAds = { $regex: regex };
    }

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
        priceFilter.$gte = parseFloat(minPrice.replace(/[^\d.-]/g, ""));
      }
      if (maxPrice) {
        priceFilter.$lte = parseFloat(maxPrice.replace(/[^\d.-]/g, ""));
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

    if (bedrooms) {
      filter.bedrooms = bedrooms;
    }

    if (bathrooms) {
      filter.bathrooms = bathrooms;
    }

    if (carVacancies) {
      filter.carVacancies = carVacancies;
    }

    // Buscar os resultados e o total de documentos
    const [results, total] = await Promise.all([
      Ads.find(filter)
        .skip(offset)
        .limit(limitNumber)
        .select({
          referenceAds: 1,
          title: 1,
          typeOfRealty: 1,
          methodOfSale: 1,
          city: 1,
          district: 1,
          price: 1,
          landMeasurement: 1,
          bedrooms: 1,
          bathrooms: 1,
          carVacancies: 1,
          images: { $slice: 1 },
        }),
      Ads.countDocuments(filter),
    ]);

    // Calcular informações de paginação
    const totalPages = Math.ceil(total / limitNumber);
    const hasNext = pageNumber < totalPages;
    const hasPrev = pageNumber > 1;

    // Retornar resposta com dados e paginação
    res.json({
      data: results,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalItems: total,
        itemsPerPage: limitNumber,
        hasNext,
        hasPrev,
        nextPage: hasNext ? pageNumber + 1 : null,
        prevPage: hasPrev ? pageNumber - 1 : null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar anúncios." });
  }
};

module.exports = {
  insertAds,
  deleteAds,
  getHomeAds,
  getAdsById,
  getAdsByReference,
  updateAds,
  searchAds,
};
