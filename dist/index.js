"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerRouter_1 = __importDefault(require("./routers/customerRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/customers", customerRouter_1.default);
app.use("/api/v1/users", userRouter_1.default);
mongoose_1.default.connect("mongodb://localhost:27017/customerdb").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});
app.listen(5000, () => {
    console.log("Server is running on port : 5000");
});
