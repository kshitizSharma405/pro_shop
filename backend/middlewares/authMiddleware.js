// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";
// import asyncHandler from "./asyncHandler.js";

// const protect = asyncHandler(async (req, res, next) => {
//   let token;
//   token = req.cookies.jwt;
//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.userId).select("-password");
//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not Authorized, token failed");
//     }
//   } else {
//     res.status(401);
//     throw new Error("Not Authorized, no token");
//   }
// });

// // Admin Middleware

// const admin = async (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401);
//     throw new Error("Not Authorized as admin");
//   }
// };

// export { admin, protect };

import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
