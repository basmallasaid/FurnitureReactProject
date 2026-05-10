import { Box, Typography, Link } from '@mui/material';

const BannerBox = ({ title, linkText, bgImage, height, fontSize }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: height,
        position: 'relative', 
        overflow: 'hidden',   
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${bgImage})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          transition: 'transform 0.6s ease',
          zIndex: 1,
          '&:hover': {
            transform: 'scale(1.1)',
          }
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 2, 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          p: { xs: 3, md: 5 },
          pointerEvents: 'none',
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 500, 
            mb: 1, 
            fontSize: fontSize || { xs: '1.5rem', md: '2.2rem' },
            textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
            color: '#fff'
          }}
        >
          {title}
        </Typography>
        
        <Link
          href="#"
          sx={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            width: 'fit-content',
            pb: 0.5,
            borderBottom: '1px solid #fff',
            pointerEvents: 'auto', 
            '&:hover': { opacity: 0.8 }
          }}
        >
          {linkText}
        </Link>
      </Box>
    </Box>
  );
};

export default BannerBox;