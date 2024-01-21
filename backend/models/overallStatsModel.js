import mongoose from "mongoose";

const overallStatsSchema = new mongoose.Schema(
  {
    totalCustomers: { type: Number, required: true },
    yearlySalesTotal: { type: Number, required: true },
    yearlyTotalSoldUnits: { type: Number, required: true },
    year: { type: Number, required: true },
    monthlyData: [
      {
        month: { type: String, required: true },
        totalSales: { type: Number, required: true },
        totalUnits: { type: Number, required: true },
      },
    ],
    dailyData: [
      {
        date: { type: String, required: true },
        totalSales: { type: Number, required: true },
        totalUnits: { type: Number, required: true },
      },
    ],
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }
);

const OverallStats = mongoose.model("OverallStats", overallStatsSchema);
export default OverallStats;