import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Badge,
  Box,
  useTheme,
  alpha
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useTranslations } from 'next-intl';

interface NavbarProps {
  onCartOpen: () => void;
  cartItemCount?: number;
}

const Navbar = ({ onCartOpen, cartItemCount = 0 }: NavbarProps) => {
  const theme = useTheme();
  const t = useTranslations('HomePage');

  return (
    <AppBar 
      position="fixed" 
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar sx={{ minHeight: '70px', px: { xs: 2, sm: 3 } }}>
        {/* Logo and Store Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <StorefrontIcon 
            sx={{ 
              mr: 1.5, 
              fontSize: 32,
              color: 'white',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
            }} 
          />
          <Typography 
            variant="h4" 
            component="div"
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #ffffff 30%, #f0f8ff 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              letterSpacing: '-0.02em',
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            {t('storeName')}
          </Typography>
        </Box>

        {/* Navigation Links - Optional */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              mx: 2, 
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.9)',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'white',
                textShadow: '0 0 8px rgba(255,255,255,0.5)'
              }
            }}
          >
            Shop
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mx: 2, 
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.9)',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'white',
                textShadow: '0 0 8px rgba(255,255,255,0.5)'
              }
            }}
          >
            About
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mx: 2, 
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.9)',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'white',
                textShadow: '0 0 8px rgba(255,255,255,0.5)'
              }
            }}
          >
            Contact
          </Typography>
        </Box>

        {/* Cart Button */}
        <IconButton 
          color="inherit" 
          onClick={onCartOpen}
          sx={{
            backgroundColor: alpha(theme.palette.common.white, 0.1),
            borderRadius: '12px',
            padding: '12px',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.2),
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
            }
          }}
        >
          <Badge 
            badgeContent={cartItemCount} 
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#ff4757',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.7rem',
                minWidth: '20px',
                height: '20px'
              }
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 28 }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;