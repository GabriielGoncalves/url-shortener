import { body, header } from "express-validator";

const urlShortenerValidator = [
  body("url")
    .exists()
    .withMessage("The URL field must exist in order to be shortened.")
    .isURL({
      protocols: ["http", "https"],
    }),
].concat(
  header("Authorization").isString().optional(),
  body("email").isString().optional(),
  body("password").isString().optional()
);

export default urlShortenerValidator;
