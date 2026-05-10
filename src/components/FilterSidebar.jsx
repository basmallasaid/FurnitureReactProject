import React, { useState } from 'react';
import { 
  Box, Typography, Slider, Checkbox, 
  FormControlLabel, Stack, Divider, IconButton 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FilterSidebar = ({ 
  priceRange, setPriceRange, 
  selectedCategory, setSelectedCategory 
}) => {

  return (
    <Stack spacing={4} sx={{ pr: { md: 2 } }}>
      
      {/* 1. Categories */}
      <FilterAccordion title="CATEGORIES">
        {['All', 'Sofas & Sectionals', 'Beds', 'Tables', 'Chairs', 'Storage', 'Outdoor Furniture'].map((cat) => (
          <Box 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`group cursor-pointer py-1.5 flex justify-between items-center transition-all ${selectedCategory === cat ? 'text-[#a67c52] font-bold' : 'text-gray-500 hover:text-black'}`}
          >
            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>{cat}</Typography>
            <Typography variant="caption" className="text-gray-400">[ 20 ]</Typography>
          </Box>
        ))}
      </FilterAccordion>

      <Divider />

      {/* 2. Availability */}
      <FilterAccordion title="AVAILABILITY">
        <FormControlLabel 
          control={<Checkbox size="small" defaultChecked sx={{ color: '#eee', '&.Mui-checked': { color: '#000' } }} />} 
          label={<Typography variant="body2" color="gray">In Stock [ 20 ]</Typography>} 
        />
        <FormControlLabel 
          control={<Checkbox size="small" sx={{ color: '#eee', '&.Mui-checked': { color: '#000' } }} />} 
          label={<Typography variant="body2" color="gray">Out of Stock [ 0 ]</Typography>} 
        />
      </FilterAccordion>

      <Divider />

      {/* 3. Price Slider */}
      <FilterAccordion title="PRICE">
        <Box sx={{ px: 1, pt: 2 }}>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={2000}
            sx={{ 
                color: '#EE5E33', // لون السلايدر البرتقالي اللي في الصورة
                height: 4,
                '& .MuiSlider-thumb': { width: 15, height: 15, bgcolor: '#EE5E33' }
            }}
          />
          <Box className="flex items-center gap-2 mt-4">
             <Typography variant="body2">Price:</Typography>
             <Box className="flex items-center border border-gray-100 p-1 px-3">
                <span className="text-xs text-gray-400 mr-1">$</span>
                <span className="text-sm">{priceRange[0]}</span>
             </Box>
             <span>—</span>
             <Box className="flex items-center border border-gray-100 p-1 px-3">
                <span className="text-xs text-gray-400 mr-1">$</span>
                <span className="text-sm">{priceRange[1]}</span>
             </Box>
          </Box>
        </Box>
      </FilterAccordion>

      <Divider />

      {/* 4. Material */}
      <FilterAccordion title="MATERIAL">
        {['Wood', 'Metal', 'Glass'].map((mat) => (
          <FormControlLabel key={mat} control={<Checkbox size="small" sx={{ color: '#eee', '&.Mui-checked': { color: '#000' } }} />} 
          label={<Typography variant="body2" color="gray">{mat} [ 20 ]</Typography>} />
        ))}
      </FilterAccordion>

    </Stack>
  );
};

// مكون فرعي للأكوردين (الفتح والقفل)
function FilterAccordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Box>
      <Box 
        className="flex justify-between items-center cursor-pointer mb-3" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: 1 }}>
          {title}
        </Typography>
        <IconButton size="small">
          {isOpen ? <RemoveIcon sx={{ fontSize: 16 }} /> : <AddIcon sx={{ fontSize: 16 }} />}
        </IconButton>
      </Box>
      {isOpen && <Stack spacing={0.5}>{children}</Stack>}
    </Box>
  );
}

export default FilterSidebar;