import { body, header } from "express-validator";

export const urlValidator = [
  body("url")
    .exists()
    .withMessage("The URL field must exist in order to be shortened.")
    .isURL({
      protocols: ["http", "https"],
    }),
];

const urlShortenerValidator = [...urlValidator].concat(
  header("Authorization").isString().optional(),
  body("email").isString().optional(),
  body("password").isString().optional()
);

export default urlShortenerValidator;
