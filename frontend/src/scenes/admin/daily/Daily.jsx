import React, { useMemo, useState } from "react";
import { Box, useTheme} from "@mui/material";
import Header from "../dashboard/components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetOrdersQuery } from "../../../slices/ordersApiSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Daily = () => {
  const [startDate, setStartDate] = useState(new Date("2024-01-01"));
  const [endDate, setEndDate] = useState(new Date("2024-03-01"));
  const { data } = useGetOrdersQuery(); // Utilisez useGetOrdersQuery pour obtenir les données des commandes

  console.log(data);
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const ordersInRange = data.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });

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
    

    // Agrégation des données par jour
    const dailyData = {};

    ordersInRange.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const dateKey = orderDate.toISOString().split("T")[0];

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          totalSales: 0,
          totalUnits: 0,
        };
      }

      dailyData[dateKey].totalSales += order.totalPrice;

      order.orderItems.forEach((item) => {
        dailyData[dateKey].totalUnits += item.qty;
      });
    });

    Object.keys(dailyData).forEach((dateKey) => {
      const date = new Date(dateKey);
      const splitDate = date.toLocaleDateString("default", {
        month: "short",
        day: "numeric",
      });

      totalSalesLine.data.push({
        x: splitDate,
        y: dailyData[dateKey].totalSales,
      });
      totalUnitsLine.data.push({
        x: splitDate,
        y: dailyData[dateKey].totalUnits,
      });
    });

    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
  }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

console.log(formattedData);
return (
  <Box m="1.5rem 2.5rem">
    <Header title="DAILY SALES" subtitle="Chart of daily sales" />
    <Box height="75vh">
      <Box display="flex" justifyContent="flex-end">
        <Box>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </Box>
        <Box>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </Box>
      </Box>

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
            legend: "Month",
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

export default Daily;