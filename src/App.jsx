import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import Navigation from './components/Navigation';
import BrandSidebar from './components/BrandSidebar';
import MainContent from './components/MainContent';
import '@fontsource/mulish/300.css';
import '@fontsource/mulish/400.css';
import '@fontsource/mulish/500.css';
import '@fontsource/mulish/600.css';
import '@fontsource/mulish/700.css';

const theme = createTheme({
  palette: {
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: 'Mulish, sans-serif',
  },
});

function App() {
  const brands = ['Perfora', 'Mama Earth', 'Boat'];
  const [selectedBrand, setSelectedBrand] = useState('Perfora');
  const [selectedNavItem, setSelectedNavItem] = useState('Overview');

  const handleAddBrand = () => {
    console.log('Add brand clicked');
  };

  const handleBrandSelect = (brand) => {
    console.log('Selected brand:', brand);
    setSelectedBrand(brand);
  };

  const handleNavSelect = (item) => {
    console.log('Selected nav item:', item);
    setSelectedNavItem(item);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <BrandSidebar
            brands={brands} 
            onAddBrand={handleAddBrand}
            selectedBrand={selectedBrand}
            onBrandSelect={handleBrandSelect}
          />
          <Navigation onItemSelect={handleNavSelect} />
          <MainContent selectedItem={selectedNavItem} />
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 