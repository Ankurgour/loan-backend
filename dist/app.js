"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
// import userRoutes from './routes/userRoutes';
dotenv_1.default.config();
const dbUri = process.env.MONGODB_URI;
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use('/api/users', userRoutes);
app.get("/", (req, res) => {
    res.send("hello worlds");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
