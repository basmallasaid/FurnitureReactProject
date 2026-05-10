import { useState, useContext } from 'react';
import {
  AppBar, Toolbar, Button, IconButton, Badge, Box, 
  Container, Menu, MenuItem, Stack
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { FavContext } from '../context/FavContext';
// import { CartContext } from '../context/CartContext'; 

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation(); 
  const { count } = useContext(FavContext); 

  const [pagesAnchor, setPagesAnchor] = useState(null);
  const [langAnchor, setLangAnchor] = useState(null);

  const handlePagesOpen = (event) => setPagesAnchor(event.currentTarget);
  const handlePagesClose = () => setPagesAnchor(null);

  const handleLangOpen = (event) => setLangAnchor(event.currentTarget);
  const handleLangClose = () => setLangAnchor(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleLangClose();
  };

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('shop'), path: '/products' },
    { name: t('pages'), path: '#', hasMenu: true },
    { name: t('blogs'), path: '/blogs' },
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
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              const isSubActive = item.hasMenu && (location.pathname === '/about' || location.pathname === '/contact');

              return (
                <Box key={item.name}>
                  <Button
                    component={item.hasMenu ? 'button' : Link}
                    to={item.hasMenu ? undefined : item.path}
                    onClick={item.hasMenu ? handlePagesOpen : undefined}
                    endIcon={item.hasMenu && <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      color: (isActive || isSubActive) ? '#a67c52' : '#000', 
                      fontWeight: 600,
                      fontSize: '14px',
                      borderRadius: 0,
                      px: 1.5,
                      minWidth: 'auto',
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
              anchorEl={pagesAnchor} 
              open={Boolean(pagesAnchor)} 
              onClose={handlePagesClose} 
              elevation={2}
              sx={{ '& .MuiPaper-root': { width: 180, mt: 1, borderRadius: 0 } }}
            >
              <MenuItem component={Link} to="/about" onClick={handlePagesClose} sx={{ fontSize: '13px', fontWeight: 500 }}>
                {t('about')}
              </MenuItem>
              <MenuItem component={Link} to="/contact" onClick={handlePagesClose} sx={{ fontSize: '13px', fontWeight: 500 }}>
                {t('contact')}
              </MenuItem>
            </Menu>
          </Box>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <Box>
              <Button
                onClick={handleLangOpen}
                sx={{ 
                  color: '#000', 
                  fontWeight: 600, 
                  fontSize: '13px',
                  textTransform: 'none',
                  minWidth: 'auto',
                  px: 1
                }}
              >
                {i18n.language === 'ar' ? 'العربية' : 'EN'}
              </Button>
              <Menu
                anchorEl={langAnchor}
                open={Boolean(langAnchor)}
                onClose={handleLangClose}
                elevation={2}
                sx={{ '& .MuiPaper-root': { borderRadius: 0, mt: 1 } }}
              >
                <MenuItem onClick={() => changeLanguage('en')} sx={{ fontSize: '13px' }}>English</MenuItem>
                <MenuItem onClick={() => changeLanguage('ar')} sx={{ fontSize: '13px' }}>العربية</MenuItem>
              </Menu>
            </Box>

            <IconButton color="inherit" size="small">
              <SearchIcon sx={{ fontSize: 22 }} />
            </IconButton>

            <IconButton component={Link} to="/login" color="inherit" size="small">
              <PersonOutlineOutlinedIcon sx={{ fontSize: 24, color: location.pathname === '/login' ? '#a67c52' : 'inherit' }} />
            </IconButton>

            <IconButton component={Link} to="/favorites" color="inherit" size="small">
              <Badge badgeContent={count} color="error" sx={{ '& .MuiBadge-badge': { backgroundColor: '#c62828', fontSize: 10 } }}>
                <FavoriteBorderIcon sx={{ fontSize: 22, color: location.pathname === '/favorites' ? '#a67c52' : 'inherit' }} />
              </Badge>
            </IconButton>

            <IconButton component={Link} to="/cart" color="inherit" size="small">
              <Badge 
                badgeContent={0} 
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