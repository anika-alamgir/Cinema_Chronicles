import express from "express";
import {
  searchMovie,
  searchMovieByGenre,
  searchMovieByActor,
  searchMovieByDirector,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/movie/:query", searchMovie);
router.get("/genre/:query", searchMovieByGenre);
router.get("/actor/:query", searchMovieByActor);
router.get("/director/:query", searchMovieByDirector);

export default router;
