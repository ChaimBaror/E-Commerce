import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useTranslations } from 'next-intl';
import ActionButton from '../Shared/ActionButton';
import PriceDisplay from '../Shared/PriceDisplay';

interface CartFooterProps {
  total: number;
  onCheckout: () => void;
}

const CartFooter = ({ total, onCheckout }: CartFooterProps) => {
  const t = useTranslations('cart');
  
  return (
    <Box
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        p: 2,
        mt: 'auto'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {t('total')}:
        </Typography>
        <PriceDisplay 
          price={total} 
          variant="h6" 
          color="primary" 
          sx={{ fontWeight: 700 }}
        />
      </Box>
      <Divider sx={{ mb: 2 }} />
      <ActionButton
        variant="contained"
        fullWidth
        size="large"
        onClick={onCheckout}
      >
        {t('checkout')}
      </ActionButton>
    </Box>
  );
};

export default CartFooter;

