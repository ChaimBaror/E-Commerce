"use client";

import React from 'react';
import { Stack, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { deleteProduct } from '@/src/app/admin/products/actions';

interface ProductTableRowActionsProps {
    productId: string;
    editLabel: string;
    deleteLabel: string;
}

export default function ProductTableRowActions({
    productId,
    editLabel,
    deleteLabel,
}: ProductTableRowActionsProps) {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/admin/products/${productId}/edit`);
    };

    const handleDelete = async () => {
        await deleteProduct(productId);
    };

    return (
        <Stack direction="row" spacing={0.5}>
            <IconButton
                size="small"
                onClick={handleEdit}
                color="primary"
                title={editLabel}
            >
                <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
                size="small"
                onClick={handleDelete}
                color="error"
                title={deleteLabel}
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Stack>
    );
}

