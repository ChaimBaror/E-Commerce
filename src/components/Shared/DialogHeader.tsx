import React from 'react';
import { DialogTitle, Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface DialogHeaderProps {
  title: string;
  onClose: () => void;
  icon?: React.ReactNode;
}

const DialogHeader = ({ title, onClose, icon }: DialogHeaderProps) => {
  return (
    <DialogTitle>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon && icon}
          <Typography variant="h6">{title}</Typography>
        </Box>
        <IconButton onClick={onClose} size="small" aria-label="Close dialog">
          <Close />
        </IconButton>
      </Box>
    </DialogTitle>
  );
};

export default DialogHeader;


