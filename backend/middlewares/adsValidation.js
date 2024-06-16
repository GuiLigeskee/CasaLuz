const { body } = require("express-validator");

const adsInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título precisa ser uma string")
      .isLength({ min: 5 })
      .withMessage("O título precisa ter no mínimo 5 caracteres."),
    body("typeOfRealty")
      .not()
      .equals("undefined")
      .withMessage("A categoria do imóvel é obrigatória"),
    body("description")
      .not()
      .equals("undefined")
      .withMessage("A descrição é obrigatória")
      .isString()
      .withMessage("A descrição precisa ser uma string"),
    body("zipCode")
      .not()
      .equals("undefined")
      .withMessage("O CEP é obrigatório"),
    body("address")
      .not()
      .equals("undefined")
      .withMessage("O endereço é obrigatório")
      .isString()
      .withMessage("O endereço precisa ser uma string"),
    body("addressNumber")
      .not()
      .equals("undefined")
      .withMessage("O número de endereço é obrigatório"),
    body("district")
      .not()
      .equals("undefined")
      .withMessage("O bairro obrigatório"),
    body("city")
      .not()
      .equals("undefined")
      .withMessage("A cidade é obrigatória"),
    body("stateAddress")
      .not()
      .equals("undefined")
      .withMessage("O estado é obrigatório"),
    body("methodOfSale")
      .not()
      .equals("undefined")
      .withMessage("O tipo de venda é obrigatório"),
    body("landMeasurement")
      .not()
      .equals("undefined")
      .withMessage("O tamanho do imovel é obrigatório")
      .isNumeric()
      .withMessage("O tamanho do imovel precisa ser um número"),
    body("whatsapp")
      .isString()
      .withMessage("O número do WhatsApp precisa ser um texto"),
    body("images").custom((value, { req }) => {
      if (!req.files || req.files.length === 0) {
        throw new Error("Pelo menos uma foto é obrigatória");
      }
      return true;
    }),
  ];
};

const adsUpdateValidation = () => {
  return [
    // body("images")
    //   .optional()
    //   .custom((value, { req }) => {
    //     if (!req.files || req.files.length === 0) {
    //       throw new Error("Pelo menos uma foto é obrigatória");
    //     }
    //     return true;
    //   }),
    body("title")
      .optional()
      .isString()
      .withMessage("O título precisa ser uma string")
      .isLength({ min: 3 })
      .withMessage("O título precisa ter no mínimo 3 caracteres."),
    body("address")
      .optional()
      .isString()
      .withMessage("O endereço precisa ser uma string"),
    body("description")
      .optional()
      .isString()
      .withMessage("A descrição precisa ser uma string"),
    body("whatsapp")
      .optional()
      .isString()
      .withMessage("O número do WhatsApp precisa ser uma string"),
    body("landMeasurement")
      .optional()
      .isNumeric()
      .withMessage("O tamanho do terreno precisa ser um número"),
  ];
};

module.exports = {
  adsInsertValidation,
  adsUpdateValidation,
};
