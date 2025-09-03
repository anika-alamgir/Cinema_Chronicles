import express from "express";
import {
  getActorDetails,
  getAllMovies,
  getMovieDetails,
  getTrendingMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/", getAllMovies);

router.get("/details/:id", getMovieDetails);
router.get("/actor/:id", getActorDetails);

export default router;
