import { Box, Typography, Container } from '@mui/material';
import Grid from '@mui/material/Grid'; 
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ShopByDepartment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const departments = [
    { title: t('cat_chairs'), img: 'c6.jpg', val: 'Chairs' }, 
    { title: t('cat_sofas'), img: 'product-5-1.jpg', val: 'Sofas & Sectionals' },
    { title: t('cat_tables'), img: 't1.jpg', val: 'Tables' },
    { title: t('cat_beds'), img: 'product-9-2.jpg', val: 'Beds' },
  ];

  return (
    <Container sx={{ py: 10 }}>
      <Typography 
        variant="h3" 
        sx={{ 
          mb: 8, 
          fontWeight: 400, 
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          color: '#111',
          textAlign: 'center',
          fontFamily: 'serif'
        }}
      >
        {t('shop_by_dept')}
      </Typography>

      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        {departments.map((item, index) => (
          <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
            <Box 
              onClick={() => navigate(`/products?category=${item.val}`)} 
              sx={{ 
                textAlign: 'center', 
                cursor: 'pointer',
                width: '100%',
                
                '&:hover img': { 
                  transform: 'scale(1.15)', 
                },
                '&:hover p': { 
                  color: '#a67c52', 
                  fontWeight: 600 
                } 
              }}
            >
              
              <Box
                sx={{
                  width: { xs: 150, md: 230 }, 
                  height: { xs: 150, md: 230 },
                  borderRadius: '50%',
                  overflow: 'hidden',
                  mx: 'auto',
                  mb: 3,
                  bgcolor: '#f9f9f9', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #f0f0f0',
                  transition: 'background-color 0.4s ease'
                }}
              >
                <Box
                  component="img"
                  src={item.img}
                  alt={item.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
                  }}
                />
              </Box>

              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '1rem', 
                  color: '#222', 
                  transition: '0.3s',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  fontWeight: 500
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShopByDepartment;