import { Box, Typography } from '@mui/material';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const services = [
  {
    title: 'FAST & FREE DELIVERY',
    description: 'We offer free shipping with ground delivery worldwide',
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 45 }} />
  },
  {
    title: '30 DAYS RETURN',
    description: 'Exchange or return items free of charge within 30 days.',
    icon: <AssignmentReturnOutlinedIcon sx={{ fontSize: 45 }} />
  },
  {
    title: 'FLEXIBLE PAYMENT',
    description: 'Pay conveniently using multiple credit cards for added flexibility.',
    icon: <CreditCardOutlinedIcon sx={{ fontSize: 45 }} />
  },
  {
    title: 'ONLINE SUPPORT',
    description: 'Online Support 24 hours a day, 7 days a week.',
    icon: <HelpOutlineOutlinedIcon sx={{ fontSize: 45 }} />
  }
];

const Services = () => {
  return (
    <Box 
      sx={{ 
        width: '95%', 
        py: 10, 
        px: { xs: 2, md: 6 }, 
        bgcolor: '#fff',
        borderTop: '1px solid #eee'
      }}
    >
      
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          justifyContent: 'space-between',           
          alignItems: 'flex-start',
          gap: { xs: 6, md: 2 }                      
        }}
      >
        {services.map((service, index) => (
          <Box 
            key={index} 
            sx={{ 
              flex: 1,          
              maxWidth: { md: '280px' }, 
              textAlign: 'left'
            }}
          >

            <Box sx={{ mb: 2.5, color: '#222' }}>
              {service.icon}
            </Box>

            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: '0.95rem', 
                fontWeight: 600, 
                letterSpacing: '1.5px',
                mb: 1.5,
                color: '#000'
              }}
            >
              {service.title}
            </Typography>

            <Typography 
              variant="body2" 
              sx={{ 
                color: '#555', 
                lineHeight: 1.7,
                fontSize: '0.88rem',
                fontWeight: 300
              }}
            >
              {service.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Services;