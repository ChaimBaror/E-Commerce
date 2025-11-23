import React from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import { useTranslations } from 'next-intl';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

interface CartHeaderProps {
  itemCount: number;
  onClose: () => void;
}

const CartHeader = ({ itemCount, onClose }: CartHeaderProps) => {
  const t = useTranslations('cart');
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ShoppingBagIcon />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {t('shoppingCart')}
        </Typography>
        <Chip label={itemCount} size="small" color="primary" />
      </Box>
      <IconButton onClick={onClose} size="small">
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default CartHeader;

