import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { Box, Skeleton, Typography } from '@mui/material';
import { TrendingUp, TrendingDown, CurrencyRupee } from '@mui/icons-material';
import { formatToIndianNumbering } from '../../utils/helper';

interface SemiPieChartProps {
  data: Array<{ name: string; sales_mrp_sum: number }>;
  colors: string[];
  title: string;
}

const SemiPieChart: React.FC<SemiPieChartProps> = ({ data, title }) => {
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
    const total = data?.reduce((sum, item) => sum + Number(item.sales_mrp_sum), 0);
    return (
      <Box sx={{ width: '100%', height: 200, display: 'flex', flexDirection: 'column' }}>
        {
          data?.length > 0 ? (<><Box sx={{ height: 200, position: 'relative', display: 'flex', alignItems: 'flex-start', top: 0 }}>
            <ResponsiveContainer>
              <RechartsPieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="100%"
                  innerRadius={60}
                  outerRadius={75}
                  startAngle={180}
                  endAngle={0}
                  fill="#8884d8"
                  paddingAngle={0}
                  dataKey="sales_mrp_sum"
                >
                  {data?.map((entry, index) => (
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
              <Typography sx={{ fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CurrencyRupee sx={{ fontSize: 14, mr: 0 }} />
                {formatToIndianNumbering(total, 2, true)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUp sx={{ fontSize: 12, color: '#2e7d32' }} />
                <Typography sx={{ fontSize: '10px', color: '#2e7d32', fontWeight: 500 }}>
                  2.2%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ height: 300, overflow: 'auto', px: 2, mb: -3, mt: 3 }}>
            {data?.map((item, index) => {
              const percentage = ((Number(item.sales_mrp_sum) / total) * 100).toFixed(1);
              const growth = Math.random() * 10 - 5;
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
                  <Typography sx={{ fontSize: '10px', fontWeight: 700 }}>{formatToIndianNumbering(item.sales_mrp_sum)}</Typography>
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
          </Box></>) : <Skeleton variant="rectangular" width="100%" height="100%" />
        }
        
      </Box>
    );
  };

export default SemiPieChart; 