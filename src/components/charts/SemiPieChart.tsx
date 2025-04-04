import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface SemiPieChartProps {
  data: Array<{ name: string; value: number }>;
  colors: string[];
  title: string;
}

const SemiPieChart: React.FC<SemiPieChartProps> = ({ data, colors, title }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
      <Box sx={{ width: '100%', height: 200, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ height: 200, position: 'relative', display: 'flex', alignItems: 'flex-start', top: 10 }}>
          <ResponsiveContainer>
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="100%"
                innerRadius={70}
                outerRadius={90}
                startAngle={180}
                endAngle={0}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
          <Box sx={{ 
            position: 'absolute', 
            left: '50%', 
            bottom: '0%', 
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0
          }}>
            <Typography variant="subtitle2" sx={{ fontSize: '12px', color: '#757575' }}>
              Total
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              ₹68.2L
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrendingUp sx={{ fontSize: 12, color: '#2e7d32' }} />
              <Typography sx={{ fontSize: '10px', color: '#2e7d32', fontWeight: 500 }}>
                2.2%
              </Typography>
            </Box>
          </Box>
        </Box>
  
        {/* Table-like Legend */}
        <Box sx={{ height: 300, overflow: 'auto', px: 2, mb: -3, mt: 3 }}>
  
          {/* Data Rows */}
          {data.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            const growth = Math.random() * 10 - 5; // Random growth between -5% and +5%
            const isPositive = growth > 0;
            
            return (
              <Box key={index} sx={{ 
                display: 'flex', 
                mb: 1,
                '& > div': { 
                  flex: 1,
                  textAlign: 'left',
                  '&:first-of-type': { flex: 1.5 }
                },
                gap: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    backgroundColor: colors[index % colors.length] 
                  }} />
                  <Typography sx={{ fontSize: '10px' }}>{item.name}</Typography>
                </Box>
                <Typography sx={{ fontSize: '10px' }}>{item.value.toLocaleString()}</Typography>
                <Typography sx={{ fontSize: '10px' }}>{percentage}%</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {isPositive ? (
                    <TrendingUp sx={{ fontSize: 10, color: '#2e7d32' }} />
                  ) : (
                    <TrendingDown sx={{ fontSize: 10, color: '#d32f2f' }} />
                  )}
                  <Typography sx={{ 
                    fontSize: '10px', 
                    color: isPositive ? '#2e7d32' : '#d32f2f',
                    fontWeight: 500 
                  }}>
                    {Math.abs(growth).toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

export default SemiPieChart; 