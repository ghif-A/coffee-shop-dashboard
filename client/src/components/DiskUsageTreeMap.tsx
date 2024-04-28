import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useTheme } from '../contexts/ThemeContext'; // Ensure this path is correct

const DiskUsageTreeMap: React.FC = () => {
  const { theme } = useTheme();

  const getOption = () => {
    return {
      title: {
        text: 'TreeMap',
        left: 'center',
        textStyle: {
          color: theme === 'dark' ? '#FFFFFF' : '#000000',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}'
      },
      series: [
        {
          name: 'Disk Usage',
          type: 'treemap',
          visibleMin: 300,
          label: {
            show: true,
            formatter: '{b}',
            color: theme === 'dark' ? '#FFFFFF' : '#000000',
          },
          upperLabel: {
            show: true,
            height: 30
          },
          itemStyle: {
            borderColor: theme === 'dark' ? '#555' : '#ccc'
          },
          levels: [
            {
              itemStyle: {
                borderWidth: 0,
                gapWidth: 5
              }
            }
          ],
          data: [
            {
              name: 'Used Space',
              value: 60,
              children: [
                { name: 'Videos', value: 30 },
                { name: 'Pictures', value: 20 },
                { name: 'Documents', value: 10 }
              ]
            },
            {
              name: 'Free Space',
              value: 20
            },
            {
              name: 'System Reserved',
              value: 20
            }
          ]
        }
      ],
      color: theme === 'dark' ? ['#c23531', '#2f4554', '#61a0a8'] : ['#c4ccd3', '#61a0a8', '#d48265'],
    };
  };

  return <ReactEcharts option={getOption()} style={{ height: '350px', width: '100%', margin: '30px'  }} />;
};

export default DiskUsageTreeMap;
