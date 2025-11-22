"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useTranslations } from 'next-intl';

const AuthErrorPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get('error');
  const t = useTranslations('auth');

  const getErrorMessage = (errorType: string | null) => {
    switch (errorType) {
      case 'Configuration':
        return 'יש בעיה בהגדרת המערכת. אנא פנה למנהל המערכת.';
      case 'AccessDenied':
        return 'הגישה נדחתה. אנא נסה שוב.';
      case 'Verification':
        return 'בעיה באימות. אנא נסה שוב.';
      default:
        return 'אירעה שגיאה בהתחברות. אנא נסה שוב.';
    }
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
          <Stack spacing={3}>
            <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mx: 'auto' }} />
            
            <Typography variant="h4" component="h1" fontWeight="bold" color="error">
              שגיאת התחברות
            </Typography>

            <Alert severity="error" sx={{ textAlign: 'right' }}>
              {getErrorMessage(error)}
            </Alert>

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                onClick={() => router.push('/auth/signin')}
                sx={{ borderRadius: 2 }}
              >
                נסה שוב
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push('/')}
                sx={{ borderRadius: 2 }}
              >
                חזור לעמוד הבית
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthErrorPage;

