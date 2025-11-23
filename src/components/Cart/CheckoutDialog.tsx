import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, LinearProgress, Box } from '@mui/material';
import { useCartStore } from '../../stores/cartStore';
import { useAuth } from '../../contexts/AuthContext';
import OrderSummary from './OrderSummary';
import CheckoutForm from './CheckoutForm';
import OrderCompleteDialog from './OrderCompleteDialog';
import CheckoutDialogHeader from './CheckoutDialogHeader';
import CheckoutDialogActions from './CheckoutDialogActions';

interface CheckoutDialogProps {
  onClose: () => void;
}

const CheckoutDialog = ({ onClose }: CheckoutDialogProps) => {
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
  });

  // Fill form with user data if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleInputChange = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleOrder = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic form validation
    if (!formData.fullName || !formData.address || !formData.phone || !formData.email) {
      alert('אנא מלא את כל השדות הנדרשים');
      return;
    }

    setLoading(true);

    try {
      // Send order confirmation email through server
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
          cart: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category,
            description: item.description,
            rating: item.rating,
            reviews: item.reviews,
            quantity: item.quantity,
          })),
          total: getTotalPrice(),
        }),
      });

      const emailResult = await emailResponse.json();
      
      if (emailResult.success) {
        console.log('Order confirmation email sent successfully:', {
          orderId: emailResult.orderId,
          messageId: emailResult.messageId,
        });
        setOrderComplete(true);
        clearCart();
        setShowSuccess(true);
      } else {
        console.error('Failed to send email:', emailResult.error);
        alert('ההזמנה נשמרה, אבל לא הצלחנו לשלוח מייל אישור. אנא צור קשר עם התמיכה');
        setOrderComplete(true);
        clearCart();
      }
    } catch (error) {
      console.error('Error sending order:', error);
      alert('שגיאה בשליחת ההזמנה. אנא נסה שוב.');
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return <OrderCompleteDialog onClose={onClose} />;
  }

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <CheckoutDialogHeader onClose={onClose} />
      {loading && <LinearProgress />}
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <OrderSummary cart={cart} total={getTotalPrice()} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <CheckoutForm formData={formData} onInputChange={handleInputChange} />
          </Box>
        </Box>
      </DialogContent>
      <CheckoutDialogActions
        loading={loading}
        total={getTotalPrice()}
        showSuccess={showSuccess}
        onOrder={(e) => handleOrder(e)}
        onCloseSuccess={() => setShowSuccess(false)}
      />
    </Dialog>
  );
};

export default CheckoutDialog;