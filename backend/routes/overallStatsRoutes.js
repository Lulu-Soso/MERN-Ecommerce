import express from "express";
import { getOverallStats, createOverallStats, getOverallStatsById, updateOverallStats } from "../controllers/overallStatsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(protect, admin, getOverallStats)
    .post(protect, admin, createOverallStats)
    // .put(protect, admin, updateOverallStats)

router.route('/:id')
.get(getOverallStatsById)
.put(protect, updateOverallStats);

export default router;