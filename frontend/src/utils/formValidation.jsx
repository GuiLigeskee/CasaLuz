const formValidation = (adsData, images) => {
  const errors = {};

  // Título
  if (!adsData.title) {
    errors.title = "O título é obrigatório";
  }

  if (adsData.title && adsData.title.length <= 5) {
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
  if (isNaN(adsData.price) || adsData.price <= 0) {
    errors.price = "Preço inválido";
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
    errors.district = "O bairro obrigatório";
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

  // Tamanho do imovel
  if (!adsData.landMeasurement) {
    errors.landMeasurement = "O tamanho do imovel é obrigatório";
  }

  // Whatsapp e Telefone do vendedor
  if (!adsData.whatsapp && !adsData.tell) {
    errors.whatsapp =
      "Pelo menos o número de telefone ou WhatsApp deve ser preenchido";
  }

  // Imagem
  if (images.length === 0) {
    errors.images = "Pelo menos uma foto é obrigatória";
  }

  return errors;
};

export default formValidation;
