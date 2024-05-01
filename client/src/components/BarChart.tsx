import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { useTheme } from "../contexts/ThemeContext";
import axios from "axios";

interface SaleData {
  store_address: string;
  transaction_date: string;
  total_sales: number;
}

const BarChart: React.FC = () => {
  const { theme } = useTheme();
  const [salesData, setSalesData] = useState<SaleData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = new String(import.meta.env.VITE_API_ENDPOINT);
        const response = await axios.get(`${baseURL}/dailysales`);
        setSalesData(response.data as SaleData[]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const getOption = () => {
    const xAxisData = [...new Set(salesData.map((item) => item.transaction_date))];
    const uniqueStoreAddresses = [...new Set(salesData.map((item) => item.store_address))];
    const seriesData = uniqueStoreAddresses.map((storeAddress) => {
      return {
        name: storeAddress,
        type: "bar",
        stack: "total",
        data: salesData
          .filter((item) => item.store_address === storeAddress)
          .map((item) => item.total_sales),
      };
    });
    return {
      title: {
        text: "Daily Sales by Store",
        left: "center",
        textStyle: {
          color: theme === "dark" ? "#FFFFFF" : "#000000",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: uniqueStoreAddresses,
        textStyle: {
          color: theme === "dark" ? "#FFFFFF" : "#000000",
        },
        type: 'scroll',
        orient: 'horizontal',
        bottom: 0,
      },
      xAxis: {
        type: "category",
        data: xAxisData,
        axisLabel: {
          color: theme === "dark" ? "#FFFFFF" : "#000000",
        },
        name: "Date",
      },
      yAxis: {
        type: "value",
        axisLabel: {
          color: theme === "dark" ? "#FFFFFF" : "#000000",
        },
        name: "Sales ($)",
      },
      grid: {
        left: '5%',
        bottom: '10%',
        containLabel: true
      },
      series: seriesData,
    };
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <ReactEcharts option={getOption()} style={{ height: '400px', width: '100%', margin: '20px' }}/>
    </div>
  );
};

export default BarChart;
