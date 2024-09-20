import mongoose from 'mongoose';
import 'dotenv/config'

const connectDb = () => {
    const db:string = String(process.env.CONNECTION_STRING);
    if(!db) {
        console.log('Database connection string is missing.');
        return;
    }
    
    mongoose.connect(db)
        .then(() => console.log(`Connected to ${db}.`))
<<<<<<< HEAD
        .catch((error) => console.log('Error running server: ' + error));
=======
        .catch((error) => console.log(error))
>>>>>>> feat-yasmim
}

export default connectDb