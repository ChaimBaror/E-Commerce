import React from 'react';
import { DialogActions, Alert, Snackbar } from '@mui/material';
import { useTranslations } from 'next-intl';
import ActionButton from '../Shared/ActionButton';

interface CheckoutDialogActionsProps {
  loading: boolean;
  total: number;
  showSuccess: boolean;
  onOrder: (event: React.FormEvent) => void;
  onCloseSuccess: () => void;
}

const CheckoutDialogActions = ({
  loading,
  total,
  showSuccess,
  onOrder,
  onCloseSuccess
}: CheckoutDialogActionsProps) => {
  const t = useTranslations('cart');
  
  return (
    <>
      <DialogActions sx={{ p: 3 }}>
        <ActionButton
          type="submit"
          variant="contained"
          size="large"
          onClick={(e) => onOrder(e as React.FormEvent)}
          loading={loading}
          loadingText={t('processing')}
          sx={{ 
            minWidth: 200,
            color: '#ffffff',
            '&:hover': {
              color: '#ffffff',
            },
            '&:disabled': {
              color: 'rgba(255, 255, 255, 0.6)',
            }
          }}
        >
          {`${t('sendOrder')} ₪${total.toFixed(2)}`}
        </ActionButton>
      </DialogActions>
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={onCloseSuccess}
      >
        <Alert onClose={onCloseSuccess} severity="success">
          {t('orderSent')}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CheckoutDialogActions;

