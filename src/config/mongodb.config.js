import env from 'env-var';


const MONGODB_URI = env.get('MONGODB_URI').required().asString();
const MONGODB_USER = env.get('MONGODB_USER').required().asString();
const MONGODB_PASSWORD = env.get('MONGODB_PASSWORD').required().asString();

const MONGODB_DBNAME = env.get('MONGODB_DBNAME').required().asString();


export {
    MONGODB_URI,
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_DBNAME,
};