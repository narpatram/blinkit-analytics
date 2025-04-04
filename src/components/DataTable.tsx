import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown, CurrencyRupee } from '@mui/icons-material';

interface Column {
  field: string;
  headerName: string;
  width: number;
  flex?: number;
}

interface DataTableProps {
  title: string;
  subtitle?: string;
  data: any[];
  columns: Column[];
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

const DataTable: React.FC<DataTableProps> = ({ title, subtitle, data, columns }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: 'asc' });

  const handleRowSelect = (rowIndex: number) => {
    setSelectedRows(prev => 
      prev.includes(rowIndex) 
        ? prev.filter(index => index !== rowIndex)
        : [...prev, rowIndex]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, index) => index));
    }
  };

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortConfig.direction === 'asc'
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const renderSortIcon = (key: string) => (
    <IconButton 
      size="small" 
      onClick={() => handleSort(key)}
      sx={{ 
        p: 0, 
        height: 16, 
        width: 16,
        ml: 0.5,
        color: sortConfig.key === key ? '#027056' : '#757575'
      }}
    >
      {sortConfig.key === key && sortConfig.direction === 'asc' ? (
        <KeyboardArrowUp fontSize="small" />
      ) : (
        <KeyboardArrowDown fontSize="small" />
      )}
    </IconButton>
  );

  const formatValue = (value: any, field: string) => {
    if (typeof value === 'number') {
      if (field.includes('price') || field.includes('sum')) {
        return `₹${value.toLocaleString()}`;
      }
      if (field.includes('percent') || field.includes('drr')) {
        return `${value}%`;
      }
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', mb: 1}}>
        <Typography  sx={{ fontWeight: 500, fontSize: '20px' }}>{title}</Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0, fontSize: '14px' }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box sx={{ 
        width: '100%',
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
        borderRadius: '8px'
      }}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ 
                  backgroundColor: '#f5f5f5',
                  borderBottom: '1px solid #e0e0e0',
                  position: 'sticky',
                  left: 0,
                  zIndex: 2,
                  width: '48px'
                }}>
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onChange={handleSelectAll}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: 16,
                      },
                      '& .MuiCheckbox-root': {
                        padding: 0,
                      },
                      '& .MuiCheckbox-root .MuiSvgIcon-root': {
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '2px',
                      },
                      '&.Mui-checked': {
                        color: '#027056',
                      },
                      '&.MuiCheckbox-indeterminate': {
                        color: '#027056',
                      }
                    }}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    sx={{ 
                      backgroundColor: '#f5f5f5',
                      borderBottom: '1px solid #e0e0e0',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#666',
                      py: 1,
                      minWidth: column.width || 120,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {column.field.includes('price') || column.field.includes('sum') ? (
                        <CurrencyRupee sx={{ fontSize: 14, mr: 0.5 }} />
                      ) : null}
                      {column.headerName}
                      {renderSortIcon(column.field)}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((row, index) => (
                <TableRow
                  key={index}
                  hover
                  selected={selectedRows.includes(index)}
                  onClick={() => handleRowSelect(index)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox" sx={{ 
                    position: 'sticky',
                    left: 0,
                    zIndex: 1,
                    backgroundColor: selectedRows.includes(index) ? '#e8f5e9' : 'white',
                    width: '48px'
                  }}>
                    <Checkbox checked={selectedRows.includes(index)} 
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 16,
                        },
                        '& .MuiCheckbox-root': {
                          padding: 0,
                        },
                        '& .MuiCheckbox-root .MuiSvgIcon-root': {
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          borderRadius: '2px',
                        },
                        '&.Mui-checked': {
                          color: '#027056',
                        },
                        '&.MuiCheckbox-indeterminate': {
                          color: '#027056',
                        }
                      }}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      sx={{ 
                        fontSize: '12px',
                        py: 1,
                        minWidth: column.width || 120,
                        whiteSpace: 'nowrap',
                        backgroundColor: selectedRows.includes(index) ? '#e8f5e9' : 'white'
                      }}
                    >
                      {formatValue(row[column.field], column.field)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DataTable; 