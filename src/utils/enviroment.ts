import "dotenv/config";

const environment = {
  salt: Number(process.env.CRYPT_SALT! || 10),
  secret_key: process.env.SECRET_KEY,
  base_url: `${process.env.BASE_URL}:${process.env.PORT}/api`,
};

export default environment;
