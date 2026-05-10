import {
  Box, Container, Typography, Stack, Link,
  IconButton, TextField, Button, Divider, InputBase
} from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
import NorthEastIcon from '@mui/icons-material/NorthEast';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#fff', pt: 10, pb: 4, borderTop: '1px solid #eee' }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: { xs: 6, md: 4 },
            mb: 8
          }}
        >

          <Box sx={{ flex: 1.5, minWidth: '250px' }}>
            <Box component="img" src="/logo.png" alt="logo"
              sx={{ width: 100, height: 'auto', mb: 3, objectFit: 'contain' }}
            />
            <Stack spacing={1.5} sx={{ color: '#666', mb: 4 }}>
              <Typography variant="body2">Find a location nearest you.</Typography>
              <Link href="#" sx={{ color: '#666', textDecoration: 'none', '&:hover': { color: '#000' } }}>
                See Our Stores
              </Link>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                (64) 8344 1233
              </Typography>
              <Typography variant="body2">hello@ecomposer.com</Typography>
            </Stack>

            <Stack direction="row" spacing={1.5}>
              {[FacebookIcon, InstagramIcon, XIcon, InstagramIcon, PinterestIcon].map((Icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    bgcolor: '#f5f5f5', color: '#000', width: 40, height: 40,
                    '&:hover': { bgcolor: '#000', color: '#fff' }
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
            </Stack>
          </Box>


          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, letterSpacing: 1 }}>
              QUICK LINK
            </Typography>
            <Stack spacing={2}>
              {['Our Story', 'Visit Our Store', 'Contact Us', 'Account'].map((item) => (
                <Link
                  key={item} href="#"
                  sx={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', '&:hover': { color: '#000' } }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, letterSpacing: 1 }}>
              CONNECT US
            </Typography>
            <Stack spacing={2}>
              {['Facebook', 'Instagram', 'TikTok', 'Pinterest'].map((item) => (
                <Link
                  key={item} href="#"
                  sx={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', '&:hover': { color: '#000' } }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box sx={{ flex: 2, minWidth: { md: '350px' } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, letterSpacing: 1 }}>
              SUBSCRIBE TO NEWSLETTER
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3, lineHeight: 1.8 }}>
              Subcribe for 15% off your first order and unlock your inner potential with us.
            </Typography>

            <Box sx={{ display: 'flex', border: '1px solid #ddd', overflow: 'hidden', bgcolor: '#fff' }}>
              <InputBase
                placeholder="Enter Your Email"
                sx={{
                  ml: 2,
                  flex: 1,
                  fontSize: '0.9rem',
                  py: 1
                }}
              />
              <Button
                variant="contained"
                endIcon={<NorthEastIcon sx={{ fontSize: 14 }} />}
                sx={{
                  bgcolor: '#222', color: '#fff', borderRadius: 0, px: 4,
                  textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: '#000' }
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>

        </Box>

        <Divider sx={{ mb: 4, opacity: 0.5 }} />

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            All Rights Reserved 2026 Vinfur.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="#" sx={{ color: '#000', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>Terms</Link>
            <Link href="#" sx={{ color: '#000', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>Privacy</Link>
          </Stack>
        </Box>

      </Container>
    </Box>
  );
};

export default Footer;