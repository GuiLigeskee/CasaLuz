const adsFormValidation = (adsData, images) => {
  const errors = {};

  // Imagem
  if (images.length === 0) {
    errors.images = "Pelo menos uma foto é obrigatória";
  }

  // Título
  if (!adsData.title) {
    errors.title = "O título é obrigatório";
  } else if (adsData.title.length <= 5) {
    errors.title = "O título precisa ter no mínimo 5 caracteres.";
  }

  // Categoria do imóvel
  if (!adsData.typeOfRealty) {
    errors.typeOfRealty = "A categoria do imóvel é obrigatória";
  }

  // Descrição
  if (!adsData.description) {
    errors.description = "A descrição é obrigatória";
  }

  // Preço
  if (!adsData.price) {
    errors.price = "O preço é obrigatório";
  } else if (isNaN(adsData.price) || adsData.price <= 0) {
    errors.price = "Por favor, insira um preço válido e maior que zero";
  }

  // CEP
  if (!adsData.zipCode) {
    errors.zipCode = "O CEP é obrigatório";
  }

  // Endereço
  if (!adsData.address) {
    errors.address = "O endereço é obrigatório";
  }

  // Número de endereço
  if (!adsData.addressNumber) {
    errors.addressNumber = "O número de endereço é obrigatório";
  }

  // Bairro
  if (!adsData.district) {
    errors.district = "O bairro é obrigatório";
  }

  // Cidade
  if (!adsData.city) {
    errors.city = "A cidade é obrigatória";
  }

  // Estado
  if (!adsData.stateAddress) {
    errors.stateAddress = "O estado é obrigatório";
  }

  // Tipo de venda
  if (!adsData.methodOfSale) {
    errors.methodOfSale = "O tipo de venda é obrigatório";
  }

  // Tamanho do imóvel
  if (!adsData.landMeasurement) {
    errors.landMeasurement = "O tamanho do imóvel é obrigatório";
  }

  // Validador de formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

  // Whatsapp e Telefone do vendedor
  if (!adsData.whatsapp && !adsData.tell) {
    errors.whatsapp =
      "Pelo menos o número de telefone ou WhatsApp deve ser preenchido";
  } else {
    if (adsData.tell && !phoneRegex.test(adsData.tell)) {
      errors.tell =
        "O número de telefone deve estar no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX";
    }

    if (adsData.whatsapp && !phoneRegex.test(adsData.whatsapp)) {
      errors.whatsapp =
        "O número de WhatsApp deve estar no formato (XX) XXXXX-XXXX";
    }
  }

  return errors;
};

const depoimentFormValidation = (depoimentData, images) => {
  const errors = {};

  // Imagem
  if (images.length === 0) {
    errors.images = "Pelo menos uma foto é obrigatória";
  }

  // Título
  if (!depoimentData.title) {
    errors.title = "O título é obrigatório";
  } else if (depoimentData.title.length <= 5) {
    errors.title = "O título precisa ter no mínimo 5 caracteres.";
  }

  // Descrição
  if (!depoimentData.description) {
    errors.description = "A descrição é obrigatória";
  }

  return errors;
};

export { adsFormValidation, depoimentFormValidation };
