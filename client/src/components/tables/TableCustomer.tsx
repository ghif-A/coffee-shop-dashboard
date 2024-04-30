import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Table.module.css";
import { useTheme } from "../../contexts/ThemeContext";

interface Customer {
  customer_id: number;
  home_store: number;
  customer_first_name: string;
  customer_email: string;
  customer_since: string;
  loyalty_card_number: string;
  birthdate: string;
  gender: string;
  birth_year: number;
}

const CustomerTable: React.FC = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = new String(import.meta.env.VITE_API_ENDPOINT);
        const response = await axios.get(`${baseURL}/customers`);
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
              <th className={styles.stickyHeaderFirstCell}>Customer ID</th>
              <th>Home Store</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Customer Since</th>
              <th>Loyalty Card Number</th>
              <th>Birthdate</th>
              <th>Gender</th>
              <th>Birth Year</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer) => (
              <tr key={customer.customer_id}>
                <td className={styles.stickyColumn}>{customer.customer_id}</td>
                <td>{customer.home_store}</td>
                <td>{customer.customer_first_name}</td>
                <td>{customer.customer_email}</td>
                <td>{customer.customer_since}</td>
                <td>{customer.loyalty_card_number}</td>
                <td>{customer.birthdate}</td>
                <td>{customer.gender}</td>
                <td>{customer.birth_year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
