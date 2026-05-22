"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const userRole_1 = require("./enums/userRole");
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userRole: {
        type: [String],
        enum: Object.values(userRole_1.UserRole),
        default: [userRole_1.UserRole.USER]
    },
    approved: { type: Boolean, default: false }
});
exports.UserModel = (0, mongoose_1.model)('user', userSchema);
