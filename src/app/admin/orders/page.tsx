"use client";

import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import OrderTable from '../../../components/admin/OrderTable';
import { useTranslations } from 'next-intl';

// Mock data - TODO: Replace with API call
const mockOrders = [
    {
        id: '1',
        orderId: 'ORD-12345',
        customerName: 'יוסי כהן',
        email: 'yossi@example.com',
        total: 450,
        status: 'processing' as const,
        date: new Date().toISOString(),
    },
    {
        id: '2',
        orderId: 'ORD-12346',
        customerName: 'שרה לוי',
        email: 'sara@example.com',
        total: 299,
        status: 'shipped' as const,
        date: new Date().toISOString(),
    },
    {
        id: '3',
        orderId: 'ORD-12347',
        customerName: 'דוד ישראלי',
        email: 'david@example.com',
        total: 1200,
        status: 'delivered' as const,
        date: new Date().toISOString(),
    },
];

export default function OrdersPage() {
    const t = useTranslations('admin.orders');
    const [orders] = useState(mockOrders);

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                {t('title')}
            </Typography>

            <OrderTable orders={orders} />
        </Container>
    );
}

