import React, { useContext, useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress, Grid, Breadcrumbs } from '@mui/material';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
export default function Products() {
  const { products, loading } = useContext(ProductContext);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let result = products;
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    result = result.filter(p => p.currentPrice >= priceRange[0] && p.currentPrice <= priceRange[1]);
    setFilteredProducts(result);
  }, [products, selectedCategory, priceRange]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}><CircularProgress color="inherit" /></Box>
  );

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      {/* Banner */}
      <Box className="bg-[#f6f5f3] py-16 text-center mb-10">
        <Typography variant="h3" sx={{ fontWeight: 500, fontFamily: 'serif', textAlign: 'center' ,marginBottom:5}}>
          Shop
        </Typography>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ '& .MuiBreadcrumbs-ol': { justifyContent: 'center' } }}
        >
          <Link to="/" className="text-gray-500 hover:text-black no-underline text-sm uppercase tracking-widest">
            Home
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', trackingWidest: '1px' }}>
            SHOP
          </Typography>
        </Breadcrumbs>
      </Box>

      <Container maxWidth="xl">
        <Grid container spacing={6}>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </Grid>

          {/* Products Main Area */}
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