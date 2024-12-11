import 'dotenv/config'
import mongoose from 'mongoose';

const connectDb = () => {
    console.log(String(process.env.CONNECTION_STRING))
    const db:string = String(process.env.CONNECTION_STRING);
    if(!db) {
        console.log('Database connection string is missing.');
        return;
    }
    
    mongoose.connect(db)
        .then(() => console.log(`Connected to ${db}.`))
        .catch((error) => console.log('Error running server: ' + error));
}

export default connectDb