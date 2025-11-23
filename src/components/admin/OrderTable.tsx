"use client";

import React from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
    IconButton,
    Stack,
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface Order {
    id: string;
    orderId: string;
    customerName: string;
    email: string;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    date: string;
}

interface OrderTableProps {
    orders: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
    const router = useRouter();
    const t = useTranslations('admin.orders');

    const getStatusColor = (status: Order['status']) => {
        const colors: Record<Order['status'], 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
            pending: 'warning',
            processing: 'primary',
            shipped: 'primary',
            delivered: 'success',
            cancelled: 'error',
        };
        return colors[status] || 'default';
    };

    const getStatusLabel = (status: Order['status']) => {
        return t(`statuses.${status}`);
    };

    return (
        <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3 }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.100' }}>
                        <TableCell><strong>{t('orderId')}</strong></TableCell>
                        <TableCell><strong>{t('customer')}</strong></TableCell>
                        <TableCell><strong>{t('email')}</strong></TableCell>
                        <TableCell><strong>{t('amount')}</strong></TableCell>
                        <TableCell><strong>{t('status')}</strong></TableCell>
                        <TableCell><strong>{t('date')}</strong></TableCell>
                        <TableCell><strong>{t('actions')}</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                <Typography variant="body2" color="text.secondary">
                                    {t('noOrders')}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders.map((order) => (
                            <TableRow key={order.id} hover>
                                <TableCell>{order.orderId}</TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>{order.email}</TableCell>
                                <TableCell>₪{order.total.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={getStatusLabel(order.status)}
                                        color={getStatusColor(order.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{new Date(order.date).toLocaleDateString('he-IL')}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton
                                            size="small"
                                            onClick={() => router.push(`/admin/orders/${order.id}`)}
                                            color="primary"
                                        >
                                            <VisibilityIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderTable;

