"use strict";
// customerModels.ts
// customer.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number },
    isAdmin: { type: Boolean, default: true },
    email: { type: String, required: true, unique: true }
}, { timestamps: true });
exports.CustomerModel = (0, mongoose_1.model)('customer', customerSchema);
