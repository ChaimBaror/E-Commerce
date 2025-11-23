"use client";

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { allProducts } from '../../../data/data';
import { Product } from '../../../types';
import { useTranslations } from 'next-intl';

export default function ProductsPage() {
    const router = useRouter();
    const t = useTranslations('admin.products');
    const [products] = useState<Product[]>(allProducts);

    const handleEdit = (id: string) => {
        router.push(`/admin/products/${id}/edit`);
    };

    const handleDelete = (id: string) => {
        // TODO: Implement delete functionality
        console.log('Delete product:', id);
    };

    return (
        <Container maxWidth="xl">
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    {t('title')}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => router.push('/admin/products/new')}
                >
                    {t('newProduct')}
                </Button>
            </Stack>

            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'grey.100' }}>
                            <TableCell><strong>{t('image')}</strong></TableCell>
                            <TableCell><strong>{t('name')}</strong></TableCell>
                            <TableCell><strong>{t('categoryLabel')}</strong></TableCell>
                            <TableCell><strong>{t('priceLabel')}</strong></TableCell>
                            <TableCell><strong>{t('rating')}</strong></TableCell>
                            <TableCell><strong>{t('reviews')}</strong></TableCell>
                            <TableCell><strong>{t('actions')}</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id} hover>
                                <TableCell>
                                    <Box
                                        component="img"
                                        src={product.image}
                                        alt={product.name}
                                        sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="medium">
                                        {product.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip label={product.category} size="small" />
                                </TableCell>
                                <TableCell>₪{product.price}</TableCell>
                                <TableCell>{product.rating}</TableCell>
                                <TableCell>{product.reviews}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEdit(product.id)}
                                            color="primary"
                                            title={t('edit')}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDelete(product.id)}
                                            color="error"
                                            title={t('delete')}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

