import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { useTheme } from "../contexts/ThemeContext";
import axios from "axios";

interface DailySpoilageData {
  transaction_date: string;
  product: string;
  waste: number;
}

const generateColor = (index: number) => {
  const colors = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
  return colors[index % colors.length];
};

const LineChart: React.FC = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<DailySpoilageData[]>([]);

  useEffect(() => {
    const baseURL = new String(import.meta.env.VITE_API_ENDPOINT);
    axios.get(`${baseURL}/dailyspoilage`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data.map(item => ({
            ...item,
            waste: Number(item.waste)
          })));
        } else {
          console.error("Response data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const processDataForEcharts = (data: DailySpoilageData[]) => {
    const uniqueDates = Array.from(new Set(data.map(item => item.transaction_date))).sort();
    const uniqueProducts = Array.from(new Set(data.map(item => item.product)));
  
    type GroupedDataType = Record<string, number[]>;
  
    const groupedData: GroupedDataType = uniqueProducts.reduce((acc: GroupedDataType, product) => {
      acc[product] = uniqueDates.map(() => 0);
      return acc;
    }, {});
  
    data.forEach((item) => {
      const dateIndex = uniqueDates.indexOf(item.transaction_date);
      if (dateIndex !== -1) {
        groupedData[item.product][dateIndex] = item.waste;
      }
    });
  
    const series: any[] = uniqueProducts.map((product, index) => ({
      name: product,
      type: "line",
      data: groupedData[product],
      itemStyle: {
        color: generateColor(index),
      },
    }));
  
    return series;
  };  

  const getOption = () => {
    if (!data || data.length === 0) {
      return {};
    }

    return {
      title: {
        text: "Daily Spoilage by Product",
        textStyle: {
          color: theme === "dark" ? "#FFFFFF" : "#000000",
        },
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: data.map(item => item.product),
        textStyle: {
          color: theme === "dark" ? "#FFFFFF" : "#000000",
        },
        type: 'scroll',
        orient: 'horizontal',
        bottom: 0,
      },
      xAxis: {
        type: "category",
        data: data.map(item => item.transaction_date).filter((value, index, self) => self.indexOf(value) === index),
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
        name: "Spoilage (item)",
      },
      series: processDataForEcharts(data),
    };
  };

  return <ReactEcharts option={getOption()} style={{ height: '500px', margin: '30px'  }} />;
};

export default LineChart;
