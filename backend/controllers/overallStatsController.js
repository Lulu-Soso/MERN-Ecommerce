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

// Fonction pour mettre à jour les statistiques
const updateOverallStats = async (nouvelleCommande) => {
  try {
    // Récupérez les données actuelles de "overallStats"
    const stats = await OverallStats.findOne({ year: nouvelleCommande.year });

    if (!stats) {
      // Si aucune statistique pour cette année n'existe, créez-en une nouvelle
      const newStats = new OverallStat({
        year: nouvelleCommande.year,
        totalCustomers: 1, // Vous pouvez initialiser les valeurs comme vous le souhaitez
        yearlySalesTotal: nouvelleCommande.totalPrice,
        yearlyTotalSoldUnits: nouvelleCommande.cartItems.length,
        monthlyData: [], // Ajoutez les données mensuelles ici si nécessaire
        dailyData: [], // Ajoutez les données quotidiennes ici si nécessaire
        salesByCategory: {}, // Ajoutez les données de ventes par catégorie ici si nécessaire
      });

      await newStats.save();
    } else {
      // Mettez à jour les données actuelles de "overallStats" en fonction de la nouvelle commande
      stats.totalCustomers += 1;
      stats.yearlySalesTotal += nouvelleCommande.totalPrice;
      stats.yearlyTotalSoldUnits += nouvelleCommande.cartItems.length;

      // Mettez à jour les données mensuelles, quotidiennes, ou par catégorie si nécessaire

      await stats.save();
    }

    return stats;
  } catch (error) {
    throw error;
  }
};

export { getOverallStats,  updateOverallStats };