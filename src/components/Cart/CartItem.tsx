import React from 'react';
import { ListItem, Avatar, Box, Typography, IconButton, Chip } from '@mui/material';
import { useTranslations } from 'next-intl';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem as CartItemType } from '../../types';
import QuantitySelector from '../Shared/QuantitySelector';
import PriceDisplay from '../Shared/PriceDisplay';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const t = useTranslations('cart');
  
  return (
    <ListItem
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Avatar
        src={item.image[0] || ''}
        alt={item.name}
        variant="rounded"
        sx={{ width: 80, height: 80 }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
          {item.name}
        </Typography>
        <Chip label={item.category} size="small" sx={{ mb: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <PriceDisplay 
            price={item.price} 
            variant="body2" 
            color="text.secondary"
            showCurrency={true}
          />
          <Typography variant="body2" color="text.secondary" component="span">
            {t('each')}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <QuantitySelector
          quantity={item.quantity}
          onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
          onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
          min={1}
        />
        <IconButton
          size="small"
          onClick={() => onRemove(item.id)}
          color="error"
          aria-label="Remove item"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <PriceDisplay 
        price={item.price} 
        quantity={item.quantity}
        variant="h6" 
        sx={{ fontWeight: 600, minWidth: 80, textAlign: 'right' }}
      />
    </ListItem>
  );
};

export default CartItem;

