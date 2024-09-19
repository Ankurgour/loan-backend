import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, role, adminKey, verifierKey } = req.body;
  
    // Verify role with appropriate key
    if (role === 'admin' && adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ message: 'Invalid admin key' });
    }
  
    if (role === 'verifier' && verifierKey !== process.env.VERIFIER_KEY) {
      return res.status(403).json({ message: 'Invalid verifier key' });
    }
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role, // Store the role
      });
  
      await user.save();
  
      // Include role in the JWT payload
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });
  
      res.status(201).json({ token });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Server error' });
    }
  };
  

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });
  
      res.json({user,token});
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
};