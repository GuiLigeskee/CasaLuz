import { api, requestConfig } from "../utils/config";

// Publish an user's photo
const publishAds = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(api + "/ads", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get all ads
const getAds = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/ads/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get ads details for update
const getAdsDetails = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/ads/update/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get ads details by reference
const getAdsDetailsByReference = async (reference) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/ads/" + reference, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateAds = async (data, id, token) => {
  const config = requestConfig("PUT", data, token, true);

  try {
    const res = await fetch(api + "/ads/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Delete a add
const deleteAdd = async (id, token) => {
  const config = requestConfig("DELETE", "", token, true);

  try {
    const res = await fetch(api + "/ads/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// filters

// Search ads by keyword
const searchAdsByKeyword = async (keyword) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/ads/filter/title?q=" + keyword, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const searchAdsByMethodOfSale = async (q) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/ads/filter/method?q=" + q, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const searchAdsByTypeOfRealty = async (q) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/ads/filter/type?q=" + q, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const searchAds = async (filters) => {
  try {
    // Filtre para incluir apenas chaves com valores não vazios
    const queryString = new URLSearchParams(
      Object.entries(filters).filter(([_, value]) => value)
    ).toString();

    const response = await fetch(`${api}/ads/filter/search?${queryString}`);
    if (!response.ok) {
      throw new Error("Não foi encontrado anúncios correspondentes à sua pesquisa");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error.message || "Não foi encontrado anúncios correspondentes à sua pesquisa"
    );
  }
};



const adsService = {
  publishAds,
  getAds,
  getAdsDetails,
  getAdsDetailsByReference,
  updateAds,
  deleteAdd,
  searchAdsByKeyword,
  searchAdsByMethodOfSale,
  searchAdsByTypeOfRealty,
  searchAds,
};

export default adsService;
