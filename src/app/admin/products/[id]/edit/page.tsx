import { Container, Typography, Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import ProductFormWrapper from '../../../../../components/admin/ProductFormWrapper';

interface EditProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const t = await getTranslations('admin.products');
    const resolvedParams = await params;
    const productId = resolvedParams.id ? decodeURIComponent(resolvedParams.id) : '';

    if (!productId) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography variant="h5" color="error">
                        {t('productNotFound')}
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <ProductFormWrapper productId={productId} />
        </Container>
    );
}

