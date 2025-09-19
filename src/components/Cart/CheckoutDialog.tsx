import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Paper,
  Typography,
  Box,
  LinearProgress,
  IconButton,
  Divider,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';
import { useTranslations } from 'next-intl';

interface CheckoutDialogProps {
  open: boolean;
  onClose: () => void;
}

const CheckoutDialog = ({ open, onClose }: CheckoutDialogProps) => {
  const t = useTranslations('HomePage');
  const { cart, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    creditCard: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOrderComplete(true);
      clearCart();
    }, 3000);
  };

  if (orderComplete) {
    return (
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
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
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{t('payment')}</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      {loading && <LinearProgress />}

      <DialogContent>
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {t('orderSummary')}
              </Typography>
              {cart.map((item) => (
                <Box key={item.id} display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">
                    {item.name} x{item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    ₪{item.price * item.quantity}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">{t('total')}</Typography>
                <Typography variant="h6" color="primary">
                  ₪{getTotalPrice()}
                </Typography>
              </Box>
            </Paper>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label={t('fullName')}
                value={formData.fullName}
                onChange={handleInputChange('fullName')}
                required
              />
              <TextField
                fullWidth
                label={t('address')}
                value={formData.address}
                onChange={handleInputChange('address')}
                multiline
                rows={2}
                required
              />
              <TextField
                fullWidth
                label={t('phone')}
                value={formData.phone}
                onChange={handleInputChange('phone')}
                type="tel"
                required
              />
              <TextField
                fullWidth
                label={t('creditCard')}
                value={formData.creditCard}
                onChange={handleInputChange('creditCard')}
                placeholder="0000 0000 0000 0000"
                required
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  sx={{ flex: 1 }}
                  label={t('expiryDate')}
                  value={formData.expiryDate}
                  onChange={handleInputChange('expiryDate')}
                  placeholder="MM/YY"
                  required
                />
                <TextField
                  sx={{ flex: 1 }}
                  label={t('cvv')}
                  value={formData.cvv}
                  onChange={handleInputChange('cvv')}
                  type="password"
                  required
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handlePayment}
          disabled={loading}
          sx={{ minWidth: 200 }}
        >
          {t('pay')} ₪{getTotalPrice()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutDialog;