import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Table.module.css";
import { useTheme } from "../../contexts/ThemeContext";

interface PastryInventory {
  sales_outlet_id: number;
  transaction_date: string;
  product_id: number;
  start_of_day: number;
  quantity_sold: number;
  waste: number;
  percent_waste: number;
}

const PastryInventoryTable: React.FC = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<PastryInventory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = new String(import.meta.env.VITE_API_ENDPOINT);
        const response = await axios.get(`${baseURL}/pastryinventory`);
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
              <th>Date</th>
              <th>Product ID</th>
              <th>Start of Day</th>
              <th>Quantity Sold</th>
              <th>Waste</th>
              <th>Percent Waste</th>
            </tr>
          </thead>
          <tbody>
            {data.map((inventory) => (
              <tr key={`${inventory.sales_outlet_id}_${inventory.transaction_date}_${inventory.product_id}`}>
                <td className={styles.stickyColumn}>{inventory.sales_outlet_id}</td>
                <td>{inventory.transaction_date}</td>
                <td>{inventory.product_id}</td>
                <td>{inventory.start_of_day}</td>
                <td>{inventory.quantity_sold}</td>
                <td>{inventory.waste}</td>
                <td>{(inventory.percent_waste * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastryInventoryTable;
