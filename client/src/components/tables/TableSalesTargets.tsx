import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Table.module.css";
import { useTheme } from "../../contexts/ThemeContext";

interface SalesTarget {
  sales_outlet_id: number;
  year_month: string;
  beans_goal: number;
  beverage_goal: number;
  food_goal: number;
  merchandise_goal: number;
  total_goal: number;
}

const SalesTargetsTable: React.FC = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<SalesTarget[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = new String(import.meta.env.VITE_API_ENDPOINT);
        const response = await axios.get(`${baseURL}/salestargets`);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("The response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.tableContainer} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.tableWrapper}>
        <table className={`table table-striped ${styles.table}`}>
          <thead className={styles.stickyHeader}>
            <tr>
              <th className={styles.stickyHeaderFirstCell}>Outlet ID</th>
              <th>Year/Month</th>
              <th>Beans Goal</th>
              <th>Beverage Goal</th>
              <th>Food Goal</th>
              <th>Merchandise Goal</th>
              <th>Total Goal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((target) => (
              <tr key={target.sales_outlet_id}>
                <td className={styles.stickyColumn}>{target.sales_outlet_id}</td>
                <td>{target.year_month}</td>
                <td>{target.beans_goal}</td>
                <td>{target.beverage_goal}</td>
                <td>{target.food_goal}</td>
                <td>{target.merchandise_goal}</td>
                <td>{target.total_goal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTargetsTable;
