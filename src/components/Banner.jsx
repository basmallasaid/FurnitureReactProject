import { Box } from '@mui/material';
import BannerBox from './BannerBoxCustom';

const PromotionGrid = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', md: 'row' }, 
      width: '100%', 
      m: 0, 
      p: 0, 
      overflow: 'hidden' 
    }}>
      <Box sx={{ 
        flex: { xs: 'none', md: '60%' }, 
        width: '100%', 
        height:'500px',
      }}>
        <BannerBox
          title="Fresh Finds for Every Room"
          linkText="Explore Now"
          bgImage="/box1.jpg"
          height={{ xs: '400px', md: '100%' }}
        />
      </Box>
      <Box sx={{ 
        flex: { xs: 'none', md: '40%' }, 
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <BannerBox 
          title="New Arrivals"
          linkText="Shop the Look"
          bgImage="/box2.jpg"
          height={{ xs: '300px', md: '100%' }}
          fontSize="1.8rem"
        />
        <BannerBox 
          title="Style Your Space"
          linkText="Explore"
          bgImage="/box3.jpg"
          height={{ xs: '300px', md: '100%' }}
          fontSize="1.8rem"
        />
      </Box>

    </Box>
  );
};

export default PromotionGrid;