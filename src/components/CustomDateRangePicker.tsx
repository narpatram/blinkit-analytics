import React, { useState } from 'react';
import { Box, TextField, InputAdornment, Popover } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { format } from 'date-fns';

interface CustomDateRangePickerProps {
  value: [Date | null, Date | null];
  onChange: (newValue: [Date | null, Date | null]) => void;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const formatDateRange = () => {
    if (!value[0] || !value[1]) return 'Select Date Range';
    return `${format(value[0], 'MMM dd, yyyy')} - ${format(value[1], 'MMM dd, yyyy')}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <TextField
          onClick={handleClick}
          value={formatDateRange()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonth sx={{ color: '#757575', marginRight: '0px' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 160,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              cursor: 'pointer',
              '&:hover': {
                borderColor: '#bdbdbd',
              },
            },
            '& .MuiInputBase-input': {
              cursor: 'pointer',
              fontSize: '0.625rem',
              padding: '8px 0px',
            },
          }}
          inputProps={{ readOnly: true }}
        />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 1 }}>
            <DateRangePicker
              value={value}
              onChange={onChange}
              onClose={handleClose}
              slotProps={{
                actionBar: {
                  actions: ['clear', 'accept'],
                },
              }}
            />
          </Box>
        </Popover>
      </Box>
    </LocalizationProvider>
  );
};

export default CustomDateRangePicker; 