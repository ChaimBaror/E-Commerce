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
    Alert,
    Button,
    Link,
} from '@mui/material';
import { getTranslations } from 'next-intl/server';
import NewProductButton from '../../../components/admin/NewProductButton';
import ProductTableRowActions from '../../../components/admin/ProductTableRowActions';
import { getAllProductsBasicInfo } from '../../../lib/db/productsAdapter';
import type { ProductBasicInfo } from '../../../types';

export default async function ProductsPage() {
    const t = await getTranslations('admin.products');

    let products: ProductBasicInfo[] = [];
    let dbError: string | null = null;

    try {
        products = await getAllProductsBasicInfo();
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (errorMessage.includes('does not exist') || errorMessage.includes('relation')) {
            dbError = 'tables_not_created';
        } else {
            dbError = errorMessage;
        }
        products = [];
    }

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

            {dbError === 'tables_not_created' && (
                <Alert
                    severity="warning"
                    sx={{ mb: 3 }}
                    action={
                        <Button
                            component={Link}
                            href="/api/db/init"
                            target="_blank"
                            size="small"
                            variant="contained"
                            color="warning"
                        >
                            Create Tables
                        </Button>
                    }
                >
                    <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                        Database tables not created yet!
                    </Typography>
                    <Typography variant="body2">
                        Click the button above to create the database tables, or run:
                    </Typography>
                    <Box component="code" sx={{ display: 'block', mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                        curl http://localhost:3000/api/db/init
                    </Box>
                </Alert>
            )}

            {dbError && dbError !== 'tables_not_created' && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    Database error: {dbError}
                </Alert>
            )}

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
                                    {product.image && product.image.length > 0 && (
                                        <Box
                                            component="img"
                                            src={product.image[0]}
                                            alt={product.name}
                                            sx={{
                                                width: { xs: 40, sm: 60 },
                                                height: { xs: 40, sm: 60 },
                                                objectFit: 'cover',
                                                borderRadius: 1
                                            }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        {product.image && product.image.length > 0 && (
                                            <Box
                                                component="img"
                                                src={product.image[0]}
                                                alt={product.name}
                                                sx={{
                                                    display: { xs: 'block', sm: 'none' },
                                                    width: 40,
                                                    height: 40,
                                                    objectFit: 'cover',
                                                    borderRadius: 1
                                                }}
                                            />
                                        )}
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

