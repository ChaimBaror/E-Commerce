"use client";

import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from '@mui/material';
import { useTranslations } from 'next-intl';

// Mock data - TODO: Replace with API call
const mockUsers = [
    {
        id: '1',
        name: 'יוסי כהן',
        email: 'yossi@example.com',
        orders: 5,
        totalSpent: 1250,
        status: 'active' as const,
    },
    {
        id: '2',
        name: 'שרה לוי',
        email: 'sara@example.com',
        orders: 12,
        totalSpent: 3200,
        status: 'active' as const,
    },
    {
        id: '3',
        name: 'דוד ישראלי',
        email: 'david@example.com',
        orders: 2,
        totalSpent: 450,
        status: 'active' as const,
    },
];

export default function UsersPage() {
    const t = useTranslations('admin.users');

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
                {t('title')}
            </Typography>

            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'grey.100' }}>
                            <TableCell><strong>{t('name')}</strong></TableCell>
                            <TableCell><strong>{t('email')}</strong></TableCell>
                            <TableCell><strong>{t('ordersCount')}</strong></TableCell>
                            <TableCell><strong>{t('totalSpent')}</strong></TableCell>
                            <TableCell><strong>{t('status')}</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockUsers.map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.orders}</TableCell>
                                <TableCell>₪{user.totalSpent.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.status === 'active' ? t('active') : t('inactive')}
                                        color={user.status === 'active' ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

