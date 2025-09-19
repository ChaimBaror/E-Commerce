import React from 'react';
import { Box, Button } from '@mui/material';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: number | null;
  onSelectCategory: (index: number) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      {categories.map((category, index) => (
        <Button
          key={index}
          variant={selectedCategory === index ? 'contained' : 'outlined'}
          onClick={() => onSelectCategory(index)}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryFilter;