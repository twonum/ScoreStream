import mongoose from "mongoose";

const CalculationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  semesters: { type: Array, required: true },
  result: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Calculation ||
  mongoose.model("Calculation", CalculationSchema);
