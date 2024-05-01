import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Card from './Card';
import { useTheme } from '../contexts/ThemeContext';
import { CSSProperties } from 'react';

const Cards: React.FC = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [salesVsTarget, setSalesVsTarget] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [spoilageLoss, setSpoilageLoss] = useState(0);  
  
  const { theme } = useTheme();

  const formatValue = (value: number) => {
    return value >= 0 ? `+$${value}K` : `-$${Math.abs(value)}K`;
  };

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
        setTotalSales(Math.round(responses[0].data[0].sum_total_sales / 1000));
        setSalesVsTarget(Math.round(responses[1].data[0].sales_targets_difference / 1000));
        setOrderCount(Math.round(responses[2].data[0].items_sold / 1000));
        setSpoilageLoss(Math.round(responses[3].data[0].total_spoilage_loss / 1000));

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
      <Card value={`+$${totalSales}K`} description="Total Sales" />
      <Card value={formatValue(salesVsTarget)} description="Sales vs Target" />
      <Card value={`${orderCount.toString()}K`} description="Items Sold" />
      <Card value={`-$${spoilageLoss}K`} description="Spoilage Loss" />
    </div>
  );
};

export default Cards;
