import React, { useContext, useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress, Breadcrumbs } from '@mui/material';
import Grid from '@mui/material/Grid'; 
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 

export default function Products() {
  const { t } = useTranslation(); 
  const { products, loading } = useContext(ProductContext);

  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All'); 
  const [selectedRoom, setSelectedRoom] = useState('All'); 
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== 'All') result = result.filter(p => p.category === selectedCategory);
    if (selectedAvailability !== 'All') result = result.filter(p => p.availability === selectedAvailability);
    if (selectedMaterial !== 'All') result = result.filter(p => p.material === selectedMaterial); 
    if (selectedRoom !== 'All') result = result.filter(p => p.room === selectedRoom); 

    result = result.filter(p => p.currentPrice >= priceRange[0] && p.currentPrice <= priceRange[1]);

    setFilteredProducts(result);
  }, [products, selectedCategory, priceRange, selectedAvailability, selectedMaterial, selectedRoom]);

  const getCount = (key, value) => {
     if (value === 'All') return products.length;
     return products.filter(p => p[key] === value).length;
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}><CircularProgress color="inherit" /></Box>
  );

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      <Box className="bg-[#f6f5f3] py-16 text-center mb-10">
        <Typography variant="h3" sx={{ fontWeight: 500, fontFamily: 'serif', mb: 3 }}>
          {t('shop')} 
        </Typography>
        
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          sx={{ '& .MuiBreadcrumbs-ol': { justifyContent: 'center' } }}
        >
          <Link to="/" className="text-gray-500 hover:text-black no-underline text-sm uppercase tracking-widest">
            {t('home')} 
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', trackingWidest: '1px' }}>
            {t('shop')} 
          </Typography>
        </Breadcrumbs>
      </Box>

      <Container maxWidth="xl">
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 3 }}>
            <FilterSidebar
              priceRange={priceRange} setPriceRange={setPriceRange}
              selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
              selectedAvailability={selectedAvailability} setSelectedAvailability={setSelectedAvailability}
              selectedMaterial={selectedMaterial} setSelectedMaterial={setSelectedMaterial}
              selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom}
              getCount={getCount} 
            />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Grid container spacing={4}>
              {filteredProducts.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}