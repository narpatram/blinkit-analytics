import React from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { HelpOutline, TrendingUp } from '@mui/icons-material';
import AreaChart from './AreaChart';
import SemiPieChart from './SemiPieChart';

interface ChartContainerProps {
  title: string;
  data: any;
  type: string;
  showValueInfo?: boolean;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, data, type, showValueInfo = false }) => {
  const renderChart = () => {
    switch (type) {
      case 'linechart':
        return (
          <AreaChart
            data={data.timeSeries}
            value1Key="this_month"
            value2Key="last_month"
            color1="#2EB76F"
            color2="#DB3500CC"
            title={title}
          />
        );
      case 'semipie':
        return (
          <SemiPieChart
            data={data.data}
            colors={data.colors}
            title={title}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ 
      flex: 1, 
      minWidth: 0, 
      p: 0.5,
      boxShadow: 'none',
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      maxWidth: "300px",
      maxHeight: "300px"
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 1,
        px: 2,
        pt: 1
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
          <Typography variant="subtitle1" sx={{ fontSize: '14px', fontWeight: 500 }}>
            {title}
          </Typography>
          <IconButton size="small" sx={{ p: 0.5 }}>
            <HelpOutline sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ borderBottom: '1px solid #e0e0e0', mb: 1 }} />
      {showValueInfo && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 1,
          px: 2,
        }}>
          <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
            }).format(data.total)}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrendingUp sx={{ fontSize: 16, color: '#2e7d32' }} />
              <Typography sx={{ fontSize: '12px', color: '#2e7d32', fontWeight: 500 }}>
                +12.34%
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '10px', color: '#757575' }}>
              vs 119.69 last month
            </Typography>
          </Box>
        </Box>
      )}
      {renderChart()}
    </Paper>
  );
};

export default ChartContainer; 