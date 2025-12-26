
import React from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Card,
    CardContent,
    Stack,
} from '@mui/material';
import {
    Inventory as InventoryIcon,
    ShoppingCart as ShoppingCartIcon,
    AttachMoney as AttachMoneyIcon,
    People as PeopleIcon,
} from '@mui/icons-material';
import { getTranslations } from 'next-intl/server';

const StatCard = ({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) => (
    <Card elevation={2} sx={{ height: '100%', borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack direction="row" alignItems="center" spacing={{ xs: 1.5, sm: 2 }}>
                <Box
                    sx={{
                        p: { xs: 1.5, sm: 2 },
                        borderRadius: 2,
                        bgcolor: `${color}20`,
                        color: color,
                    }}
                >
                    {icon}
                </Box>
                <Box>
                    <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                        {value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        {title}
                    </Typography>
                </Box>
            </Stack>
        </CardContent>
    </Card>
);

export default async function AdminDashboard() {
    const t = await getTranslations('admin');

    // TODO: Fetch real data from API
    const stats = {
        totalProducts: 50,
        totalOrders: 1247,
        totalRevenue: '₪156,890',
        totalUsers: 342,
    };

    return (
        <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2 } }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: { xs: 2, sm: 4 }, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                {t('menu.dashboard')}
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: { xs: 2, sm: 3 },
                    mb: { xs: 2, sm: 4 },
                }}
            >
                <StatCard
                    title={t('stats.totalProducts')}
                    value={stats.totalProducts}
                    icon={<InventoryIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />}
                    color="#6366f1"
                />
                <StatCard
                    title={t('stats.totalOrders')}
                    value={stats.totalOrders}
                    icon={<ShoppingCartIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />}
                    color="#10b981"
                />
                <StatCard
                    title={t('stats.totalRevenue')}
                    value={stats.totalRevenue}
                    icon={<AttachMoneyIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />}
                    color="#f59e0b"
                />
                <StatCard
                    title={t('stats.totalUsers')}
                    value={stats.totalUsers}
                    icon={<PeopleIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />}
                    color="#ec4899"
                />
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
                    gap: { xs: 2, sm: 3 },
                }}
            >
                <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, height: { xs: 300, sm: 400 } }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                        {t('dashboard.recentOrders')}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            {t('analytics.chartPlaceholder')}
                        </Typography>
                    </Box>
                </Paper>
                <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, height: { xs: 300, sm: 400 } }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                        {t('dashboard.popularProducts')}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            {t('analytics.listPlaceholder')}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

