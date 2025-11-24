import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Stack,
    Box,
    Chip,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { getTranslations } from 'next-intl/server';
import BackButton from '../../../../components/admin/BackButton';

// Mock data - TODO: Replace with API call
const mockOrder = {
    id: '1',
    orderId: 'ORD-12345',
    customerName: 'יוסי כהן',
    email: 'yossi@example.com',
    phone: '050-1234567',
    address: 'רחוב הרצל 15, תל אביב',
    total: 450,
    status: 'processing' as const,
    date: new Date().toISOString(),
    items: [
        { id: '1', name: 'אוזניות אלחוטיות פרימיום', quantity: 1, price: 299 },
        { id: '2', name: 'שעון חכם לכושר', quantity: 1, price: 199 },
    ],
};

interface OrderDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
    const t = await getTranslations('admin.orders');
    const resolvedParams = await params;

    // TODO: Fetch order by ID from API
    const order = mockOrder;

    const getStatusColor = (status: string) => {
        const colors: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
            pending: 'warning',
            processing: 'primary',
            shipped: 'primary',
            delivered: 'success',
            cancelled: 'error',
        };
        return colors[status] || 'default';
    };

    const getStatusLabel = (status: string) => {
        return t(`statuses.${status}`);
    };

    return (
        <Container maxWidth="lg">
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                <BackButton href="/admin/orders" label={t('back')} />
                <Typography variant="h4" fontWeight="bold">
                    {t('orderDetails')}
                </Typography>
            </Stack>

            <Stack spacing={3}>
                {/* Order Info */}
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Typography variant="h5" fontWeight="bold">
                            {t('orderNumber', { orderId: order.orderId })}
                        </Typography>
                        <Chip
                            label={getStatusLabel(order.status)}
                            color={getStatusColor(order.status)}
                        />
                    </Stack>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                            gap: 3,
                        }}
                    >
                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {t('customerName')}
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                                {order.customerName}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {t('email')}
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                                {order.email}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {t('phone')}
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                                {order.phone}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {t('orderDate')}
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                                {new Date(order.date).toLocaleDateString('he-IL')}
                            </Typography>
                        </Box>
                        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {t('shippingAddress')}
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                                {order.address}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                {/* Order Items */}
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {t('orderItems')}
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>{t('product')}</strong></TableCell>
                                    <TableCell align="center"><strong>{t('quantity')}</strong></TableCell>
                                    <TableCell align="right"><strong>{t('price')}</strong></TableCell>
                                    <TableCell align="right"><strong>{t('subtotal')}</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell align="center">{item.quantity}</TableCell>
                                        <TableCell align="right">₪{item.price}</TableCell>
                                        <TableCell align="right">₪{item.price * item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight="bold">
                            {t('total')}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" color="primary">
                            ₪{order.total.toLocaleString()}
                        </Typography>
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    );
}

