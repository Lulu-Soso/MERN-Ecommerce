import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetOrdersQuery } from "../../../slices/ordersApiSlice";

const OverviewChart = ({ isDashboard = false, view }) => {
    const theme = useTheme();
    const { data: orders, isLoading } = useGetOrdersQuery();

    const [totalSalesLine, totalUnitsLine] = useMemo(() => {
        if (!orders || orders.length === 0) {
            return [[], []]; // Retourne des tableaux vides pour totalSalesLine et totalUnitsLine
          }
      
        // Création d'un tableau de mois distincts
        const months = [...new Set(orders.map(order => new Date(order.createdAt).toLocaleString('default', { month: 'long' })))];

        // Tri des mois par ordre chronologique
        months.sort((a, b) => {
          const dateA = new Date(`01 ${a}`);
          const dateB = new Date(`01 ${b}`);
          return dateA - dateB;
        });

        // Création des données pour les ventes
        const salesData = [];
        let totalSales = 0;

        // Création des données pour les unités
        const unitsData = [];
        let totalUnits = 0;

        months.forEach(month => {
          // Calcul de la somme totale des ventes pour ce mois
          const salesForMonth = orders
            .filter(order => new Date(order.createdAt).toLocaleString('default', { month: 'long' }) === month)
            .reduce((acc, order) => acc + order.totalPrice, 0);

          totalSales += salesForMonth;

          // Calcul de la somme totale des unités vendues pour ce mois
          const unitsForMonth = orders
            .filter(order => new Date(order.createdAt).toLocaleString('default', { month: 'long' }) === month)
            .reduce((acc, order) => acc + order.orderItems.reduce((sum, item) => sum + item.qty, 0), 0);

          totalUnits += unitsForMonth;

          salesData.push({ x: month, y: totalSales });
          unitsData.push({ x: month, y: totalUnits });
        });

        return [
          { id: "totalPrice", color: theme.palette.secondary.main, data: salesData },
          { id: "orderItems", color: theme.palette.secondary[600], data: unitsData }
        ];
      
      }, [orders, theme.palette]);
  
    if (isLoading) return <div>Loading...</div>;
     // Vérifiez si orders est vide ou null
    if (!orders || orders.length === 0) return <div>No data available</div>;
  
    const chartData = view === "sales" ? [totalSalesLine] : [totalUnitsLine];
  
    return (
      <ResponsiveLine
        data={chartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Mois",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Chiffre d'affaires" : "Nombre d'unités"} pour l'année`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;
