import React, { useContext } from 'react';
import { FavContext } from '../context/FavContext';
import { Container, Typography, Box, Button, Breadcrumbs, Stack } from '@mui/material';
import { Grid as Grid } from '@mui/material'; 
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useTranslation } from 'react-i18next'; 

export default function Favorites() {
  const { t } = useTranslation(); 
  const { fav } = useContext(FavContext);

  return (
    <Box sx={{ bgcolor: '#fdfdfd', minHeight: '80vh', pb: 10 }}>
      <Box className="bg-[#f6f5f3] py-16 mb-10 border-b border-gray-100">
        <Container maxWidth="xl">
          <Stack alignItems="center" justifyContent="center" spacing={1}>
            <Typography variant="h3" sx={{ fontWeight: 500, fontFamily: 'serif', textAlign: 'center' }}>
              {t('wishlist')} 
            </Typography>
            <Breadcrumbs 
              separator={<NavigateNextIcon fontSize="small" />} 
              aria-label="breadcrumb"
              sx={{ '& .MuiBreadcrumbs-ol': { justifyContent: 'center' } }}
            >
              <Link to="/" className="text-gray-500 hover:text-black no-underline text-sm uppercase tracking-widest">
                {t('home')} 
              </Link>
              <Typography color="text.primary" sx={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', trackingWidest: '1px' }}>
                {t('wishlist')}
              </Typography>
            </Breadcrumbs>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl">
        {fav.length === 0 ? (
       
          <Box className="flex flex-col items-center justify-center py-20 text-center">
            <Box className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-8">
              <FavoriteBorderIcon sx={{ fontSize: 40, color: '#d1d1d1' }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 500, mb: 2, fontFamily: 'serif' }}>
              {t('wishlist_empty_title')} 
            </Typography>
            <Typography variant="body1" sx={{ color: 'gray', mb: 6, maxWidth: '500px', lineHeight: 1.8 }}>
              {t('wishlist_empty_desc')}
            </Typography>

            <Button 
              component={Link} 
              to="/products"
              sx={{
                bgcolor: '#222',
                color: '#fff',
                px: 8,           
                py: 2,           
                borderRadius: 0, 
                fontSize: '1rem',
                fontWeight: 500,
                letterSpacing: '2px', 
                textTransform: 'uppercase',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#000',
                  boxShadow: 'none'
                }
              }}
            >
              {t('back_to_shopping')} 
            </Button>
          </Box>
        ) : (
          
          <Box>
            <Typography variant="body2" sx={{ mb: 5, color: 'gray', letterSpacing: 2, fontWeight: 500 }}>
              {t('showing')} {fav.length} {t('items')}
            </Typography>
            
            <Grid container spacing={4}>
              {fav.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Box className="animate-fadeIn">
                    <ProductCard product={product} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}