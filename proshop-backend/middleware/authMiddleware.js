import { request } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = asyncHandler(async(req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
    try {
      const { id } = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id).select('-password');
    } catch(e) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  if(!token) {
    res.status(401);
    throw new Error('Not authorized, no token found')
  }
  next();
})

const admin = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401)
    throw new Error('Not an admin')
  }
}


export { protect, admin }