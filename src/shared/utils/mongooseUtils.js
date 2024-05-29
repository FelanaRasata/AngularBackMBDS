import mongoose from 'mongoose';
import { MONGODB_DBNAME, MONGODB_PASSWORD, MONGODB_URI, MONGODB_USER } from '../../config/mongodb.config.js';
import Loggeo from './logger.js';
import { isEmpty } from './tools.js';


export const CUSTOM_LABELS = {
    'totalDocs': 'totalItems',
    'docs': 'items',
    'limit': 'itemsPerPage',
    'meta': 'paginator',
};


export async function mongooseConnect() {


    try {

        mongoose.set('strictQuery', false);

        const connectionOptions = {
            dbName: MONGODB_DBNAME,
        };

        if (!isEmpty(MONGODB_USER) && !isEmpty(MONGODB_PASSWORD)) {
            connectionOptions.user = MONGODB_USER;
            connectionOptions.pass = MONGODB_PASSWORD;
        }

        await mongoose.connect(
            MONGODB_URI,
            connectionOptions,
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
