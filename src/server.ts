import connectDb from './startup/db';
import app from "./app";

const startServer = () => {
    try {
        connectDb()

        const port: number = Number(process.env.PORT);
        app.listen(port, () => console.log(`Listening on port ${port}`));
    } catch(err) {
        console.error("Error connecting to database.");
    }
}

startServer();