import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './Table.module.css';
import { useTheme } from "../contexts/ThemeContext";

interface Product {
  product_id: number;
  product_group: string;
  product_category: string;
  product_type: string;
  product: string;
  product_description: string;
  unit_of_measure: string;
  current_wholesale_price: number;
  current_retail_price: number;
  tax_exempt_yn: boolean;
  promo_yn: boolean;
  new_product_yn: boolean;
}

const Table: React.FC = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products");
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('The response is not an array:', response.data);
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
      <div className={`${styles.tableContainer} ${theme === 'light' ? '' : 'dark'}`}>
      <div className={styles.tableWrapper}>
        <table className={`table table-striped ${styles.table}`}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Group</th>
                <th>Category</th>
                <th>Type</th>
                <th>Product</th>
                <th>Description</th>
                <th>Unit of Measure</th>
                <th>Wholesale Price</th>
                <th>Retail Price</th>
                <th>Tax Exempt</th>
                <th>Promo</th>
                <th>New Product</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.product_id}>
                  <td>{item.product_id}</td>
                  <td>{item.product_group}</td>
                  <td>{item.product_category}</td>
                  <td>{item.product_type}</td>
                  <td>{item.product}</td>
                  <td>{item.product_description}</td>
                  <td>{item.unit_of_measure}</td>
                  <td>{item.current_wholesale_price.toFixed(2)}</td>
                  <td>{item.current_retail_price.toFixed(2)}</td>
                  <td>{item.tax_exempt_yn ? "Yes" : "No"}</td>
                  <td>{item.promo_yn ? "Yes" : "No"}</td>
                  <td>{item.new_product_yn ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default Table;
