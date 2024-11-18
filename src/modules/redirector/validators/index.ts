import { param } from "express-validator";

const redirectorValidator = [
  param("id").exists().isString().isLength({
    min: 6,
    max: 6,
  }),
];

export default redirectorValidator;
