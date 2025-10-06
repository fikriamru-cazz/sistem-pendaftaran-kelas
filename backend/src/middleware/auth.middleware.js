import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === Role.ADMIN) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};
