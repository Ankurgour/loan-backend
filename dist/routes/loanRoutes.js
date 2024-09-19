"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loan_1 = require("../controllers/loan");
const auth_1 = require("../middleware/auth"); // Auth middleware
const router = (0, express_1.Router)();
// POST a new loan application
router.post('/apply', auth_1.protect, loan_1.createLoanApplication);
// GET all loan applications
router.get('/all', auth_1.protect, loan_1.getAllLoanApplications);
// GET loan applications by status
router.get('/status/:status', auth_1.protect, loan_1.getLoansByStatus);
// PATCH update loan application status (admin only)
router.patch('/update-status/:id', auth_1.protect, loan_1.updateLoanStatus);
exports.default = router;
