import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface ActionButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  rounded?: boolean;
}

const ActionButton = ({
  children,
  loading = false,
  loadingText,
  fullWidth = false,
  rounded = true,
  disabled,
  sx,
  ...buttonProps
}: ActionButtonProps) => {
  return (
    <Button
      {...buttonProps}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      sx={{
        borderRadius: rounded ? '25px' : undefined,
        py: 1.5,
        fontWeight: 600,
        ...sx
      }}
    >
      {loading ? (loadingText || 'מעבד...') : children}
    </Button>
  );
};

export default ActionButton;



