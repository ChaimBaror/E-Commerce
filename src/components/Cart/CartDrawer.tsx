import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  Avatar,
  useTheme,
  alpha,
  Stack,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckoutDialog from './CheckoutDialog';
import { useCart } from '../../contexts/CartContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const theme = useTheme();
  const [showCheckout, setShowCheckout] = useState(false);
  const { cart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart();

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCheckoutClose = () => {
    setShowCheckout(false);
  };

  const EmptyCart = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        textAlign: 'center',
        px: 3
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          backgroundColor: alpha(theme.palette.grey[500], 0.1),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2
        }}
      >
        <ShoppingCartIcon sx={{ fontSize: 50, color: theme.palette.grey[400] }} />
      </Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Your cart is empty
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Add some products to get started!
      </Typography>
      <Button variant="outlined" onClick={onClose} sx={{ borderRadius: '25px' }}>
        Continue Shopping
      </Button>
    </Box>
  );

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
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.05
            )}, ${alpha(theme.palette.primary.main, 0.1)})`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShoppingBagIcon sx={{ color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Shopping Cart
            </Typography>
            {cart.length > 0 && (
              <Chip
                label={getTotalItems()}
                size="small"
                color="primary"
                sx={{ minWidth: 24, height: 24 }}
              />
            )}
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Cart Items */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <List sx={{ p: 0 }}>
              {cart.map(item => (
                <ListItem
                  key={item.id}
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    borderBottom: `1px solid ${alpha(
                      theme.palette.divider,
                      0.5
                    )}`,
                    py: 2
                  }}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}
                  >
                    <Avatar
                      src={item.image}
                      alt={item.name}
                      variant="rounded"
                      sx={{ width: 60, height: 60 }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₪{item.price.toFixed(2)} each
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => removeFromCart(item.id)}
                      sx={{ color: theme.palette.error.main }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Quantity Controls */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        sx={{
                          border: `1px solid ${theme.palette.divider}`,
                          width: 32,
                          height: 32
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{
                          minWidth: 40,
                          textAlign: 'center',
                          fontWeight: 600,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1
                          ),
                          borderRadius: 1,
                          py: 0.5,
                          px: 1
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        sx={{
                          border: `1px solid ${theme.palette.divider}`,
                          width: 32,
                          height: 32
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      ₪{(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* Footer */}
        {cart.length > 0 && (
          <Box
            sx={{
              borderTop: `1px solid ${theme.palette.divider}`,
              p: 2,
              background: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(10px)'
            }}
          >
            <Stack spacing={2}>
              <Button
                variant="text"
                size="small"
                onClick={clearCart}
                sx={{ alignSelf: 'flex-start', color: theme.palette.error.main }}
              >
                Clear Cart
              </Button>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 1,
                  borderTop: `2px solid ${theme.palette.primary.main}`,
                  borderBottom: `2px solid ${theme.palette.primary.main}`
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total:
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main
                  }}
                >
                  ₪{getTotalPrice().toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                onClick={handleCheckout}
                fullWidth
                sx={{
                  borderRadius: '25px',
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
                  }
                }}
              >
                Proceed to Checkout
              </Button>
            </Stack>
          </Box>
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
