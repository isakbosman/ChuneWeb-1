var dotenv = require('dotenv');

dotenv.config();

const credentials = {
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
  "auth_uri": process.env.AUTH_URI,
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
  "private_key": process.env.PRIVATE_KEY,
  "private_key_id":process.env.PRIVATE_KEY_ID,
  "project_id": process.env.PROJECT_ID,
  "token_uri": process.env.TOKEN_URI,
  "type": process.env.TYPE,
}

module.exports = credentials;