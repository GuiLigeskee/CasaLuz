const parsePrice = (priceString) => {
  if (!priceString) return null;

  const cleanedString = priceString
    .replace("R$ ", "")
    .replace(/\./g, "")
    .replace(",", ".");

  const priceNumber = parseFloat(cleanedString);

  return priceNumber;
};

module.exports = { parsePrice };
