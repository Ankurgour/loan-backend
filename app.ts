import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from "./routes/user"
import loanRoutes from "./routes/loanRoutes"
import cors from "cors"
// import userRoutes from './routes/userRoutes';

dotenv.config();
const dbUri = process.env.MONGODB_URI;
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// app.use('/api/users', userRoutes);
app.get("/",(req,res)=>{
    res.send("hello worlds");
})
app.use("/api/v1",userRoutes);
app.use("/api/loans",loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
