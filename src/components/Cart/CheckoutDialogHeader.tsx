import React from 'react';
import { useTranslations } from 'next-intl';
import DialogHeader from '../Shared/DialogHeader';

interface CheckoutDialogHeaderProps {
  onClose: () => void;
}

const CheckoutDialogHeader = ({ onClose }: CheckoutDialogHeaderProps) => {
  const t = useTranslations('cart');
  
  return (
    <DialogHeader
      title={t('orderDetails')}
      onClose={onClose}
    />
  );
};

export default CheckoutDialogHeader;

