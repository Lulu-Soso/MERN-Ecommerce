import asyncHandler from "../middleware/asyncHandler.js";
import Ups from "../models/upsModel.js"; // Ensure this is the correct path to your UPS model


// @desc    Fetch all UPS options
// @route   GET /api/ups
// @access  Public
const getUpsOptions = asyncHandler(async (req, res) => {
  const upsOptions = await Ups.find({});
  res.json(upsOptions);
});

// @desc    Fetch a UPS option by ID
// @route   GET /api/ups/:id
// @access  Public
const getUpsOptionById = asyncHandler(async (req, res) => {
  const upsOption = await Ups.findById(req.params.id);

  if (upsOption) {
    return res.json(upsOption);
  } else {
    res.status(404);
    throw new Error("UPS Option not found");
  }
});

// @desc    Create a new UPS option
// @route   POST /api/ups
// @access  Private/Admin
const createUpsOption = asyncHandler(async (req, res) => {
  const upsOption = new Ups({
    // Add the necessary fields
    label: "New Option",
    fees: {
      france: 0,
      europeanUnion: 0,
      unitedKingdom: 0,
      unitedStates: 0
    }
  });

  const createdUpsOption = await upsOption.save();
  res.status(201).json(createdUpsOption);
});

// @desc    Update a UPS option
// @route   PUT /api/ups/:id
// @access  Private/Admin
const updateUpsOption = asyncHandler(async (req, res) => {
  const { label, fees } = req.body;
  const upsOption = await Ups.findById(req.params.id);

  if (upsOption) {
    upsOption.label = label;
    upsOption.fees = fees;
    // Update other fields as necessary

    const updatedUpsOption = await upsOption.save();
    res.json(updatedUpsOption);
  } else {
    res.status(404);
    throw new Error("UPS Option not found");
  }
});

// @desc    Delete a UPS option
// @route   DELETE /api/ups/:id
// @access  Private/Admin
const deleteUpsOption = asyncHandler(async (req, res) => {
  const upsOption = await Ups.findById(req.params.id);

  if (upsOption) {
    await Ups.deleteOne({ _id: upsOption._id });
    res.json({ message: "UPS Option removed" });
  } else {
    res.status(404);
    throw new Error("UPS Option not found");
  }
});

export {
  getUpsOptions,
  getUpsOptionById,
  createUpsOption,
  updateUpsOption,
  deleteUpsOption
};
