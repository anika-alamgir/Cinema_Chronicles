import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN_PASS: process.env.ADMIN_PASS,
};
