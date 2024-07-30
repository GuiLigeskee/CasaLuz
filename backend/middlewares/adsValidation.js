const { body, check } = require("express-validator");

const adsInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título precisa ser uma string")
      .isLength({ min: 5 })
      .withMessage("O título precisa ter no mínimo 5 caracteres.")
      .notEmpty()
      .withMessage("O título não pode ser vazio"),

    body("typeOfRealty")
      .not()
      .equals("undefined")
      .withMessage("A categoria do imóvel é obrigatória")
      .notEmpty()
      .withMessage("A categoria do imóvel não pode ser vazia"),

    body("description")
      .not()
      .equals("undefined")
      .withMessage("A descrição é obrigatória")
      .isString()
      .withMessage("A descrição precisa ser uma string")
      .notEmpty()
      .withMessage("A descrição não pode ser vazia"),

    body("price")
      .not()
      .equals("undefined")
      .withMessage("O preço é obrigatório")
      .notEmpty()
      .withMessage("O preço não pode ser vazio")
      .isFloat({ gt: 0 })
      .withMessage("O preço deve ser um número maior que zero"),

    body("zipCode")
      .not()
      .equals("undefined")
      .withMessage("O CEP é obrigatório")
      .notEmpty()
      .withMessage("O CEP não pode ser vazio"),

    body("address")
      .not()
      .equals("undefined")
      .withMessage("O endereço é obrigatório")
      .isString()
      .withMessage("O endereço precisa ser uma string")
      .notEmpty()
      .withMessage("O endereço não pode ser vazio"),

    body("addressNumber")
      .not()
      .equals("undefined")
      .withMessage("O número de endereço é obrigatório")
      .notEmpty()
      .withMessage("O número de endereço não pode ser vazio"),

    body("district")
      .not()
      .equals("undefined")
      .withMessage("O bairro é obrigatório")
      .notEmpty()
      .withMessage("O bairro não pode ser vazio"),

    body("city")
      .not()
      .equals("undefined")
      .withMessage("A cidade é obrigatória")
      .notEmpty()
      .withMessage("A cidade não pode ser vazia"),

    body("stateAddress")
      .not()
      .equals("undefined")
      .withMessage("O estado é obrigatório")
      .notEmpty()
      .withMessage("O estado não pode ser vazio"),

    body("methodOfSale")
      .not()
      .equals("undefined")
      .withMessage("O tipo de venda é obrigatório")
      .notEmpty()
      .withMessage("O tipo de venda não pode ser vazio"),

    body("landMeasurement")
      .not()
      .equals("undefined")
      .withMessage("O tamanho do imóvel é obrigatório")
      .isNumeric()
      .withMessage("O tamanho do imóvel precisa ser um número"),

    body("whatsapp")
      .optional()
      .isString()
      .withMessage("O número do WhatsApp precisa ser um texto"),

    body("tell")
      .optional()
      .isString()
      .withMessage("O número de telefone precisa ser um texto"),

    check("whatsapp").custom((value, { req }) => {
      if (!value && !req.body.tell) {
        throw new Error(
          "Pelo menos o número de telefone ou WhatsApp deve ser preenchido"
        );
      }
      return true;
    }),

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
