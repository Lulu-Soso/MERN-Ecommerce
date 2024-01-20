import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../dashboard/components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetOrdersQuery } from "../../../slices/ordersApiSlice";

const Monthly = () => {
  const { data } = useGetOrdersQuery(); // Utilisez useGetOrdersQuery pour obtenir les données des commandes
  const theme = useTheme();

  // Tableau de correspondance des numéros de mois en mots
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const totalSalesLine = {
      id: "totalPrice",
      color: theme.palette.secondary.main,
      data: [],
    };

    const totalUnitsLine = {
      id: "orderItems qty",
      color: theme.palette.secondary[600],
      data: [],
    };

    // Agréger les données par mois
    const monthlyData = {};

    data.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const monthYearKey = `${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;

      if (!monthlyData[monthYearKey]) {
        monthlyData[monthYearKey] = {
          totalSales: 0,
          totalUnits: 0,
        };
      }

      monthlyData[monthYearKey].totalSales += order.totalPrice;

      order.orderItems.forEach((item) => {
        monthlyData[monthYearKey].totalUnits += item.qty;
      });
    });

    Object.keys(monthlyData).forEach((monthYearKey) => {
      const [month] = monthYearKey.split("/");
      const monthName = monthNames[parseInt(month)]; // Convertir le numéro du mois en nom du mois
      totalSalesLine.data.push({
        x: `${monthName}`,
        y: monthlyData[monthYearKey].totalSales,
      });
      totalUnitsLine.data.push({
        x: `${monthName}`,
        y: monthlyData[monthYearKey].totalUnits,
      });
    });

    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(formattedData);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY SALES" subtitle="Chart of monthlysales" />
      <Box height="75vh">
        {data ? (
          <ResponsiveLine
            data={formattedData}
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
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
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
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Mois",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
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
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
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
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Monthly;