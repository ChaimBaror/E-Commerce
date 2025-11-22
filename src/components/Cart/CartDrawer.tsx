import React, { useState } from 'react';
import { Drawer, Box, List } from '@mui/material';
import CheckoutDialog from './CheckoutDialog';
import { useCartStore } from '../../stores/cartStore';
import CartHeader from './CartHeader';
import CartItem from './CartItem';
import CartFooter from './CartFooter';
import EmptyCart from './EmptyCart';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const { cart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCartStore();

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCheckoutClose = () => {
    setShowCheckout(false);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100vw', sm: 400 },
          maxWidth: '100vw'
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CartHeader itemCount={getTotalItems()} onClose={onClose} />
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {cart.length === 0 ? (
            <EmptyCart onClose={onClose} />
          ) : (
            <List sx={{ p: 0 }}>
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </List>
          )}
        </Box>
        {cart.length > 0 && (
          <CartFooter total={getTotalPrice()} onCheckout={handleCheckout} />
        )}
      </Box>
      
      {showCheckout && (
        <CheckoutDialog 
          onClose={handleCheckoutClose} 
        />
      )}
    </Drawer>
  );
};

export default CartDrawer;
