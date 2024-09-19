import { Request, Response } from 'express';
import LoanApplication from '../models/loanModel';
import { IGetUser } from '../routes/role';

type Role = 'user' | 'admin' | 'verifier';

// Post a loan application
export const createLoanApplication = async (req: IGetUser, res: Response) => {
  try {
    const userId = req.user;
    const newLoan = {...req.body,userId}
    const loanApp = new LoanApplication(newLoan);
    await loanApp.save();
    res.status(201).json({ message: 'Loan application submitted', loanApp });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting loan application', error });
  }
};

// Get all loan applications
export const getAllLoanApplications = async (req: IGetUser, res: Response) => {
  try {
    const loanApps = await LoanApplication.find();
    res.status(200).json(loanApps);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan applications', error });
  }
};

// Get loan applications by status
export const getLoansByStatus = async (req: IGetUser, res: Response) => {
  const  userId  = req.user;
  try {
    const loanApps = await LoanApplication.find({ userId });
    res.status(200).json(loanApps);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan applications by userId', error });
  }
};

// Update loan application status (only by admin)
export const updateLoanStatus = async (req: IGetUser, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (req.role === "user") {
    return res.status(403).json({ message: 'Only admin and verifier can update loan status' });
  }

  try {
    const loanApp = await LoanApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!loanApp) {
      return res.status(404).json({ message: 'Loan application not found' });
    }

    res.status(200).json({ message: 'Loan status updated', loanApp });
  } catch (error) {
    res.status(500).json({ message: 'Error updating loan status', error });
  }
};
