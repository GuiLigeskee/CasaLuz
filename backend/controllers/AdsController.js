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

    const images = Array.isArray(req.files)
      ? req.files.map((file) => file.filename)
      : [];

    const typeCode = typeOfRealty
      ? String(typeOfRealty).substring(0, 2).toUpperCase()
      : "AD";

    const reference = typeCode + uuidv4().substring(0, 10);

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
    const ads = await Ads.find()
      .select({
        referenceAds: 1,
        title: 1,
        typeOfRealty: 1,
        methodOfSale: 1,
        city: 1,
        district: 1,
        price: 1,
        images: { $slice: 1 },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json(ads);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar anúncios." });
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
  try {
    const { id } = req.params;
    const rawBody = req.body || {};
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
    } = rawBody;

    // existingImages may come as JSON string, array or comma-separated string
    const existingImagesRaw = rawBody.existingImages;
    const existingImagesProvided = Object.prototype.hasOwnProperty.call(
      rawBody,
      "existingImages"
    );

    const add = await Ads.findById(id);

    if (!add) {
      return res.status(404).json({ errors: ["Anúncio não encontrado!"] });
    }

    const newImages = Array.isArray(req.files)
      ? req.files.map((file) => file.filename)
      : [];

    // Atualiza campos simples quando fornecidos
    const updatable = {
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
    };

    Object.keys(updatable).forEach((k) => {
      if (typeof updatable[k] !== "undefined" && updatable[k] !== null) {
        add[k] = updatable[k];
      }
    });

    // Garante que add.images é um array
    add.images = Array.isArray(add.images) ? add.images : [];

    // Parse de existingImages quando fornecido
    let existingImagesArr = [];
    if (existingImagesProvided) {
      if (Array.isArray(existingImagesRaw)) {
        existingImagesArr = existingImagesRaw;
      } else if (typeof existingImagesRaw === "string") {
        try {
          const parsed = JSON.parse(existingImagesRaw);
          if (Array.isArray(parsed)) {
            existingImagesArr = parsed;
          } else if (parsed) {
            existingImagesArr = [String(parsed)];
          }
        } catch (err) {
          // fallback: split por vírgula
          existingImagesArr = existingImagesRaw
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }
    }

    // Se o front-end enviou uma ordem completa das imagens (`imagesOrder`), respeitamos essa ordem
    const imagesOrderRaw = rawBody.imagesOrder;
    const imagesOrderProvided = Object.prototype.hasOwnProperty.call(rawBody, "imagesOrder");

    if (imagesOrderProvided) {
      let imagesOrderArr = [];
      if (Array.isArray(imagesOrderRaw)) {
        imagesOrderArr = imagesOrderRaw;
      } else if (typeof imagesOrderRaw === "string") {
        try {
          const parsed = JSON.parse(imagesOrderRaw);
          if (Array.isArray(parsed)) {
            imagesOrderArr = parsed;
          } else if (parsed) {
            imagesOrderArr = [String(parsed)];
          }
        } catch (err) {
          imagesOrderArr = imagesOrderRaw
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }

      const prevImages = Array.isArray(add.images) ? add.images.slice() : [];
      const newFileNames = Array.isArray(newImages) ? newImages : [];

      const finalImages = [];
      let sequentialNewIndex = 0;

      imagesOrderArr.forEach((token) => {
        if (typeof token === "string" && token.startsWith("__new_")) {
          const m = token.match(/__new_(\d+)__/);
          let idx = null;
          if (m && m[1]) idx = parseInt(m[1], 10);
          let filename = null;
          if (idx !== null && !Number.isNaN(idx) && newFileNames[idx]) filename = newFileNames[idx];
          else if (newFileNames[sequentialNewIndex]) filename = newFileNames[sequentialNewIndex];
          if (filename) {
            finalImages.push(filename);
            sequentialNewIndex++;
          }
        } else if (token) {
          finalImages.push(token);
        }
      });

      // Excluir imagens antigas que não estão mais na lista final
      const toDelete = prevImages.filter((img) => !finalImages.includes(img));
      toDelete.forEach((img) => deleteImages("ads", img));

      add.images = finalImages;
    } else {
      // Fallback: comportamento antigo baseado em existingImages
      let deletedImages = [];
      let currentImages = [];

      if (existingImagesArr && existingImagesArr.length > 0) {
        add.images.forEach((imgName) => {
          if (!existingImagesArr.includes(imgName)) {
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
    }

    await add.save();

    return res.status(200).json({ add, message: "Anúncio atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar anúncio:", error);
    return res.status(500).json({ error: "Erro ao atualizar anúncio." });
  }
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
    const limitNumber = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
    const offset = (pageNumber - 1) * limitNumber;

    // Validação dos parâmetros de paginação
    if (pageNumber < 1 || limitNumber < 1 || limitNumber > 100) {
      return res.status(400).json({
        error:
          "Parâmetros de paginação inválidos. Page deve ser >= 1, limit entre 1 e 100.",
      });
    }

    const escapeRegExp = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    let filter = {};

    if (referenceAds) {
      const regex = new RegExp(escapeRegExp(referenceAds), "i");
      filter.referenceAds = { $regex: regex };
    }

    if (keyword) {
      const regex = new RegExp(escapeRegExp(keyword), "i");
      filter.$or = [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }

    const addRegex = (field, value) => {
      if (!value) return;
      const regex = new RegExp(escapeRegExp(value), "i");
      filter[field] = { $regex: regex };
    };

    addRegex("typeOfRealty", typeOfRealty);
    addRegex("methodOfSale", methodOfSale);
    addRegex("city", city);
    addRegex("district", district);

    if (minPrice || maxPrice) {
      let priceFilter = {};
      if (minPrice) {
        const val = parseFloat(String(minPrice).replace(/[^\d.-]/g, ""));
        if (!Number.isNaN(val)) priceFilter.$gte = val;
      }
      if (maxPrice) {
        const val = parseFloat(String(maxPrice).replace(/[^\d.-]/g, ""));
        if (!Number.isNaN(val)) priceFilter.$lte = val;
      }
      if (Object.keys(priceFilter).length) filter.price = priceFilter;
    }

    if (minSpace || maxSpace) {
      let spaceFilter = {};
      if (minSpace) {
        const val = parseFloat(minSpace);
        if (!Number.isNaN(val)) spaceFilter.$gte = val;
      }
      if (maxSpace) {
        const val = parseFloat(maxSpace);
        if (!Number.isNaN(val)) spaceFilter.$lte = val;
      }
      if (Object.keys(spaceFilter).length) filter.landMeasurement = spaceFilter;
    }

    const parseIntIf = (v) => {
      if (typeof v === "undefined" || v === null || v === "") return null;
      const n = parseInt(v);
      return Number.isNaN(n) ? null : n;
    };

    const b = parseIntIf(bedrooms);
    if (b !== null) filter.bedrooms = b;

    const bath = parseIntIf(bathrooms);
    if (bath !== null) filter.bathrooms = bath;

    const cars = parseIntIf(carVacancies);
    if (cars !== null) filter.carVacancies = cars;

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
