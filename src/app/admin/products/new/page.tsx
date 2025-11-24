import React from 'react';
import { Container } from '@mui/material';
import ProductFormWrapper from '../../../../components/admin/ProductFormWrapper';
import { createProduct } from '../actions';

export default function NewProductPage() {
    return (
        <Container maxWidth="md">
            <ProductFormWrapper onSubmit={createProduct} />
        </Container>
    );
}

