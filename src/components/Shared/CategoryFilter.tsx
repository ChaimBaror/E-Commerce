import React from 'react';
import { 
  Box, 
  Button, 
  Chip, 
  Typography, 
  useTheme,
  alpha,
  Stack
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: number | null;
  onSelectCategory: (index: number) => void;
  showAllOption?: boolean;
  title?: string;
  variant?: 'buttons' | 'chips';
}

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  showAllOption = true,
  title = "Select Category",
  variant = 'buttons'
}: CategoryFilterProps) => {
  const theme = useTheme();

  const handleCategoryClick = (index: number) => {
    // Allow deselecting by clicking the same category
    if (selectedCategory === index) {
      onSelectCategory(-1); // Use -1 to indicate no selection
    } else {
      onSelectCategory(index);
    }
  };

  const renderButtons = () => (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: { xs: 1, sm: 2 },
        flexWrap: 'wrap',
        justifyContent: { xs: 'center', sm: 'flex-start' }
      }}
    >
      {showAllOption && (
        <Button
          variant={selectedCategory === -1 || selectedCategory === null ? 'contained' : 'outlined'}
          onClick={() => onSelectCategory(-1)}
          startIcon={<AllInclusiveIcon />}
          sx={{
            borderRadius: '25px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
            },
            ...(selectedCategory === -1 || selectedCategory === null ? {
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            } : {
              borderColor: alpha(theme.palette.primary.main, 0.5),
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.05)
              }
            })
          }}
        >
          All Categories
        </Button>
      )}
      
      {categories.map((category, index) => (
        <Button
          key={index}
          variant={selectedCategory === index ? 'contained' : 'outlined'}
          onClick={() => handleCategoryClick(index)}
          sx={{
            borderRadius: '25px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
            },
            ...(selectedCategory === index ? {
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            } : {
              borderColor: alpha(theme.palette.primary.main, 0.5),
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.05)
              }
            })
          }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );

  const renderChips = () => (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        flexWrap: 'wrap',
        justifyContent: { xs: 'center', sm: 'flex-start' }
      }}
    >
      {showAllOption && (
        <Chip
          label="All Categories"
          icon={<AllInclusiveIcon />}
          variant={selectedCategory === -1 || selectedCategory === null ? 'filled' : 'outlined'}
          onClick={() => onSelectCategory(-1)}
          clickable
          sx={{
            borderRadius: '16px',
            fontWeight: 600,
            px: 1,
            transition: 'all 0.3s ease',
            ...(selectedCategory === -1 || selectedCategory === null ? {
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            } : {
              borderColor: alpha(theme.palette.primary.main, 0.5),
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.05)
              }
            })
          }}
        />
      )}
      
      {categories.map((category, index) => (
        <Chip
          key={index}
          label={category}
          variant={selectedCategory === index ? 'filled' : 'outlined'}
          onClick={() => handleCategoryClick(index)}
          clickable
          sx={{
            borderRadius: '16px',
            fontWeight: 600,
            px: 1,
            transition: 'all 0.3s ease',
            ...(selectedCategory === index ? {
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            } : {
              borderColor: alpha(theme.palette.primary.main, 0.5),
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.05)
              }
            })
          }}
        />
      ))}
    </Box>
  );

  return (
    <Stack spacing={2} sx={{ py: 2 }}>
      {/* Title with Filter Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FilterListIcon sx={{ color: theme.palette.primary.main }} />
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Category Options */}
      {variant === 'buttons' ? renderButtons() : renderChips()}

      {/* Selected Category Indicator */}
      {selectedCategory !== null && selectedCategory !== -1 && (
        <Typography 
          variant="body2" 
          sx={{ 
            color: theme.palette.text.secondary,
            fontStyle: 'italic',
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          Showing: {categories[selectedCategory]}
        </Typography>
      )}
    </Stack>
  );
};

export default CategoryFilter;