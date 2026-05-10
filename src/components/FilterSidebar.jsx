import React, { useState } from 'react';
import { Box, Typography, Slider, Checkbox, FormControlLabel, Stack, Divider, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const FilterSidebar = ({
    priceRange, setPriceRange, selectedCategory, setSelectedCategory,
    selectedAvailability, setSelectedAvailability, selectedMaterial, setSelectedMaterial,
    selectedRoom, setSelectedRoom, getCount
}) => {
    const { t, i18n } = useTranslation();
    const rooms = [
        { l: t('living_room'), v: 'Living Room' },
        { l: t('bedroom'), v: 'Bedroom' },
        { l: t('dining_room'), v: 'Dining Room' },
        { l: t('office'), v: 'Office' }
    ];
    const categories = [
        { label: t('all'), val: 'All' },
        { label: t('sofas'), val: 'Sofas & Sectionals' },
        { label: t('beds'), val: 'Beds' },
        { label: t('tables'), val: 'Tables' },
        { label: t('chairs'), val: 'Chairs' }
    ];
    const materials = [
        { l: t('wood'), v: 'Wood' },
        { l: t('metal'), v: 'Metal' },
        { l: t('glass'), v: 'Glass' }
    ];

    return (
        <Stack spacing={4} sx={{ pr: i18n.language === 'en' ? { md: 2 } : 0, pl: i18n.language === 'ar' ? { md: 2 } : 0 }}>

            {/* 1. Categories */}
            <FilterAccordion title={t('categories')}>
                {categories.map((cat) => (
                    <Box key={cat.val} onClick={() => setSelectedCategory(cat.val)}
                        className={`cursor-pointer py-1.5 flex justify-between items-center transition-all ${selectedCategory === cat.val ? 'text-[#a67c52] font-bold' : 'text-gray-500 hover:text-black'}`}
                    >
                        <Typography variant="body2">{cat.label}</Typography>
                        <Typography variant="caption">[{getCount('category', cat.val)}]</Typography>
                    </Box>
                ))}
            </FilterAccordion>

            <Divider />

            {/* 2. Availability */}
            <FilterAccordion title={t('availability')}>
                {[{ l: t('in_stock'), v: 'In Stock' }, { l: t('out_of_stock'), v: 'Out of Stock' }].map((item) => (
                    <FormControlLabel key={item.v}
                        control={<Checkbox size="small" checked={selectedAvailability === item.v} onChange={(e) => setSelectedAvailability(e.target.checked ? item.v : 'All')} sx={{ '&.Mui-checked': { color: '#000' } }} />}
                        label={<Box sx={{ display: 'flex', gap: 1 }}>
                            <Typography variant="body2">{item.l}</Typography>
                            <Typography variant="caption" color="gray">[{getCount('availability', item.v)}]</Typography>
                        </Box>}
                    />
                ))}
            </FilterAccordion>

            <Divider />

            {/* 3. Price */}
            <FilterAccordion title={t('price')}>
                <Box sx={{ px: 1, pt: 2 }}>
                    <Slider value={priceRange} onChange={(e, nv) => setPriceRange(nv)} min={0} max={2000} sx={{ color: '#EE5E33' }} />
                    <Typography variant="body2" sx={{ mt: 2 }}>{t('price')}: ${priceRange[0]} — ${priceRange[1]}</Typography>
                </Box>
            </FilterAccordion>

            <Divider />

            <FilterAccordion title={t('room')}>
                {rooms.map((room) => (
                    <Box key={room.v} onClick={() => setSelectedRoom(room.v)}
                        className={`cursor-pointer py-1 flex justify-between items-center ${selectedRoom === room.v ? 'text-[#a67c52] font-bold' : 'text-gray-500 hover:text-black'}`}
                    >
                        <Typography variant="body2">{room.l}</Typography>
                        <Typography variant="caption">[{getCount('room', room.v)}]</Typography>
                    </Box>
                ))}
            </FilterAccordion>

            <Divider />


            <FilterAccordion title={t('material')}>
                {materials.map((mat) => (
                    <FormControlLabel
                        key={mat.v}
                        control={
                            <Checkbox
                                size="small"
                                checked={selectedMaterial === mat.v}
                                onChange={(e) => setSelectedMaterial(e.target.checked ? mat.v : 'All')}
                                sx={{ '&.Mui-checked': { color: '#000' } }}
                            />
                        }
                        label={
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Typography variant="body2">{mat.l}</Typography>
                                <Typography variant="caption" color="gray">[{getCount('material', mat.v)}]</Typography>
                            </Box>
                        }
                    />
                ))}
            </FilterAccordion>

        </Stack>
    );
};

function FilterAccordion({ title, children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <Box>
            <Box className="flex justify-between items-center cursor-pointer mb-3" onClick={() => setIsOpen(!isOpen)}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{title}</Typography>
                <IconButton size="small">{isOpen ? <RemoveIcon sx={{ fontSize: 16 }} /> : <AddIcon sx={{ fontSize: 16 }} />}</IconButton>
            </Box>
            {isOpen && <Stack spacing={0.5}>{children}</Stack>}
        </Box>
    );
}

export default FilterSidebar;