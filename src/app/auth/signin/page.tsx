"use client";

import React from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Divider,
  useTheme,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

const SignInPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const t = useTranslations('auth');

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push('/user');
      }
    });
  }, [router]);

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/user' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #1e293b 0%, #6366f1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              {t('welcome')}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              {t('signInToContinue')}
            </Typography>
          </Box>

          <Stack spacing={3} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                backgroundColor: '#4285f4',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#3367d6',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
              >
              {t('continueWithGoogle')}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {t('or')}
              </Typography>
            </Divider>

            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/')}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 500,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: 'rgba(99, 102, 241, 0.04)',
                },
              }}
            >
              {t('continueAsGuest')}
            </Button>
          </Stack>

          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e2e8f0' }}>
            <Typography variant="body2" color="text.secondary">
              {t('termsAndPrivacyPrefix')}
              <Typography
                component="span"
                sx={{
                  color: theme.palette.primary.main,
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {t('termsOfService')}
              </Typography>
              {t('termsAndPrivacyMiddle')}
              <Typography
                component="span"
                sx={{
                  color: theme.palette.primary.main,
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {t('privacyPolicy')}
              </Typography>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignInPage;
