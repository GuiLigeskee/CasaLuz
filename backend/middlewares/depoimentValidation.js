const { body } = require("express-validator");

const depoimentInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título precisa ser uma string")
      .isLength({ min: 5 })
      .withMessage("O título precisa ter no mínimo 5 caracteres."),
    body("description")
      .not()
      .equals("undefined")
      .withMessage("A descrição é obrigatória")
      .isString()
      .withMessage("A descrição precisa ser uma string"),
    body("images").custom((value, { req }) => {
      if (!req.files || req.files.length === 0) {
        throw new Error("Pelo menos uma foto é obrigatória");
      }
      return true;
    }),
  ];
};

const depoimentUpdateValidation = () => {
  return [
    body("images")
      .optional()
      .custom((value, { req }) => {
        if (!req.files || req.files.length === 0) {
          throw new Error("Pelo menos uma foto é obrigatória");
        }
        return true;
      }),
    body("title")
      .optional()
      .isString()
      .withMessage("O título precisa ser uma string")
      .isLength({ min: 3 })
      .withMessage("O título precisa ter no mínimo 3 caracteres."),
    body("description")
      .optional()
      .isString()
      .withMessage("A descrição precisa ser uma string"),
  ];
};

module.exports = {
  depoimentInsertValidation,
  depoimentUpdateValidation,
};
