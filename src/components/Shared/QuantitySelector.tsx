import React from 'react';
import { Stack, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
}

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max,
  size = 'small'
}: QuantitySelectorProps) => {
  const canDecrease = quantity > min;
  const canIncrease = max ? quantity < max : true;

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton
        size={size}
        onClick={onDecrease}
        disabled={!canDecrease}
        aria-label="Decrease quantity"
      >
        <RemoveIcon />
      </IconButton>
      <Typography 
        variant="body1" 
        sx={{ 
          minWidth: 30, 
          textAlign: 'center',
          fontWeight: 600
        }}
      >
        {quantity}
      </Typography>
      <IconButton
        size={size}
        onClick={onIncrease}
        disabled={!canIncrease}
        aria-label="Increase quantity"
      >
        <AddIcon />
      </IconButton>
    </Stack>
  );
};

export default QuantitySelector;


