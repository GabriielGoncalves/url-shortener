import { body } from "express-validator";

const authValidator = [
  body("email")
    .exists()
    .withMessage("The email must exist.")
    .isEmail()
    .withMessage(
      "The email must follow the following pattern: email@email.com"
    ),
  body("password")
    .exists()
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
    })
    .withMessage(
      "The password field must contain at least 8 characters, including one numeric character"
    ),
];

export default authValidator;