import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { CSSProperties } from 'react';

type CardProps = {
  value: string;
  description: string;
};

const Card: React.FC<CardProps> = ({ value, description }) => {
  const { theme } = useTheme();

  const cardStyle: CSSProperties = {
    backgroundColor: theme === 'dark' ? 'grey' : '#e2e2e2',
    padding: '20px',
    margin: '10px',
    borderRadius: '5px',
    boxShadow: theme === 'dark' ? '0 4px 8px rgba(255, 255, 255, 0.1)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
    flexBasis: 'calc(50% - 20px)',
    maxWidth: '250px',
    boxSizing: 'border-box',
  };

  const valueStyle: CSSProperties = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: theme === 'dark' ? '#FFFFFF' : '#1F2933',
  };

  const descriptionStyle: CSSProperties = {
    fontSize: '1em',
    margin: '0',
    color: theme === 'dark' ? '#FFFFFF' : '#1F2933',
  };

  return (
    <div style={cardStyle}>
      <div style={valueStyle}>{value}</div>
      <div style={descriptionStyle}>{description}</div>
    </div>
  );
};

export default Card;
