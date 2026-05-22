"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomers = exports.createCustomer = void 0;
const customerModel_1 = require("../models/customerModel");
const createCustomer = async (req, res) => {
    const { id, name, age, isAdmin, email } = req.body;
    try {
        if (!id || !name || !email) {
            return res.status(400).json({ message: "id, name and email are required" });
        }
        const newCustomer = new customerModel_1.CustomerModel({ id, name, age, isAdmin, email });
        const savedCustomer = await newCustomer.save();
        return res.status(201).json({
            message: "Customer created successfully",
            data: savedCustomer
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Error creating customer", error });
    }
};
exports.createCustomer = createCustomer;
const getCustomers = async (req, res) => {
    try {
        const customers = await customerModel_1.CustomerModel.find();
        return res.status(200).json(customers);
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching customers", error });
    }
};
exports.getCustomers = getCustomers;
