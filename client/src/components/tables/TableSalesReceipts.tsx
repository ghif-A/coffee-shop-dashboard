import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Table.module.css';
import { useTheme } from '../../contexts/ThemeContext';

interface SalesReceipt {
  transaction_id: number;
  transaction_date: string;
  transaction_time: string;
  sales_outlet_id: number;
  staff_id: number;
  customer_id: number | null;
  instore_yn: boolean;
  orders: number;
  line_item_id: number;
  product_id: number;
  quantity: number;
  line_item_amount: number;
  unit_price: number;
  promo_item_yn: boolean;
}

const SalesReceiptsTable: React.FC = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<SalesReceipt[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = new String(import.meta.env.VITE_API_ENDPOINT);
        const response = await axios.get(`${baseURL}/salesreceipts`);
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
              <th className={styles.stickyHeaderFirstCell}>Transaction ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Sales Outlet ID</th>
              <th>Staff ID</th>
              <th>Customer ID</th>
              <th>In-Store</th>
              <th>Orders</th>
              <th>Line Item ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Line Item Amount</th>
              <th>Unit Price</th>
              <th>Promo Item</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className={styles.stickyColumn}>{item.transaction_id}</td>
                <td>{item.transaction_date}</td>
                <td>{item.transaction_time}</td>
                <td>{item.sales_outlet_id}</td>
                <td>{item.staff_id}</td>
                <td>{item.customer_id}</td>
                <td>{item.instore_yn ? 'Yes' : 'No'}</td>
                <td>{item.orders}</td>
                <td>{item.line_item_id}</td>
                <td>{item.product_id}</td>
                <td>{item.quantity}</td>
                <td>{item.line_item_amount.toFixed(2)}</td>
                <td>{item.unit_price.toFixed(2)}</td>
                <td>{item.promo_item_yn ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReceiptsTable;
