import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Table.module.css';
import { useTheme } from '../../contexts/ThemeContext';

interface SalesOutlet {
  sales_outlet_id: number;
  sales_outlet_type: string;
  store_square_feet: number;
  store_address: string;
  store_city: string;
  store_state_province: string;
  store_telephone: string;
  store_postal_code: string;
  store_longitude: number;
  store_latitude: number;
  manager: number;
  neighborhood: string;
}

const Table: React.FC = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<SalesOutlet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = new String(import.meta.env.VITE_API_ENDPOINT);
        const response = await axios.get(`${baseURL}/salesoutlets`);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('The response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
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
              <th className={styles.stickyHeaderFirstCell}>ID</th>
              <th>Type</th>
              <th>Square Feet</th>
              <th>Address</th>
              <th>City</th>
              <th>State/Province</th>
              <th>Telephone</th>
              <th>Postal Code</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th>Manager</th>
              <th>neighborhood</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.sales_outlet_id}>
                <td className={styles.stickyColumn}>{item.sales_outlet_id}</td>
                <td>{item.sales_outlet_type}</td>
                <td>{item.store_square_feet}</td>
                <td>{item.store_address}</td>
                <td>{item.store_city}</td>
                <td>{item.store_state_province}</td>
                <td>{item.store_telephone}</td>
                <td>{item.store_postal_code}</td>
                <td>{item.store_longitude.toFixed(2)}</td>
                <td>{item.store_latitude.toFixed(2)}</td>
                <td>{item.manager}</td>
                <td>{item.neighborhood}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
