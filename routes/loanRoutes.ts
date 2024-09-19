import { Router } from 'express';
import { 
  createLoanApplication, 
  getAllLoanApplications, 
  getLoansByStatus, 
  updateLoanStatus 
} from '../controllers/loan'
import { protect } from '../middleware/auth';  // Auth middleware

const router = Router();

// POST a new loan application
router.post('/apply', protect, createLoanApplication);

// GET all loan applications
router.get('/all', protect, getAllLoanApplications);

// GET loan applications by status
router.get('/status', protect, getLoansByStatus);

// PATCH update loan application status (admin only)
router.patch('/update-status/:id', protect, updateLoanStatus);

export default router;
