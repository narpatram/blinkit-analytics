import React, { useState } from 'react';
import { Box } from '@mui/material';
import BrandSidebar from './BrandSidebar';
import Navigation from './Navigation';
import MainContent from './MainContent';

const Layout = () => {
  const [brands, setBrands] = useState<string[]>(['Perfora', 'Mama Earth', 'Boat']);
  const [selectedItem, setSelectedItem] = useState('Overview');

  const handleAddBrand = () => {
    setBrands([...brands, `Brand${brands.length + 1}`]);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <BrandSidebar brands={brands} onAddBrand={handleAddBrand} />
      <Navigation onItemSelect={setSelectedItem} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#fafafa',
          minHeight: '100vh',
          width: "100%"
        }}
      >
        <MainContent selectedItem={selectedItem} />
      </Box>
    </Box>
  );
};

export default Layout; 