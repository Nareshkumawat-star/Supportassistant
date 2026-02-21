import { connect } from "mongoose";

const mongo_url = process.env.MONGODB_URI || process.env.MONGODB_URL;

if (!mongo_url) {
    throw new Error("Please provide a MongoDB URI (MONGODB_URI or MONGODB_URL)");
}


// @ts-ignore
let cache = global.mongooseCache;

if (!cache) {
    // @ts-ignore
    cache = global.mongooseCache = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cache.conn) {
        return cache.conn;
    }

    if (!cache.promise) {
        cache.promise = connect(mongo_url).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cache.conn = await cache.promise;
        console.log("Connected to MongoDB");
        return cache.conn;
    } catch (error) {
        cache.promise = null;
        console.log(error);
        throw error;
    }
};

export default connectDB;

