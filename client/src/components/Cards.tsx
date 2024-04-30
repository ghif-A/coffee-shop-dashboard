import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Card from './Card';
import { useTheme } from '../contexts/ThemeContext';
import { CSSProperties } from 'react';

const Cards: React.FC = () => {
  const [totalSales, setTotalSales] = useState('');
  const [salesVsTarget, setSalesVsTarget] = useState('');
  const [orderCount, setOrderCount] = useState('');
  const [spoilageLoss, setSpoilageLoss] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseURL = new String(import.meta.env.VITE_API_ENDPOINT);
        const responses = await Promise.all([
          Axios.get(`${baseURL}/sumtotalsales`),
          Axios.get(`${baseURL}/salestargetsdifference`),
          Axios.get(`${baseURL}/itemssold`),
          Axios.get(`${baseURL}/totalspoilageloss`),
        ]);
        setTotalSales(Math.round(responses[0].data[0].sum_total_sales / 1000).toString() + 'K');
        setSalesVsTarget(Math.round(responses[1].data[0].sales_targets_difference / 1000).toString() + 'K');
        setOrderCount(Math.round(responses[2].data[0].items_sold / 1000).toString() + 'K');
        setSpoilageLoss(Math.round(responses[3].data[0].total_spoilage_loss / 1000).toString() + 'K');

      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const cardContainerStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: theme === 'dark' ? '#151515' : '#ffffff',
  };

  return (
    <div style={cardContainerStyle}>
      <Card value={`+$${totalSales}`} description="Total Sales" />
      <Card value={`+$${salesVsTarget}`} description="Sales vs Target" />
      <Card value={`${orderCount}`} description="Items Sold" />
      <Card value={`-$${spoilageLoss}`} description="Spoilage Loss" />
    </div>
  );
};

export default Cards;
