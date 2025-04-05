import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Paper,
  Select,
  FormControl,
} from '@mui/material';
import {
  HomeOutlined,
  SegmentRounded,
  PermMediaRounded,
  ExpandLess,
  ExpandMore,
  ChevronRight,
  ChevronLeft,
  Help,
  Settings,
  KeyboardArrowUp,
  KeyboardArrowDown,
  ArrowBackIos,
} from '@mui/icons-material';
import vectorIcon from '../assets/Vector.png';

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  submenu?: string[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Overview',
    icon: <HomeOutlined />,
  },
  {
    title: 'Channels',
    icon: <SegmentRounded />,
    submenu: ['Meta Ads', 'Google Ads', 'Quick Commerce',],
  },
  {
    title: 'Creatives',
    icon: <PermMediaRounded />,
    submenu: ['Videos', 'Images', 'Text'],
  },
];

interface NavigationProps {
  onItemSelect: (item: string) => void;
}

const Navigation = ({ onItemSelect }: NavigationProps) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Analytics');
  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleClick = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleItemClick = (title: string) => {
    setSelectedItem(title);
    onItemSelect(title);
  };

  const handleSubItemClick = (subItem: string) => {
    setSelectedItem(subItem);
    onItemSelect(subItem);
  };

  return (
    <Box
      sx={{
        width: isCollapsed ? '60px' : '240px',
        height: '100vh',
        backgroundColor: '#fff',
        borderRight: '1px solid #e0e0e0',
        padding: '20px 8px',
        transition: 'width 0.3s ease',
        position: 'relative',
      }}
    >
      <Box
        onClick={toggleCollapse}
        sx={{
          position: 'absolute',
          right: -2,
          padding: '4px',
          borderRadius: "25%",
          top: 30,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
          zIndex: 1,
        }}
      >
        <ArrowBackIos
          sx={{
            color:"#027056",
            fontSize: '12px',
            transition: 'transform 0.3s ease',
            margin: 0,
            lineHeight: 1,
            position: 'absolute',
            left: '40%',
            transform: isCollapsed ? 'translateX(-50%) rotate(180deg)' : 'translateX(-50%)',
          }}
        />
        <ArrowBackIos
          sx={{
            color:"#027056",
            fontSize: '12px',
            transition: 'transform 0.3s ease',
            margin: 0,
            lineHeight: 1,
            position: 'absolute',
            left: '60%',
            transform: isCollapsed ? 'translateX(-50%) rotate(180deg)' : 'translateX(-50%)',
          }}
        />
      </Box>

      <List sx={{ py: 0 }}>
        {!isCollapsed && (
          <ListItem
            component="div"
            sx={{
              mb: 1,
              position: 'relative',
              py: 0.5,
            }}
          >
            <FormControl sx={{ width: '90%', mx: 'auto' }}>
              <Select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                IconComponent={() => (
                  <Box sx={{ position: 'relative', mr: 3 }}>
                    <KeyboardArrowUp sx={{ fontSize: '16px', position: 'absolute', top: -12 }} />
                    <KeyboardArrowDown sx={{ fontSize: '16px', position: 'absolute', top: -3 }} />
                  </Box>
                )}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0',
                    borderWidth: '1px',
                    borderRadius: '10px',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#bdbdbd',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2',
                  },
                  '& .MuiSelect-select': {
                    padding: '8px 0px 8px 8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  },
                }}
              >
                <MenuItem value="Analytics" sx={{ fontSize: '0.75rem' }}>Test_brand</MenuItem>
                <MenuItem value="Reports" sx={{ fontSize: '0.75rem' }}>Reports</MenuItem>
                <MenuItem value="Insights" sx={{ fontSize: '0.75rem' }}>Insights</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        )}
        {menuItems.map((item) => (
          <React.Fragment key={item.title}>
            <ListItem
              component="div"
              onClick={() => {
                handleClick(item.title);
                handleItemClick(item.title);
              }}
              sx={{
                cursor: 'pointer',
                py: 0.5,
                my: 0.5,
                borderRadius: '8px',
                mx: 0,
                px: isCollapsed ? 0 : 1,
                width: isCollapsed ? '100%' : 'calc(100% - 16px)',
                backgroundColor: selectedItem === item.title ? '#DFEAE8' : 'transparent',
                '&:hover': {
                  backgroundColor: selectedItem === item.title ? '#DFEAE8' : '#f5f5f5',
                },
                display: 'flex',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: isCollapsed ? '100%' : '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                m: 0,
                p: 0
              }}>
                {React.cloneElement(item.icon as React.ReactElement, {
                  sx: { 
                    fontSize: '18px',
                    color: selectedItem === item.title ? '#027056' : 'inherit'
                  }
                })}
              </ListItemIcon>
              {!isCollapsed && (
                <>
                  <ListItemText 
                    primary={item.title} 
                    primaryTypographyProps={{ 
                      style: { 
                        fontSize: '13px',
                        color: selectedItem === item.title ? '#027056' : 'inherit'
                      }
                    }}
                  />
                  {item.submenu && (
                    <IconButton size="small" sx={{ padding: '4px' }}>
                      {expandedItems[item.title] ? 
                        <ExpandLess sx={{ fontSize: '18px' }} /> : 
                        <ExpandMore sx={{ fontSize: '18px' }} />
                      }
                    </IconButton>
                  )}
                </>
              )}
            </ListItem>
            {!isCollapsed && item.submenu && (
              <Collapse in={expandedItems[item.title]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.submenu.map((subItem) => (
                    <ListItem
                      key={subItem}
                      component="div"
                      onClick={() => handleSubItemClick(subItem)}
                      sx={{
                        pl: 4,
                        py: 0.5,
                        my: 0.5,
                        cursor: 'pointer',
                        borderRadius: '8px',
                        mx: 0,
                        px: 1,
                        width: 'calc(100% - 16px)',
                        backgroundColor: selectedItem === subItem ? '#DFEAE8' : 'transparent',
                        '&:hover': {
                          backgroundColor: selectedItem === subItem ? '#DFEAE8' : '#f5f5f5',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: '40px' }}>
                        <ChevronRight sx={{ 
                          fontSize: '16px',
                          color: selectedItem === subItem ? '#027056' : 'inherit'
                        }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={subItem} 
                        primaryTypographyProps={{ 
                          style: { 
                            fontSize: '12px',
                            color: selectedItem === subItem ? '#027056' : 'inherit'
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      {!isCollapsed && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            px: 2,
          }}
        >
          <ListItem
            component="div"
            sx={{
              cursor: 'pointer',
              py: 0.5,
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: '40px', padding: '4px' }}>
              <Help sx={{ fontSize: '18px' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Help" 
              primaryTypographyProps={{ 
                style: { fontSize: '13px' }
              }}
            />
          </ListItem>
          <ListItem
            component="div"
            sx={{
              cursor: 'pointer',
              py: 0.5,
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <Settings sx={{ fontSize: '18px' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Settings" 
              primaryTypographyProps={{ 
                style: { fontSize: '13px' }
              }}
            />
          </ListItem>
        </Box>
      )}
    </Box>
  );
};

export default Navigation; 