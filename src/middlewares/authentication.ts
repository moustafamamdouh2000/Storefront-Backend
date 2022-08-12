import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function authentication(req: Request, res: Response, next: NextFunction): void {
  try {
    const ourToken = process.env.TOKEN_SECRET as Secret;
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, ourToken);
    return next();
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
}
