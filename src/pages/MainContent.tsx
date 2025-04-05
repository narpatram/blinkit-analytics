import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  useTheme, 
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { ShowChart, HelpOutline } from '@mui/icons-material';
import ChartContainer from '../components/charts/ChartContainer';
import DataTable from '../components/DataTable';
import config from '../configs/config.json';
import { sampleData } from '../configs/sampleData';
import IOSSwitch from '../components/IOSSwitch';
import CustomDateRangePicker from '../components/CustomDateRangePicker';
import blinkitLogo from '../assets/blinkit.png';
import instamartLogo from '../assets/instamart.png';
import zeptoLogo from '../assets/Zepto.png';
import cubejsApi from '../services/cubejs/config';

interface MainContentProps {
  selectedItem: string;
}

const MainContent: React.FC<MainContentProps> = ({ selectedItem }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [viewMode, setViewMode] = useState('graph');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [activeTab, setActiveTab] = useState('blinkit');
  const [tableData, setTableData] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    const fetchData = async () => {
      const dataMap: { [key: string]: any[] } = {};

      for (const card of config.cards) {
        if (card.active ) {
          try {
            const query = JSON.parse(card.query);
            const resultSet = await Promise.all(query.map(query => cubejsApi.load(query)));
            const flattenedData = resultSet.flatMap(res => res.rawData());
            const transformedData = flattenedData.map(item => {
              return Object.fromEntries(
                Object.entries(item).map(([key, value]) => {
                  const newKey = key.includes('.') ? key.split('.').pop() : key;
                  return [newKey, value];
                })
              );
            });
            dataMap[card.id] = flattenedData
          } catch (error) {
            console.error(`Error fetching data for ${card.title}:`, error);
          }
        }
      }

      setTableData(dataMap);
    };

    fetchData();
  }, []);

  const handleViewModeChange = () => {
    setViewMode(viewMode === 'graph' ? 'table' : 'graph');
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderCharts = () => {
    const activeCards = config.cards
      .filter(card => card.active && (card.visualizationType === 'linechart' || card.visualizationType === 'semipie'))
      .sort((a, b) => a.gridstackProperties.x - b.gridstackProperties.x);

    return activeCards.map((card) => {
      const data = tableData[card.id];
      
      return (
        <ChartContainer
          key={card.id}
          title={card.title}
          data={data}
          type={card.visualizationType}
          showValueInfo={card.visualizationType === 'linechart'}
        />
      );
    });
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f5f5f5',
      overflow: 'hidden',
      width: "100%"
    }}>
      <Paper
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          boxShadow: 'none',
          overflow: 'hidden'
        }}
      >
        {/* Header Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: 2, 
          px: 2, 
          py: 1,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Typography variant="h6" component="h1" sx={{ fontWeight: 600, fontSize: '14px' }}>
            {selectedItem}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              onClick={handleViewModeChange}
              sx={{
                borderRadius: 2,
                py: 0.5,
                px:1,
                border: '1px solid #e0e0e0',
                minWidth: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <ShowChart sx={{ color: viewMode === 'graph' ? '#2e7d32' : 'inherit', fontSize: '24px', mr: 1 }} />
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                position: 'relative'
              }}>
                <Box sx={{ 
                  position: 'absolute',
                  top: '3px',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}>
                  <IOSSwitch 
                    checked={viewMode === 'graph'}
                    onChange={handleViewModeChange}
                    sx={{
                      '& .MuiSwitch-switchBase': {
                        padding: 0,
                        '&.Mui-checked': {
                          transform: 'translateX(12px)',
                          '& + .MuiSwitch-track': {
                            backgroundColor: '#2e7d32',
                            opacity: 1,
                          },
                        },
                      },
                      '& .MuiSwitch-thumb': {
                        width: 14,
                        height: 14,
                        boxShadow: 'none',
                      },
                      '& .MuiSwitch-track': {
                        height: 18,
                        width: 28,
                        borderRadius: 18,
                        opacity: 1,
                        backgroundColor: '#e0e0e0',
                        '&:before, &:after': {
                          display: 'none',
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Button>
            <CustomDateRangePicker
              value={dateRange}
              onChange={setDateRange}
            />
          </Stack>
        </Box>

        {/* Tabs Section */}
        <Box sx={{ borderBottom: '1px solid #e0e0e0', width: '100%', p: 1 }}>
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              p: 0.5,
              display: 'inline-flex',
              gap: 1,
            }}
          >
            <Button
              onClick={() => handleTabClick('blinkit')}
              sx={{
                borderRadius: 2,
                px: 1,
                py: 1,
                backgroundColor: activeTab === 'blinkit' ? '#DFEAE8' : 'transparent',
                '&:hover': {
                  backgroundColor: activeTab === 'blinkit' ? '#DFEAE8' : '#f5f5f5',
                },
                border: 'none',
                minWidth: '100px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <img
                src={blinkitLogo}
                alt="Blinkit"
                style={{ width: '16px', height: '16px', objectFit: 'contain' }}
              />
              <Typography
                sx={{
                  color: activeTab === 'blinkit' ? '#2e7d32' : 'inherit',
                  fontWeight: activeTab === 'blinkit' ? 600 : 400,
                  fontSize: '12px',
                  textTransform: 'none',
                }}
              >
                Blinkit
              </Typography>
            </Button>
            <Button
              onClick={() => handleTabClick('instamart')}
              sx={{
                borderRadius: 2,
                px: 1,
                py: 1,
                backgroundColor: activeTab === 'instamart' ? '#DFEAE8' : 'transparent',
                '&:hover': {
                  backgroundColor: activeTab === 'instamart' ? '#DFEAE8' : '#f5f5f5',
                },
                border: 'none',
                minWidth: '100px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <img
                src={instamartLogo}
                alt="Instamart"
                style={{ width: '16px', height: '16px', objectFit: 'contain' }}
              />
              <Typography
                sx={{
                  color: activeTab === 'instamart' ? '#2e7d32' : 'inherit',
                  fontWeight: activeTab === 'instamart' ? 600 : 400,
                  fontSize: '12px',
                  textTransform: 'none',
                }}
              >
                Instamart
              </Typography>
            </Button>
            <Button
              onClick={() => handleTabClick('zepto')}
              sx={{
                borderRadius: 2,
                px: 1,
                py: 1,
                backgroundColor: activeTab === 'zepto' ? '#DFEAE8' : 'transparent',
                '&:hover': {
                  backgroundColor: activeTab === 'zepto' ? '#DFEAE8' : '#f5f5f5',
                },
                border: 'none',
                minWidth: '100px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <img
                src={zeptoLogo}
                alt="Zepto"
                style={{ width: '16px', height: '16px', objectFit: 'contain' }}
              />
              <Typography
                sx={{
                  color: activeTab === 'zepto' ? '#2e7d32' : 'inherit',
                  fontWeight: activeTab === 'zepto' ? 600 : 400,
                  fontSize: '12px',
                  textTransform: 'none',
                }}
              >
                Zepto
              </Typography>
            </Button>
          </Box>
        </Box>

        {/* Content Section */}
        <Box sx={{ 
          flex: 1,
          overflow: 'auto',
          backgroundColor: "#FAFAFA",
          p: 2
        }}>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            mb: 1
          }}>
            {renderCharts()}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {config.cards
              .filter(card => card.active && card.visualizationType === 'table' && card.datatableProperties)
              .sort((a, b) => a.gridstackProperties.x - b.gridstackProperties.x)
              .map(card => {
                const data = tableData[card.id];
                if (!data) return null;

                const columns = card.datatableProperties.columnOrder
                  .filter(field => card.datatableProperties.columnsVisible[field])
                  .map(field => ({
                    field,
                    headerName: field,
                    width: 100,
                    flex: 1
                  }));

                return (
                  <DataTable
                    key={card.id}
                    title={card.title}
                    subtitle={card.subtitle}
                    data={data}
                    columns={columns}
                  />
                );
              })}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default MainContent; 