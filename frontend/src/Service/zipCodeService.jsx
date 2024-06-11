import { apiOpenCep, requestConfig } from "../utils/config";

// Pesquisa CEP
const searchZipCode = async (zipCode) => {
  const config = requestConfig("GET", null);

  try {
    const response = await fetch(apiOpenCep + zipCode, config);
    if (!response.ok) {
      throw new Error("Failed to fetch ZIP code");
    }
    const data = await response.json();
    if (data.error) {
      throw new Error("Invalid ZIP code");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const zipCodeService = {
  searchZipCode,
};

export default zipCodeService;
