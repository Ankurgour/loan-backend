import mongoose, { Document, Schema } from 'mongoose';

interface ILoanApplication extends Document {
  fullName: string;
  loanAmount: number;
  userId:mongoose.Schema.Types.ObjectId,
  loanTenure: number;        // in months
  employmentStatus: string;
  loanReason: string;
  employmentAddress1: string;
  employmentAddress2: string;
  termsAccepted: boolean;
  applicationDate: Date;
  status: string;            // 'under review', 'approved', 'rejected'
}

const loanApplicationSchema = new Schema<ILoanApplication>({
  fullName: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  loanTenure: { type: Number, required: true }, // Loan tenure in months
  employmentStatus: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
  loanReason: { type: String, required: true },
  employmentAddress1: { type: String, required: true },
  employmentAddress2: { type: String, required: false },
  termsAccepted: { type: Boolean, required: true },
  applicationDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    default: 'under review', 
    enum: ['under review', 'approved', 'rejected','verified'] 
  }
});

const LoanApplication = mongoose.model<ILoanApplication>('LoanApplication', loanApplicationSchema);
export default LoanApplication;
