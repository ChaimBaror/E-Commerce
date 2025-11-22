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
  Alert,
  Snackbar
} from '@mui/material';
import { Close, CheckCircle } from '@mui/icons-material';
import { useCartStore } from '../../stores/cartStore';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutDialogProps {
  onClose: () => void;
}

const CheckoutForm = ({ onClose }: { onClose: () => void }) => {
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
  });

  const handleInputChange = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  React.useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: cart,
            totalAmount: getTotalPrice(),
          }),
        });

        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    };

    if (cart.length > 0) {
      createPaymentIntent();
    }
  }, [cart, getTotalPrice]);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Basic form validation
    if (!formData.fullName || !formData.address || !formData.phone || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setLoading(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.fullName,
            email: formData.email,
            address: {
              line1: formData.address,
            },
            phone: formData.phone,
          },
        },
      });

      if (error) {
        console.error('Payment failed:', error);
        alert(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        // Send order confirmation email
        try {
          const emailResponse = await fetch('/api/send-order-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fullName: formData.fullName,
              email: formData.email,
              address: formData.address,
              phone: formData.phone,
              cart: cart,
              total: getTotalPrice(),
            }),
          });

          const emailResult = await emailResponse.json();
          
          if (emailResult.success) {
            console.log('Order confirmation email sent:', emailResult.orderId);
          } else {
            console.error('Failed to send email:', emailResult.error);
          }
        } catch (emailError) {
          console.error('Error sending order email:', emailError);
        }

        setOrderComplete(true);
        clearCart();
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <Dialog open={true} maxWidth="sm" fullWidth>
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Order Complete!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Thank you for your purchase! Your order has been processed successfully.
          </Typography>
          <Button variant="contained" onClick={onClose} size="large">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Payment & Checkout</Typography>
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
                Order Summary
              </Typography>
              {cart.map((item) => (
                <Box key={item.id} display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">
                    {item.name} x{item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    ₪{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  ₪{getTotalPrice().toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Box component="form" onSubmit={handlePayment} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.fullName}
                onChange={handleInputChange('fullName')}
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
              />
              <TextField
                fullWidth
                label="Address"
                value={formData.address}
                onChange={handleInputChange('address')}
                multiline
                rows={2}
                required
              />
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                type="tel"
                required
              />
              
              <Box sx={{ 
                p: 2, 
                border: '1px solid #e0e0e0', 
                borderRadius: 1,
                backgroundColor: '#f9f9f9'
              }}>
                <Typography variant="subtitle2" gutterBottom>
                  Card Information
                </Typography>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          onClick={handlePayment}
          disabled={loading || !stripe}
          sx={{ 
            minWidth: 200,
            color: '#ffffff',
            fontWeight: 600,
            '&:hover': {
              color: '#ffffff',
            },
            '&:disabled': {
              color: 'rgba(255, 255, 255, 0.6)',
            }
          }}
        >
          {loading ? 'Processing...' : `Pay ₪${getTotalPrice().toFixed(2)}`}
        </Button>
      </DialogActions>
      
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          Payment successful! Your order has been placed.
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

const CheckoutDialog = ({ onClose }: CheckoutDialogProps) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onClose={onClose} />
    </Elements>
  );
};

export default CheckoutDialog;