import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { handleError } from "./middleware/errorHandler.middleware";
import formRoutes from "./routes/form.routes";
import userRoutes from "./routes/user.routes";
import questionRoutes from "./routes/question.routes";
import optionRoutes from "./routes/option.routes";
import answerRoutes from "./routes/answer.routes";
import matchRoutes from "./routes/match.routes";

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/form', formRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/question', questionRoutes);
app.use('/api/v1/option', optionRoutes);
app.use('/api/v1/answer', answerRoutes);
app.use('/api/v1/match', matchRoutes);

app.use(handleError);

export default app;