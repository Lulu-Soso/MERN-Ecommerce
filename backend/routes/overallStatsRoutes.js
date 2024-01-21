import express from "express";
import { getOverallStats } from "../controllers/overallStatsController.js";
// import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getOverallStats)
// (protect, admin, getOverallStats);

export default router;