import React from 'react';
import { Box, Typography, Button, alpha, useTheme } from '@mui/material';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  height?: string | number;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  height = '50vh'
}: EmptyStateProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height,
        textAlign: 'center',
        px: 3
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          backgroundColor: alpha(theme.palette.grey[500], 0.1),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button 
          variant="outlined" 
          onClick={onAction} 
          sx={{ borderRadius: '25px' }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;


