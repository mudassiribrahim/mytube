import mongoose from 'mongoose';
import { dbName } from '../constants.js';

const connectDb = async () => {
    try {
        const connectionInctanse = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
        console.log(`\n MOngo db is connected on DB host : ${connectionInctanse.connection.host}`);
    } catch (error) {
        console.log('MongoDb connection error', error);
    }
};

export default connectDb;
