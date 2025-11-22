import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import { useTranslations } from 'next-intl';
import { CartItem } from '../../types';
import PriceDisplay from '../Shared/PriceDisplay';

interface OrderSummaryProps {
  cart: CartItem[];
  total: number;
}

const OrderSummary = ({ cart, total }: OrderSummaryProps) => {
  const t = useTranslations('cart');
  
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t('orderSummary')}
      </Typography>
      {cart.map((item) => (
        <Box key={item.id} display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2">
            {item.name} x{item.quantity}
          </Typography>
          <PriceDisplay 
            price={item.price} 
            quantity={item.quantity}
            variant="body2"
          />
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">{t('total')}</Typography>
        <PriceDisplay 
          price={total} 
          variant="h6" 
          color="primary"
        />
      </Box>
    </Paper>
  );
};

export default OrderSummary;

