import React from 'react';
import { Drawer, Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useCart } from '@/src/contexts/CartContext';



interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { cart, getTotalPrice } = useCart();
  const [showCheckout, setShowCheckout] = React.useState(false);
  const t = useTranslations('HomePage');

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
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
    </Drawer>
  );
};

export default CartDrawer;