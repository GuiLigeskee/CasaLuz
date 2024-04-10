import { api, requestConfig } from "../utils/config";

// Publish an user's photo
const publishDepoiment = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(api + "/depoiment", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get all ads
const getDepoiments = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/depoiment/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get ads details
const getDepoimentDetails = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/getDepoiment/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const adsService = {
  publishDepoiment,
  getDepoimentDetails,
  getDepoiments,
};

export default adsService;
