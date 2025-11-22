import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface PriceDisplayProps extends Omit<TypographyProps, 'children'> {
  price: number;
  quantity?: number;
  showCurrency?: boolean;
  variant?: 'body1' | 'body2' | 'h6' | 'h5' | 'h4';
}

const PriceDisplay = ({
  price,
  quantity = 1,
  showCurrency = true,
  variant = 'body1',
  ...typographyProps
}: PriceDisplayProps) => {
  const totalPrice = price * quantity;
  const formattedPrice = totalPrice.toFixed(2);

  return (
    <Typography variant={variant} {...typographyProps}>
      {showCurrency && '₪'}
      {formattedPrice}
    </Typography>
  );
};

export default PriceDisplay;


