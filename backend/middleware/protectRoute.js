import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { connectDB } from "../config/db.js";

let connection;

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-cinema-chronicles"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token ",
      });
    }

    if (!connection) {
      connection = await connectDB();
    }

    const [user] = await connection.query(
      "SELECT users_id, email, first_name, last_name, role FROM users WHERE users_id = ?",
      [decoded.userId]
    );

    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user[0];

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
