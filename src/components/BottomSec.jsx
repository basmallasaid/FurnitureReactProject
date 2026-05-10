import { Box, Typography, Button, Stack } from '@mui/material';

const BottomSec= () => {
  const gramImages = [
    { src: '/ins2.jpg', top: '5%', left: '5%', width: { xs: '30%', md: '22%' }, height: '320px' },
    { src: '/ins1.jpg', top: '15%', right: '0%', width: { xs: '35%', md: '25%' }, height: '400px' }, 
    { src: '/ins3.jpg', bottom: '10%', left: '2%', width: { xs: '20%', md: '12%' }, height: '200px' }, 
    { src: '/ins5.jpg', bottom: '2%', left: '20%', width: { xs: '25%', md: '15%' }, height: '280px' }, 
    { src: '/ins4.jpg', bottom: '5%', right: '10%', width: { xs: '30%', md: '18%' }, height: '250px' }, 
  ];

  return (
    <Box 
      sx={{
        display: { xs: 'none',md:'flex'},
        width: '100%',
        height: { xs: 'auto', md: '700px' }, 
        minHeight: '600px',
        bgcolor: '#f6f5f3', 
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        py: { xs: 20, md: 0 } 
      }}
    >
      <Stack 
  spacing={3} 
  sx={{ 
    display: 'flex',          
    justifyContent: 'center', 
    alignItems: 'center',     
    zIndex: 10, 
    textAlign: 'center' 
  }}
>
  <Typography
    variant="h2"
    sx={{
      fontSize: { xs: '2rem', md: '3.5rem' },
      fontWeight: 500,
      letterSpacing: '2px',
      color: '#222'
    }}
  >
    FOLLOW OUR GRAM
  </Typography>

  <Button
    variant="outlined"
    sx={{
      px: 6,
      py: 1.5,
      color: '#000',
      borderColor: 'rgba(0,0,0,0.3)',
      borderRadius: 0, 
      textTransform: 'lowercase',
      fontSize: '1.1rem',
      bgcolor: 'transparent',
      '&:hover': {
        borderColor: '#000',
        bgcolor: 'rgba(0,0,0,0.02)'
      }
    }}
  >
    @vinfur
  </Button>
</Stack>
  
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {gramImages.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img.src}
            sx={{
              position: 'absolute',
              top: img.top,
              left: img.left,
              right: img.right,
              bottom: img.bottom,
              width: img.width,
              height: img.height,
              objectFit: 'cover',
              zIndex: 1,
              transition: '0.4s ease',
              '&:hover': { transform: 'scale(1.02)', zIndex: 5 }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BottomSec;