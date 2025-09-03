import { connectDB } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

let connection;

// Admin authentications

export async function adminSignup(req, res) {
    try {
        const { email, fname, lname, adminPass, password, dob } = req.body;

        if (!email || !adminPass || !fname || !password || !dob) {
            return res
                .status(400)
                .json({ success: false, message: "Please enter all fields" });
        }

        if (adminPass !== process.env.ADMIN_PASS) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Admin Password" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid email address" });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        if (!connection) {
            connection = await connectDB();
        }

        const [existingUser] = await connection.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {
            return res
                .status(400)
                .json({ success: false, message: "User email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [newAdminResult] = await connection.query(
            "INSERT INTO users (email, first_name, last_name, password, dob, role) VALUES (?, ?, ?, ?, ?, ?)",
            [email, fname, lname, hashedPassword, dob, "admin"]
        );

        const [newAdmin] = await connection.query(
            "SELECT * FROM users WHERE users_id = ?",
            [newAdminResult.insertId]
        );

        res.status(201).json({
            success: true,
            user: { ...newAdmin[0], password: "" },
            message: "Admin registered successfully",
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export async function adminLogin(req, res) {
    try {
        const { adminPass, email, password } = req.body;

        if (!email || !password || !adminPass) {
            return res
                .status(400)
                .json({ success: false, message: "Please enter all fields" });
        }

        if (adminPass !== process.env.ADMIN_PASS) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Admin Password" });
        }

        if (!connection) {
            connection = await connectDB();
        }

        const [admin] = await connection.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (admin.length === 0) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Email or Password didn't match",
                });
        }

        if (admin[0].role !== "admin") {
            return res
                .status(404)
                .json({ success: false, message: "You're not an Admin" });
        }

        const isMatch = await bcrypt.compare(password, admin[0].password);

        if (!isMatch) {
            return res
                .status(404)
                .json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(admin[0].users_id, res);
        res.status(201).json({
            success: true,
            user: { ...admin[0], password: "" },
            message: "Admin Logged in successfully",
        });
    } catch (error) {
        console.log("Error in adminLogin", error.message);
        res.status(500).send("Server Error");
    }
}

// Regular user authentications

export async function signup(req, res) {
    try {
        const { email, fname, lname, password, dob } = req.body;

        if (!email || !fname || !password || !dob) {
            return res
                .status(400)
                .json({ success: false, message: "Please enter all fields" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid email address" });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        if (!connection) {
            connection = await connectDB();
        }

        const [existingUser] = await connection.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {
            return res
                .status(400)
                .json({ success: false, message: "User email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [newUserResult] = await connection.query(
            "INSERT INTO users (email, first_name, last_name, password, dob, role) VALUES (?, ?, ?, ?, ?, ?)",
            [email, fname, lname, hashedPassword, dob, "user"]
        );

        const [newUser] = await connection.query(
            "SELECT * FROM users WHERE users_id = ?",
            [newUserResult.insertId]
        );

        res.status(201).json({
            success: true,
            user: { ...newUser[0], password: "" },
            message: "User registered successfully",
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "Please enter all fields" });
        }

        if (!connection) {
            connection = await connectDB();
        }

        const [user] = await connection.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (user.length === 0) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "You are not a registered member",
                });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);

        if (!isMatch) {
            return res
                .status(404)
                .json({ success: false, message: "Wrong password" });
        }

        generateTokenAndSetCookie(user[0].users_id, res);
        res.status(201).json({
            success: true,
            user: { ...user[0], password: "" },
            message: "User Logged in successfully",
        });
    } catch (error) {
        console.log("Error in login", error.message);
        res.status(500).send("Server Error");
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("jwt-cinema-chronicles");
        res.status(200).json({
            success: true,
            message: "Logged out successfully ",
        });
    } catch (error) {
        console.log("Error in logout", error.message);
        res.status(500).send("Server Error");
    }
}

export async function forgotPassword(req, res) {
    try {
        const { email, newpass } = req.body;

        if (!email) {
            return res
                .status(400)
                .json({ success: false, message: "Please enter email" });
        }

        if (!newpass) {
            return res
                .status(400)
                .json({ success: false, message: "Please enter new password" });
        }

        if (!connection) {
            connection = await connectDB();
        }

        const [user] = await connection.query(
            "SELECT users_id FROM users WHERE email = ?",
            [email]
        );

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User with this email does not exist",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpass, salt);

        await connection.query(
            "UPDATE users SET password = ? WHERE users_id = ?",
            [hashedPassword, user[0].users_id]
        );

        res.status(200).json({
            success: true,
            message:
                "Reset password Successful, Please login with new password",
        });
    } catch (error) {
        console.log("Error in forgotPassword", error.message);
        res.status(500).send("Server Error");
    }
}

export async function authCheck(req, res) {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        // console.log("Error in authCheck", error.message);
        res.status(500).send("Server Error");
    }
}
