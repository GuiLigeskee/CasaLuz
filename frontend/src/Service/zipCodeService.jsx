import { apiOpenCep, requestConfig } from "../utils/config";

// Pesquisa CEP
const searchZipCode = async (zipCode) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(apiOpenCep + zipCode, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const zipCodeService = {
  searchZipCode,
};

export default zipCodeService;
