import env from 'env-var';


const PORT = env.get('API_PORT').asIntPositive();
const DEV_MODE = env.get('API_ENV').asString() === 'development';
const API_HOST = env.get('API_HOST').asString() === 'development';


export {
    PORT,
    DEV_MODE,
    API_HOST,
};