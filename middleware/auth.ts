import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IGetUser } from '../routes/role';


interface JwtPayload {
  id: string;
  role: string;
}

export const protect = (req: IGetUser, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded:any = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    req.user = decoded.id;
    req.role = decoded.role;  // Store the role in req.role

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
