"use client";

import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
    href: string;
    label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
    const router = useRouter();

    return (
        <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push(href)}
        >
            {label}
        </Button>
    );
}

