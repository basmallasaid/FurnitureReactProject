import { useState, useContext } from 'react';
import {
  AppBar, Toolbar, Button, IconButton, Badge, Box, 
  Container, Menu, MenuItem, Stack
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { FavContext } from '../context/FavContext';

// import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const location = useLocation(); 
  // const { cartItems } = useContext(CartContext); 
  const{ count }=useContext(FavContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/products' },
    // { name: 'PRODUCTS', path: '/products' },
    { name: 'PAGES', path: '#', hasMenu: true },
    { name: 'BLOGS', path: '/blogs' },
  ];

  return (
    <AppBar position="sticky" elevation={0} color="inherit" sx={{ borderBottom: '1px solid #eee', bgcolor: '#fff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="img" src="/logo.png" alt="logo"
              sx={{ width: 80, height: 80, objectFit: 'contain' }}
            />
          </Box>

          {/* 2. Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              const isSubActive = item.hasMenu && (location.pathname === '/about' || location.pathname === '/contact');

              return (
                <Box key={item.name}>
                  <Button
                    component={item.hasMenu ? 'button' : Link}
                    to={item.hasMenu ? undefined : item.path}
                    onClick={item.hasMenu ? handleClick : undefined}
                    endIcon={item.hasMenu && <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      color: (isActive || isSubActive) ? '#a67c52' : '#000', 
                      fontWeight: 600,
                      fontSize: '14px',
                      borderRadius: 0,
                      px: 1.5,
                      minWidth: 'auto',
                      position: 'relative',
                      transition: '0.3s',
                      borderBottom: (isActive || isSubActive) ? '2px solid #a67c52' : '2px solid transparent',
                      '&:hover': { 
                        color: '#a67c52', 
                        bgcolor: 'transparent',
                        borderBottom: '2px solid #a67c52'
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                </Box>
              );
            })}

            
            <Menu 
              anchorEl={anchorEl} 
              open={open} 
              onClose={handleClose} 
              elevation={2}
              sx={{ '& .MuiPaper-root': { width: 180, mt: 1, borderRadius: 0 } }}
            >
              <MenuItem component={Link} to="/about" onClick={handleClose} sx={{ fontSize: '13px', fontWeight: 500 }}>
                About Us
              </MenuItem>
              <MenuItem component={Link} to="/contact" onClick={handleClose} sx={{ fontSize: '13px', fontWeight: 500 }}>
                Contact Us
              </MenuItem>
            </Menu>
          </Box>

          {/* 3. Icons Section */}
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            
            <IconButton color="inherit" size="small">
              <SearchIcon sx={{ fontSize: 22 }} />
            </IconButton>

           
            <IconButton component={Link} to="/login" color="inherit" size="small">
              <PersonOutlineOutlinedIcon sx={{ fontSize: 24, color: location.pathname === '/login' ? '#a67c52' : 'inherit' }} />
            </IconButton>

           
            <IconButton component={Link} to="/favorites" color="inherit" size="small">
              <Badge badgeContent={ count } color="error" sx={{ '& .MuiBadge-badge': { backgroundColor: '#c62828', fontSize: 10 } }}>
                <FavoriteBorderIcon sx={{ fontSize: 22, color: location.pathname === '/favorites' ? '#a67c52' : 'inherit' }} />
              </Badge>
            </IconButton>

            <IconButton component={Link} to="/cart" color="inherit" size="small">
              <Badge 
                // badgeContent={cartItems.length} 
                color="error" 
                sx={{ '& .MuiBadge-badge': { backgroundColor: '#c62828', fontSize: 10 } }}
              >
                <ShoppingBagOutlinedIcon sx={{ fontSize: 22, color: location.pathname === '/cart' ? '#a67c52' : 'inherit' }} />
              </Badge>
            </IconButton>
          </Stack>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;