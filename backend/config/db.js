import mysql from "mysql2/promise";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: ENV_VARS.DB_HOST,
      user: ENV_VARS.DB_USER,
      password: ENV_VARS.DB_PASSWORD,
      database: ENV_VARS.DB_NAME,
    });
    console.log("Database connected");
    return connection;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
