"use client";

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Button,
  Stack,
  Divider,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import Navbar from '../../components/Header/Navbar';
import Footer from '../../components/Shared/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslations } from 'next-intl';

const UserProfilePage = () => {
  const { data: session, status } = useSession();
  const { signOut } = useAuth();
  const router = useRouter();
  const t = useTranslations('userProfile');

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <Navbar onCartOpen={() => {}} cartItemCount={0} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" align="center">
            {t('loading')}
          </Typography>
        </Container>
        <Footer />
      </Box>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = () => {
    signOut();
  };

  const handleEditProfile = () => {
    // TODO: Implement edit profile functionality
    console.log('Edit profile clicked');
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Navbar onCartOpen={() => {}} cartItemCount={0} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Profile Header */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
            <Avatar
              src={session.user?.image || ''}
              alt={session.user?.name || 'User'}
              sx={{
                width: 120,
                height: 120,
                border: '4px solid',
                borderColor: 'primary.main',
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                {session.user?.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {session.user?.email}
              </Typography>
              <Chip
                label={t('premiumMember')}
                color="primary"
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </Box>
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={handleEditProfile}
                sx={{
                  border: '1px solid',
                  borderColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                  },
                }}
              >
                <EditIcon />
              </IconButton>
                <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={handleSignOut}
                sx={{
                  borderColor: 'error.main',
                  color: 'error.main',
                  '&:hover': {
                    borderColor: 'error.dark',
                    backgroundColor: 'error.light',
                    color: 'white',
                  },
                }}
              >
                {t('signOut')}
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {/* Profile Sections */}
        <Grid container spacing={3}>
          {/* Account Information */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <PersonIcon color="primary" sx={{ fontSize: 32 }} />
                  <Typography variant="h5" fontWeight="bold">
                    {t('accountInformation')}
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {t('fullName')}
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {session.user?.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {t('emailAddress')}
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {session.user?.email}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {t('memberSince')}
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {new Date().toLocaleDateString()}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Order History */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <ShoppingCartIcon color="primary" sx={{ fontSize: 32 }} />
                  <Typography variant="h5" fontWeight="bold">
                    {t('orderHistory')}
                  </Typography>
                </Stack>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <ShoppingCartIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {t('noOrdersYet')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {t('startShoppingMessage')}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => router.push('/')}
                    sx={{ borderRadius: 2 }}
                  >
                    {t('startShopping')}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Wishlist */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <FavoriteIcon color="primary" sx={{ fontSize: 32 }} />
                  <Typography variant="h5" fontWeight="bold">
                    {t('wishlist')}
                  </Typography>
                </Stack>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <FavoriteIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {t('noItemsInWishlist')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {t('saveFavoriteItems')}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => router.push('/')}
                    sx={{ borderRadius: 2 }}
                  >
                    {t('browseProducts')}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Settings */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <SettingsIcon color="primary" sx={{ fontSize: 32 }} />
                  <Typography variant="h5" fontWeight="bold">
                    {t('settings')}
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ justifyContent: 'flex-start', py: 1.5 }}
                  >
                    {t('notificationPreferences')}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ justifyContent: 'flex-start', py: 1.5 }}
                  >
                    {t('privacySettings')}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ justifyContent: 'flex-start', py: 1.5 }}
                  >
                    {t('securitySettings')}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ justifyContent: 'flex-start', py: 1.5 }}
                  >
                    {t('helpSupport')}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default UserProfilePage;
