import env from 'env-var';


const PORT = env.get('API_PORT').required().asIntPositive();
const DEV_MODE = env.get('API_ENV').asString() === 'development';
const API_HOST = env.get('API_HOST').required().asString();
const API_SECRET_KEY = env.get('API_SECRET_KEY').required().asString();
const API_TOKEN_EXPIRATION = env.get('API_TOKEN_EXPIRATION').required().asString();


export {
    PORT,
    DEV_MODE,
    API_HOST,
    API_SECRET_KEY,
    API_TOKEN_EXPIRATION
};