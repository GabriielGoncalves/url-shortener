import "dotenv/config"

const environment = {
    salt: Number(process.env.CRYPT_SALT! || 10),
}

export default environment;