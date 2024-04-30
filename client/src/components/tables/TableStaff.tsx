import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Table.module.css";
import { useTheme } from "../../contexts/ThemeContext";

interface Staff {
  staff_id: number;
  first_name: string;
  last_name: string;
  position: string;
  start_date: string;
  location: string;
}

const StaffTable: React.FC = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = new String(import.meta.env.VITE_API_ENDPOINT);
        const response = await axios.get(`${baseURL}/staff`);
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
              <th className={styles.stickyHeaderFirstCell}>Staff ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Start Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {data.map((staffMember) => (
              <tr key={staffMember.staff_id}>
                <td className={styles.stickyColumn}>{staffMember.staff_id}</td>
                <td>{staffMember.first_name}</td>
                <td>{staffMember.last_name}</td>
                <td>{staffMember.position}</td>
                <td>{staffMember.start_date}</td>
                <td>{staffMember.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffTable;
