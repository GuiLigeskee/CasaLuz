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

// Get ads details
const getAdsDetails = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/ads/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const adsService = {
  publishAds,
  getAds,
  getAdsDetails,
};

export default adsService;
