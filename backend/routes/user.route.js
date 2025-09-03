import express from "express";
import {
  postFeedback,
  deleteItemFromWatchlist,
  getWatchlist,
  addToWatchlist,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/rating/:id", postFeedback);

router.get("/watchlist", getWatchlist);
router.post("/watchlist/:id", addToWatchlist);
router.delete("/watchlist/:id", deleteItemFromWatchlist);

export default router;
