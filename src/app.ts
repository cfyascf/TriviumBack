import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { handleError } from "./middleware/errorHandler.middleware";
import formRoutes from "./routes/form.routes";
import userRoutes from "./routes/user.routes";
import questionRoutes from "./routes/question.routes";

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/form', formRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/question', questionRoutes);


app.use(handleError);

export default app;