import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { useTheme } from "../contexts/ThemeContext";
import axios from "axios";
import { TplFormatterParam } from "echarts/types/src/util/format.js";

interface ProductCategorySalesData {
  product_category: string;
  sales: number;
}

const TreeMap: React.FC = () => {
  const { theme } = useTheme();
  const [productCategorySalesData, setProductCategorySalesData] = useState<
    ProductCategorySalesData[]
  >([]);

  useEffect(() => {
    const baseURL = new String(import.meta.env.VITE_API_ENDPOINT);
    axios
      .get(`${baseURL}/productcategorysales`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProductCategorySalesData(response.data);
        } else {
          console.error("Error: Expected an array from the API", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching product category sales data:", error);
      });
  }, []);

  const getOption = () => {
    return {
      title: {
        text: "Total Sales by Product Category",
        left: "center",
        textStyle: {
          color: theme === "dark" ? "#FFFFFF" : "#000000",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}",
      },
      series: [
        {
          name: "Sales",
          type: "treemap",
          visibleMin: 300,
          label: {
            show: true,
            formatter: function (params: TplFormatterParam) {
              return `${params.name}: $${params.value}`;
            },
            color: theme === "dark" ? "#FFFFFF" : "#000000",
          },
          upperLabel: {
            show: true,
            height: 30,
            color: theme === "dark" ? "#FFFFFF" : "#000000", // Add this line
            backgroundColor:
              theme === "dark" ? "#333" : "rgba(255,255,255,0.7)", // Add this line
          },
          itemStyle: {
            borderColor: theme === "dark" ? "#555" : "#ccc",
          },
          levels: [
            {
              itemStyle: {
                borderWidth: 0,
                gapWidth: 5,
              },
            },
          ],
          data: productCategorySalesData.map((item) => ({
            name: item.product_category,
            value: item.sales,
          })),
          roam: false,
        },
      ],
      color:
        theme === "dark"
          ? ["#c23531", "#2f4554", "#61a0a8"]
          : ["#c4ccd3", "#61a0a8", "#d48265"],
    };
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <ReactEcharts option={getOption()} style={{ height: '400px', width: '100%', margin: '20px' }}/>
    </div>
  );
};

export default TreeMap;
