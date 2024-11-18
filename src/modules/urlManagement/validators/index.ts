import { param } from "express-validator";
import { urlValidator } from "../../shortener/validators";

const urlIdValidator = [
  param("id").exists().isString().isLength({ min: 6, max: 6 }),
];

const updateUrlValidator = [...urlIdValidator].concat(urlValidator);

export { urlIdValidator, updateUrlValidator };
