import express from "express";
import {
  addMovies,
  deleteMovies,
  deleteUser,
  getMovies,
  getUsers,
  updateMovie,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

router.get("/movies", getMovies);
router.post("/addmovie", addMovies);

router.patch("/movie/:id", updateMovie);
router.delete("/movie/:id", deleteMovies);

export default router;
