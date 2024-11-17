import "dotenv/config"

const environment = {
    salt: Number(process.env.CRYPT_SALT! || 10),
    secret_key: process.env.SECRET_KEY
}

export default environment;