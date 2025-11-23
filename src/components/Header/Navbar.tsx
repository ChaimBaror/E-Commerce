import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Badge,
  Box,
  useTheme,
  alpha,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslations } from 'next-intl';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onCartOpen: () => void;
  cartItemCount?: number;
}

const Navbar = ({ onCartOpen, cartItemCount = 0 }: NavbarProps) => {
  const theme = useTheme();
  const t = useTranslations('HomePage');
  const tNav = useTranslations('navbar');
  const tAuth = useTranslations('auth');
  const { user, signIn, signOut } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [displayCount, setDisplayCount] = React.useState(0);

  // Handle hydration mismatch for cart count
  React.useEffect(() => {
    setMounted(true);
    setDisplayCount(cartItemCount);
  }, [cartItemCount]);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
    handleMenuClose();
  };

  const handleProfileClick = () => {
    router.push('/user');
    handleMenuClose();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{
        background: 'linear-gradient(135deg, #4b5563 0%, #1f2937 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
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

        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 3, gap: 1 }}>
          <Button
            variant="text"
            onClick={() => router.push('/')}
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              textTransform: 'none',
              px: 2,
              '&:hover': {
                color: 'white',
                backgroundColor: alpha(theme.palette.common.white, 0.1),
                textShadow: '0 0 8px rgba(255,255,255,0.5)'
              },
              transition: 'all 0.3s ease',
            }}
          >
            {tNav('home')}
          </Button>
          <Button
            variant="text"
            onClick={() => router.push('/')}
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              textTransform: 'none',
              px: 2,
              '&:hover': {
                color: 'white',
                backgroundColor: alpha(theme.palette.common.white, 0.1),
                textShadow: '0 0 8px rgba(255,255,255,0.5)'
              },
              transition: 'all 0.3s ease',
            }}
          >
            {tNav('shop')}
          </Button>
          <Button
            variant="text"
            onClick={() => router.push('/about')}
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              textTransform: 'none',
              px: 2,
              '&:hover': {
                color: 'white',
                backgroundColor: alpha(theme.palette.common.white, 0.1),
                textShadow: '0 0 8px rgba(255,255,255,0.5)'
              },
              transition: 'all 0.3s ease',
            }}
          >
            {tNav('about')}
          </Button>
          <Button
            variant="text"
            onClick={() => router.push('/contact')}
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              textTransform: 'none',
              px: 2,
              '&:hover': {
                color: 'white',
                backgroundColor: alpha(theme.palette.common.white, 0.1),
                textShadow: '0 0 8px rgba(255,255,255,0.5)'
              },
              transition: 'all 0.3s ease',
            }}
          >
            {tNav('contact')}
          </Button>
        </Box>

        {/* User Authentication */}
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          {user ? (
            <>
              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{
                  p: 1,
                  backgroundColor: alpha(theme.palette.common.white, 0.1),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.white, 0.2),
                  },
                  transition: 'all 0.3s ease',
                  borderRadius: 2
                }}
              >
                <Avatar
                  src={user.image || ''}
                  alt={user.name || 'User'}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  }
                }}
              >
                <MenuItem onClick={handleProfileClick}>
                  <PersonIcon sx={{ mr: 2 }} />
                  {tAuth('profile')}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSignOut}>
                  <LogoutIcon sx={{ mr: 2 }} />
                  {tAuth('signOut')}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="outlined"
              onClick={handleSignIn}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: alpha(theme.palette.common.white, 0.1),
                },
                mr: 1
              }}
            >
              {tAuth('signIn')}
            </Button>
          )}

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
              badgeContent={mounted ? displayCount : 0} 
              color="error"
              showZero={false}
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;