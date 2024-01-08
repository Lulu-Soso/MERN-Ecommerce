import express from "express";
const router = express.Router();
import {
  getUpsOptions,
  getUpsOptionById,
  createUpsOption,
  updateUpsOption,
  deleteUpsOption
} from "../controllers/upsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// Route to get all UPS options and create a new option
router.route('/')
  .get(getUpsOptions)
  .post(protect, admin, createUpsOption);

// Route to get, update, or delete a specific UPS option
router.route('/:id')
  .get(getUpsOptionById)
  .put(protect, admin, updateUpsOption)
  .delete(protect, admin, deleteUpsOption);

export default router;
