
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
import { useTranslations } from 'next-intl';

const StatCard = ({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) => (
    <Card elevation={2} sx={{ height: '100%', borderRadius: 3 }}>
        <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: `${color}20`,
                        color: color,
                    }}
                >
                    {icon}
                </Box>
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        {value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {title}
                    </Typography>
                </Box>
            </Stack>
        </CardContent>
    </Card>
);

export default function AdminDashboard() {
    const t = useTranslations('admin');

    // TODO: Fetch real data from API
    const stats = {
        totalProducts: 50,
        totalOrders: 1247,
        totalRevenue: '₪156,890',
        totalUsers: 342,
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                {t('dashboard')}
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: 3,
                    mb: 4,
                }}
            >
                <StatCard
                    title={t('stats.totalProducts')}
                    value={stats.totalProducts}
                    icon={<InventoryIcon sx={{ fontSize: 32 }} />}
                    color="#6366f1"
                />
                <StatCard
                    title={t('stats.totalOrders')}
                    value={stats.totalOrders}
                    icon={<ShoppingCartIcon sx={{ fontSize: 32 }} />}
                    color="#10b981"
                />
                <StatCard
                    title={t('stats.totalRevenue')}
                    value={stats.totalRevenue}
                    icon={<AttachMoneyIcon sx={{ fontSize: 32 }} />}
                    color="#f59e0b"
                />
                <StatCard
                    title={t('stats.totalUsers')}
                    value={stats.totalUsers}
                    icon={<PeopleIcon sx={{ fontSize: 32 }} />}
                    color="#ec4899"
                />
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
                    gap: 3,
                }}
            >
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: 400 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {t('dashboard.recentOrders')}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography variant="body2" color="text.secondary">
                            {t('analytics.chartPlaceholder')}
                        </Typography>
                    </Box>
                </Paper>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: 400 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {t('dashboard.popularProducts')}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography variant="body2" color="text.secondary">
                            {t('analytics.listPlaceholder')}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

