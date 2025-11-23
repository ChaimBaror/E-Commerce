import React from 'react';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import FormField from '../Shared/FormField';

interface CheckoutFormProps {
  formData: {
    fullName: string;
    address: string;
    phone: string;
    email: string;
  };
  onInputChange: (field: keyof CheckoutFormProps['formData']) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckoutForm = ({ formData, onInputChange }: CheckoutFormProps) => {
  const t = useTranslations('HomePage');
  
  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormField
        name="fullName"
        label={t('fullName')}
        value={formData.fullName}
        onChange={(value) => onInputChange('fullName')({ target: { value } } as React.ChangeEvent<HTMLInputElement>)}
        required
      />
      <FormField
        name="email"
        label={t('email') || 'Email'}
        type="email"
        value={formData.email}
        onChange={(value) => onInputChange('email')({ target: { value } } as React.ChangeEvent<HTMLInputElement>)}
        required
      />
      <FormField
        name="address"
        label={t('address')}
        value={formData.address}
        onChange={(value) => onInputChange('address')({ target: { value } } as React.ChangeEvent<HTMLInputElement>)}
        multiline
        rows={2}
        required
      />
      <FormField
        name="phone"
        label={t('phone')}
        type="tel"
        value={formData.phone}
        onChange={(value) => onInputChange('phone')({ target: { value } } as React.ChangeEvent<HTMLInputElement>)}
        required
      />
    </Box>
  );
};

export default CheckoutForm;

