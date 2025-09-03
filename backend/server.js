import express from "express";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import searchRoutes from "./routes/search.route.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

import cookieParser from "cookie-parser";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

let connection;

app.use("/api/auth", authRoutes);
app.use("/api/movie", protectRoute, movieRoutes);
app.use("/api/search", protectRoute, searchRoutes);
app.use("/api/user", protectRoute, userRoutes);
app.use("/api/admin", protectRoute, adminRoutes);

app.listen(PORT, async () => {
  console.log(`Server started at http://localhost:${PORT}`);
  connection = await connectDB();
});
