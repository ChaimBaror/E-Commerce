import React from 'react';
import { Dialog, DialogContent, Typography, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { CheckCircle } from '@mui/icons-material';

interface OrderCompleteDialogProps {
  onClose: () => void;
}

const OrderCompleteDialog = ({ onClose }: OrderCompleteDialogProps) => {
  const t = useTranslations('HomePage');
  
  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogContent sx={{ textAlign: 'center', py: 4 }}>
        <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          {t('orderComplete')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {t('thankYou')}
        </Typography>
        <Button variant="contained" onClick={onClose} size="large">
          {t('close')}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default OrderCompleteDialog;

