import { Typography, Grid, Container, CircularProgress, Box } from '@mui/material';
import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard'; 
import { useTranslation } from "react-i18next";
const FeaturedCollection = () => {
  const{t}=useTranslation();
  const { products, loading } = useContext(ProductContext);
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 10 }}>
      <Typography 
        variant="h3" 
        align="center" 
        sx={{ 
          mb: 8, 
          fontWeight: 500, 
          fontSize: { xs: '2rem', md: '3rem' } 
        }}
      >
        {t('FeaturedCollection')}
      </Typography>
      
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
  {products.map((product) => (
    <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
      <ProductCard product={product} />
    </Grid>
  ))}
</Grid>
    </Container>
  );
};

export default FeaturedCollection;