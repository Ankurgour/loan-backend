"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLoanStatus = exports.getLoansByStatus = exports.getAllLoanApplications = exports.createLoanApplication = void 0;
const loanModel_ts_1 = __importDefault(require("../models/loanModel.ts"));
// Post a loan application
const createLoanApplication = async (req, res) => {
    try {
        const loanApp = new loanModel_ts_1.default(req.body);
        await loanApp.save();
        res.status(201).json({ message: 'Loan application submitted', loanApp });
    }
    catch (error) {
        res.status(500).json({ message: 'Error submitting loan application', error });
    }
};
exports.createLoanApplication = createLoanApplication;
// Get all loan applications
const getAllLoanApplications = async (req, res) => {
    try {
        const loanApps = await loanModel_ts_1.default.find();
        res.status(200).json(loanApps);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching loan applications', error });
    }
};
exports.getAllLoanApplications = getAllLoanApplications;
// Get loan applications by status
const getLoansByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const loanApps = await loanModel_ts_1.default.find({ status });
        res.status(200).json(loanApps);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching loan applications by status', error });
    }
};
exports.getLoansByStatus = getLoansByStatus;
// Update loan application status (only by admin)
const updateLoanStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (req.role !== 'admin') {
        return res.status(403).json({ message: 'Only admin can update loan status' });
    }
    try {
        const loanApp = await loanModel_ts_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!loanApp) {
            return res.status(404).json({ message: 'Loan application not found' });
        }
        res.status(200).json({ message: 'Loan status updated', loanApp });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating loan status', error });
    }
};
exports.updateLoanStatus = updateLoanStatus;
