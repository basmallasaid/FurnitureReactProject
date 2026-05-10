import { Box, Typography, Grid, Container } from '@mui/material';
const departments = [
  { title: 'New In', img: 'category1.png' }, 
  { title: 'Furniture', img: 'category2.png' },
  { title: 'Lighting', img: 'category3.png' },
  { title: 'Rugs', img: 'category4.png' },
  { title: 'Home Decor', img: 'category5.png' },
];

const ShopByDepartment = () => {
  return (
    <Container sx={{ py: 10 }}>
      <Typography 
        variant="h3" 
        align="center" 
        sx={{ 
          mb: 8, 
          fontWeight: 400, 
          fontSize: { xs: '2rem', md: '3.5rem' },
          color: '#111'
        }}
      >
        Shop By Department
      </Typography>
      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        {departments.map((item, index) => (
          <Grid key={index} xs={6} sm={4} md={2.4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box 
              sx={{ 
                textAlign: 'center', 
                cursor: 'pointer',
                width: '100%',
                '&:hover .circle-box': { transform: 'scale(1.1)' },
                '&:hover p': { fontWeight: 'bold' } 
              }}
            >
              <Box
                className="circle-box"
                sx={{
                  width: { xs: 120, md: 180 },
                  height: { xs: 120, md: 180 },
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  transition: '0.4s ease',
                  overflow: 'hidden'
                }}
              >
                <Box
                  component="img"
                  src={item.img}
                  alt={item.title}
                  sx={{
                    width: '90%',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '1rem', 
                  color: '#333', 
                  transition: '0.3s' 
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