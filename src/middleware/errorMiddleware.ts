// src/middleware/errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';

// අනිවාර්යයෙන්ම පරාමිති 4ක් තිබිය යුතුය (err, req, res, next)
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

