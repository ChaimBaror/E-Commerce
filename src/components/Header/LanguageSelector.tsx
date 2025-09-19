import React from 'react';
import { IconButton } from '@mui/material';
import { Language, KeyboardArrowDown } from '@mui/icons-material';

const LanguageSelector = () => {

  return (
    <>
      <IconButton color="inherit" >
        <Language />
        <KeyboardArrowDown />
      </IconButton>
 
    </>
  );
};

export default LanguageSelector;