"use client";

import React from 'react';
import { Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface NewProductButtonProps {
    label: string;
}

export default function NewProductButton({ label }: NewProductButtonProps) {
    const router = useRouter();

    return (
        <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push('/admin/products/new')}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
            {label}
        </Button>
    );
}

