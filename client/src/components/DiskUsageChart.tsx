import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { useTheme } from '../contexts/ThemeContext';

const DiskUsageChart: React.FC = () => {
  const { theme } = useTheme();
  const [diskData] = useState([
    { value: 335, name: 'Used Space' },
    { value: 679, name: 'Free Space' },
    { value: 1548, name: 'System Reserved' },
  ]);

  const getOption = () => {
    return {
      title: {
        text: 'Pie Chart',
        subtext: 'Sample Disk Data',
        left: 'center',
        textStyle: {
          color: theme === 'dark' ? '#FFFFFF' : '#000000',
        },
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: theme === 'dark' ? '#FFFFFF' : '#000000',
        },
      },
      series: [
        {
          name: 'Disk Usage',
          type: 'pie',
          radius: '55%',
          data: diskData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          label: {
            color: theme === 'dark' ? '#FFFFFF' : '#000000',
          },
        },
      ],
      color: theme === 'dark' ? ['#c23531', '#2f4554', '#61a0a8'] : ['#c4ccd3', '#61a0a8', '#d48265'],
    };
  };

  return <ReactEcharts option={getOption()} style={{ height: '350px', width: '100%', margin: '30px'  }} />;
};

export default DiskUsageChart;
