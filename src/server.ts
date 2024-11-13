import connectDb from './startup/db';
import app from "./app";
import startWSS from './wss';

const startServer = () => {
    try {
        connectDb()
        
        const port: number = Number(process.env.PORT);
        const server = app.listen(port, () => console.log(`Listening on port ${port}`));
        
        startWSS(server);

    } catch(err) {
        console.error("Error connecting to database.");
    }
}

startServer();