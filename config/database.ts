import mongoose from "mongoose";

export const connect = async () : Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connect database successfully');
    } catch (error) {
        console.log('Connect database error: ', error);
    }
}
