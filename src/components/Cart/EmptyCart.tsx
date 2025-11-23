import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EmptyState from '../Shared/EmptyState';

interface EmptyCartProps {
  onClose: () => void;
}

const EmptyCart = ({ onClose }: EmptyCartProps) => {
  const theme = useTheme();
  const t = useTranslations('cart');

  return (
    <EmptyState
      icon={<ShoppingCartIcon sx={{ fontSize: 50, color: theme.palette.grey[400] }} />}
      title={t('emptyCart')}
      description={t('addProducts')}
      actionLabel={t('continueShopping')}
      onAction={onClose}
    />
  );
};

export default EmptyCart;

