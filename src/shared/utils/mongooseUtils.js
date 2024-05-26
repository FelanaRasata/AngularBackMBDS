import mongoose, { mongo } from 'mongoose';
import { MONGODB_DBNAME, MONGODB_PASSWORD, MONGODB_URI, MONGODB_USER } from '../../config/mongodb.config.js';
import Loggeo from './logger.js';


export const CUSTOM_LABELS = {
    'totalDocs': 'totalItems',
    'docs': 'items',
    'limit': 'itemsPerPage',
    'meta': 'paginator',
};


export async function mongooseConnect() {


    try {

        mongoose.set('strictQuery', false);

        await mongoose.connect(
            MONGODB_URI,
            {
                user: MONGODB_USER,
                pass: MONGODB_PASSWORD,
                dbName: MONGODB_DBNAME,
            },
        );

        Loggeo.info('MongoDB Connected...');

    } catch (error) {

        Loggeo.error(`MongoDB Connection failed due to:\n${error}\n`);
        process.exit(1);

    }


}


export function toBaseModel(schemaDefinition) {

    return {
        ...schemaDefinition,
        deleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    };

}


export function toDocumentFormat(userData) {

    return { ...userData, _id: String(new mongo.ObjectId()) };

}