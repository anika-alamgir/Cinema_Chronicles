import express from "express";
import {
  adminLogin,
  adminSignup,
  authCheck,
  forgotPassword,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/adminsignup", adminSignup);
router.post("/adminlogin", adminLogin);

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/logout", logout);

router.get("/check", protectRoute, authCheck);

export default router;
