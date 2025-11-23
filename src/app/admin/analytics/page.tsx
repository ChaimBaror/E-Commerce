"use client";

import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
} from '@mui/material';
import { useTranslations } from 'next-intl';

export default function AnalyticsPage() {
    const t = useTranslations('admin.analytics');

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                {t('title')}
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: 3,
                }}
            >
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: 400 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {t('salesByMonth')}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography variant="body2" color="text.secondary">
                            {t('chartPlaceholder')}
                        </Typography>
                    </Box>
                </Paper>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: 400 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {t('popularProducts')}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography variant="body2" color="text.secondary">
                            {t('listPlaceholder')}
                        </Typography>
                    </Box>
                </Paper>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: 400 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {t('newCustomers')}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography variant="body2" color="text.secondary">
                            {t('chartPlaceholder')}
                        </Typography>
                    </Box>
                </Paper>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: 400 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {t('revenueByCategory')}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography variant="body2" color="text.secondary">
                            {t('chartPlaceholder')}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

