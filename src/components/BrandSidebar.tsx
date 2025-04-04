import React from 'react';
import { Box, IconButton, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import perforaLogo from '../assets/perfora-logo.png';
import mamaEarthLogo from '../assets/mama-earth-logo.png';
import boatLogo from '../assets/boat-logo.png';

interface BrandSidebarProps {
  brands: string[];
  onAddBrand: () => void;
  selectedBrand: string;
  onBrandSelect: (brand: string) => void;
}

const getBrandLogo = (brand: string) => {
  switch (brand) {
    case 'Perfora':
      return perforaLogo;
    case 'Mama Earth':
      return mamaEarthLogo;
    case 'Boat':
      return boatLogo;
    default:
      return null;
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

const BrandSidebar = ({ brands, onAddBrand, selectedBrand, onBrandSelect }: BrandSidebarProps) => {
  const handleBrandClick = (brand: string) => {
    if (typeof onBrandSelect === 'function') {
      onBrandSelect(brand);
    }
  };

  return (
    <Box
      sx={{
        width: '60px',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
      }}
    >
      {brands.map((brand, index) => (
        <Box
          key={index}
          onClick={() => handleBrandClick(brand)}
          sx={{ 
            width: '40px',
            height: '40px',
            marginBottom: '20px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: selectedBrand === brand ? '2px solid #139C53' : '0.5px solid #00000014',
            cursor: 'pointer',
           
          }}
        >
          <img
            src={getBrandLogo(brand) || ''}
            alt={brand}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '8px',
            }}
          />
        </Box>
      ))}
      <Box
        sx={{
          width: '40px',
          height: '40px',
          marginBottom: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: '0.5px solid #00000014',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
        onClick={onAddBrand}
      >
        <AddIcon sx={{ color: '#1D874F' }} />
      </Box>
      <Box
        sx={{
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Avatar
          sx={{
            width: '28px',
            height: '28px',
            bgcolor: '#2e7d32',
            fontSize: '0.75rem',
            fontWeight: 500,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#1b5e20',
            },
          }}
        >
          {getInitials('John Doe')}
        </Avatar>
        <Box
          sx={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          <GroupIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default BrandSidebar; 