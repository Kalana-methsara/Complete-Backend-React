"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = void 0;
const userModel_1 = require("../models/userModel");
const createUser = async (req, res) => {
    const { name, email, password, userRole, approved } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }
        const existingUser = await userModel_1.UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        const newUser = new userModel_1.UserModel({ name, email, password, userRole, approved });
        const savedUser = await newUser.save();
        return res.status(201).json({ message: "User created successfully", data: savedUser });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error creating user",
            error: error.message || error
        });
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const users = await userModel_1.UserModel.find();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({
            message: "Error fetching users",
            error: error.message || error
        });
    }
};
exports.getUsers = getUsers;
