import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { handleError } from "./middleware/errorHandler.middleware";
import formRoutes from "./routes/form.routes";

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/form', formRoutes);

app.use(handleError);

export default app;