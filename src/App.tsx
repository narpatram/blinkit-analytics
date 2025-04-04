import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import BrandSidebar from './components/BrandSidebar';
import MainContent from './components/MainContent';

function App() {
  const brands = ['Perfora', 'Mama Earth', 'Boat'];
  const [selectedBrand, setSelectedBrand] = useState('Perfora');

  const handleAddBrand = () => {
    console.log('Add brand clicked');
  };

  const handleBrandSelect = (brand: string) => {
    console.log('Selected brand:', brand);
    setSelectedBrand(brand);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <BrandSidebar 
        brands={brands} 
        onAddBrand={handleAddBrand}
        selectedBrand={selectedBrand}
        onBrandSelect={handleBrandSelect}
      />
      <MainContent selectedItem={selectedBrand} />
    </Box>
  );
}

export default App; 