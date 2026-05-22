"use strict";
// customerRouter.ts
// customer.router.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerController_1 = require("../controller/customerController");
const router = (0, express_1.Router)();
router.post('/', customerController_1.createCustomer);
router.get('/', customerController_1.getCustomers);
exports.default = router;
