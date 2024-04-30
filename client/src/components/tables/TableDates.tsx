import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Table.module.css";
import { useTheme } from "../../contexts/ThemeContext";

interface DateRecord {
  transaction_date: string;
  date_id: number; // Make sure the property names match the endpoint data
  week_id: number;
  week_desc: string;
  month_id: number;
  month_name: string;
  quarter_id: number;
  quarter_name: string;
  year_id: number;
}

const DatesTable: React.FC = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<DateRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = new String(import.meta.env.VITE_API_ENDPOINT);
        const response = await axios.get(`${baseURL}/dates`);
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
              <th className={styles.stickyHeaderFirstCell}>Transaction Date</th>
              <th>Date ID</th>
              <th>Week ID</th>
              <th>Week Description</th>
              <th>Month ID</th>
              <th>Month Name</th>
              <th>Quarter ID</th>
              <th>Quarter Name</th>
              <th>Year ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dateRecord, index) => (
              <tr key={index}>
                <td className={styles.stickyColumn}>{dateRecord.transaction_date}</td>
                <td>{dateRecord.date_id}</td>
                <td>{dateRecord.week_id}</td>
                <td>{dateRecord.week_desc}</td>
                <td>{dateRecord.month_id}</td>
                <td>{dateRecord.month_name}</td>
                <td>{dateRecord.quarter_id}</td>
                <td>{dateRecord.quarter_name}</td>
                <td>{dateRecord.year_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatesTable;
