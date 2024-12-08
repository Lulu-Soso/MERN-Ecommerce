import asyncHandler from "../middleware/asyncHandler.js";
import OverallStats from "../models/overallStatsModel.js";

// export const getSales = async (req, res) => {
//     try {
//       const overallStats = await OverallStat.find();

//       res.status(200).json(overallStats[0]);
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
//   };

// @desc    Fetch all sales
// @route   GET /api/sales
// @access  Public
const getOverallStats = asyncHandler(async (req, res) => {
  const overallStats = await OverallStats.find();
  res.json(overallStats);
});

// @desc    Create an OverallStat
// @route   POST /api/overallStats
// @access  Private/Admin
const createOverallStats = asyncHandler(async (req, res) => {
  const overallStats = new OverallStats({
      totalCustomers: 0,
      yearlySalesTotal: 0,
      yearlyTotalSoldUnits: 0,
      year: 0,
      monthlyData: [
        {
          month: "",
          totalSales: 0,
          totalUnits: 0,
        },
      ],
      dailyData: [
        {
          date: "",
          totalSales: 0,
          totalUnits: 0,
        },
      ],
      salesByCategory: {
        type: Map,
        of: 0,
    },
  });

  const createdOverallStats = await overallStats.save();
  res.status(201).json(createdOverallStats);
});

// @desc    Fetch a UPS option by ID
// @route   GET /api/ups/:id
// @access  Public
const getOverallStatsById = asyncHandler(async (req, res) => {
  const overallStats = await OverallStats.findById(req.params.id);

  if (overallStats) {
    return res.json(overallStats);
  } else {
    res.status(404);
    throw new Error("UPS Option not found");
  }
});

// @desc    Update an overallStats
// @route   PUT /api/overallstats/:id
// @access  Private/Admin
const updateOverallStats = asyncHandler(async (req, res) => {
  try {
    // const { id, month, date, salesIncrement, unitsIncrement, category } = req.body;
    const { id, salesIncrement, unitsIncrement } = req.body;

    // Vérifiez si vous avez les informations nécessaires pour la mise à jour
    if (!id || !month || !date || salesIncrement === undefined || unitsIncrement === undefined || !category) {
      return res.status(400).json({ message: 'Des informations manquantes pour la mise à jour des statistiques globales.' });
    }

    // Supposons que vous ayez une instance de votre modèle overallStats
    const overallStats = await OverallStats.findById(id);

    if (!overallStats) {
      return res.status(404).json({ message: 'Statistiques globales non trouvées.' });
    }

    // Si vous avez des données mensuelles, vous pouvez les mettre à jour ici
    const monthlyData = overallStats.monthlyData.find(data => data.month === month);
    if (monthlyData) {
      monthlyData.totalSales += salesIncrement;
      monthlyData.totalUnits += unitsIncrement;
    }

    // Si vous avez des données quotidiennes, vous pouvez les mettre à jour ici
    const dailyData = overallStats.dailyData.find(data => data.date === date);
    if (dailyData) {
      dailyData.totalSales += salesIncrement;
      dailyData.totalUnits += unitsIncrement;
    }

    // Si vous avez besoin de mettre à jour la catégorie
    if (category) {
      overallStats.salesByCategory.set(category, (overallStats.salesByCategory.get(category) || 0) + salesIncrement);
    }

    // Enregistrez les modifications dans la base de données
    await overallStats.save();

    return res.status(200).json({ message: 'Statistiques globales mises à jour avec succès.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour des statistiques globales.' });
  }
});



export { getOverallStats, createOverallStats, getOverallStatsById, updateOverallStats };