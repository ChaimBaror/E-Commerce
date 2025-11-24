import React from 'react';
import {
    Box,
    Container,
    Typography,
    Stack,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from '@mui/material';
import { allProducts } from '../../../lib/data/data';
import { getTranslations } from 'next-intl/server';
import NewProductButton from '../../../components/admin/NewProductButton';
import ProductTableRowActions from '../../../components/admin/ProductTableRowActions';

export default async function ProductsPage() {
    const t = await getTranslations('admin.products');
    const products = allProducts;

    return (
        <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2 } }}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={2}
                sx={{ mb: { xs: 2, sm: 4 } }}
            >
                <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                    {t('title')}
                </Typography>
                <NewProductButton label={t('newProduct')} />
            </Stack>

            <TableContainer
                component={Paper}
                elevation={2}
                sx={{
                    borderRadius: 3,
                    overflowX: 'auto',
                }}
            >
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'grey.100' }}>
                            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                                <strong>{t('image')}</strong>
                            </TableCell>
                            <TableCell><strong>{t('name')}</strong></TableCell>
                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                                <strong>{t('categoryLabel')}</strong>
                            </TableCell>
                            <TableCell><strong>{t('priceLabel')}</strong></TableCell>
                            <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                                <strong>{t('rating')}</strong>
                            </TableCell>
                            <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                                <strong>{t('reviews')}</strong>
                            </TableCell>
                            <TableCell><strong>{t('actions')}</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id} hover>
                                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                                    <Box
                                        component="img"
                                        src={Array.isArray(product.image) ? product.image[0] : product.image}
                                        alt={product.name}
                                        sx={{
                                            width: { xs: 40, sm: 60 },
                                            height: { xs: 40, sm: 60 },
                                            objectFit: 'cover',
                                            borderRadius: 1
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Box
                                            component="img"
                                            src={Array.isArray(product.image) ? product.image[0] : product.image}
                                            alt={product.name}
                                            sx={{
                                                display: { xs: 'block', sm: 'none' },
                                                width: 40,
                                                height: 40,
                                                objectFit: 'cover',
                                                borderRadius: 1
                                            }}
                                        />
                                        <Typography variant="body2" fontWeight="medium" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                                            {product.name}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                                    <Chip label={product.category} size="small" />
                                </TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                                    ₪{product.price}
                                </TableCell>
                                <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                                    {product.rating}
                                </TableCell>
                                <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                                    {product.reviews}
                                </TableCell>
                                <TableCell>
                                    <ProductTableRowActions
                                        productId={product.id}
                                        editLabel={t('edit')}
                                        deleteLabel={t('delete')}
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

