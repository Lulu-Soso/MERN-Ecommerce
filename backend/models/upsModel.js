import mongoose from "mongoose";

const deliveryFeeSchema = mongoose.Schema({
  france: { type: Number, required: true },
  europeanUnion: { type: Number, required: true },
  unitedKingdom: { type: Number, required: true },
  unitedStates: { type: Number, required: true },
});

const upsSchema = mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  fees: {
    type: deliveryFeeSchema,
    required: true,
  },
});

const Ups = mongoose.model("Ups", upsSchema);

export default Ups;
