import  { useState } from 'react';
import {
  AppBar, Toolbar, Button, IconButton, Badge, Box, 
  Container, Menu, MenuItem, Stack
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" elevation={0} color="inherit"  sx={{ borderBottom: '1px solid #eee' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box component="img" src="/logo.png"  alt="logo"
              sx={{ width: 100, height: 100, objectFit: 'contain' }}
            />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {['HOME', 'SHOP', 'PRODUCTS', 'PAGES', 'BLOGS'].map((item) => (
              <Button
                key={item}
                onClick={item === 'PAGES' ? handleClick : undefined}
                endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
                sx={{
                  color: '#000',
                  fontWeight: 600,
                  fontSize: '14px',
                  '&:hover': { color: '#a67c52', bgcolor: 'transparent' ,  borderBottom:'2px solid #a67c52'},
                  borderRadius: 0,
                  px: 1
                }}
              >
                {item}
              </Button>
            ))}
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}  elevation={2}
              sx={{ '& .MuiPaper-root': { width: 180, mt: 1 } }}
            >
              <MenuItem onClick={handleClose} sx={{ fontSize: '14px', py: 1.5 }}>About Us</MenuItem>
              <MenuItem onClick={handleClose} sx={{ fontSize: '14px', py: 1.5 }}>Contact Us</MenuItem>
            </Menu>
          </Box>
          <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
            <IconButton color="inherit" size="small">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" size="small">
              <PersonOutlineOutlinedIcon />
            </IconButton>
            <IconButton color="inherit" size="small">
              <Badge badgeContent={1} color="error" sx={{ '& .MuiBadge-badge': { backgroundColor: '#c62828', fontSize: 10 } }}>
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" size="small">
              <Badge badgeContent={1} color="error" sx={{ '& .MuiBadge-badge': { backgroundColor: '#c62828', fontSize: 10 } }}>
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          </Stack>

        </Toolbar>
      </Container>
    </AppBar>
   

  );
};

export default Navbar;