const formValidation = (adsData) => {
  const errors = {};

  if (!adsData.title) {
    errors.title = "Título é obrigatório";
  }

  if (!adsData.typeOfRealty) {
    errors.typeOfRealty = "Tipo de imóvel é obrigatório";
  }

  if (!adsData.description) {
    errors.description = "Descrição é obrigatória";
  }

  if (isNaN(adsData.price) || adsData.price <= 0) {
    errors.price = "Preço inválido";
  }

  return errors;
};

export default formValidation;
