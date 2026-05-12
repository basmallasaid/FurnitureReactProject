import { useState, useContext } from 'react';
import { Badge, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// الأيقونات
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

// Context
import { FavContext } from '../context/FavContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { count } = useContext(FavContext);
  const { countCart } = useContext(CartContext);

  const [langAnchor, setLangAnchor] = useState(null);
  const [pagesAnchor, setPagesAnchor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangAnchor(null);
    setMobileOpen(false);
  };

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('shop'), path: '/products' },
    { name: t('pages'), path: '#', hasMenu: true },
    { name: t('blogs'), path: '/blogs' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          
          {/* 1. Mobile Menu Toggle - يظهر في الفون فقط */}
          <div className="md:hidden">
            <IconButton onClick={() => setMobileOpen(true)} color="inherit">
              <MenuIcon />
            </IconButton>
          </div>

          {/* 2. Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src="/logo.png" alt="logo" className="w-20 md:w-24 h-auto object-contain" />
          </Link>

          {/* 3. Desktop Navigation - يختفي في الفون */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.hasMenu ? (
                  <button
                    onClick={(e) => setPagesAnchor(e.currentTarget)}
                    className="flex items-center text-sm font-bold tracking-widest hover:text-[#a67c52] transition-colors uppercase"
                  >
                    {link.name} <KeyboardArrowDownIcon sx={{ fontSize: 16, ml: 0.5 }} />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 pb-1 border-b-2 
                      ${isActive(link.path) ? 'text-[#a67c52] border-[#a67c52]' : 'text-black border-transparent hover:text-[#a67c52]'}`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Menu for PAGES */}
            <Menu
              anchorEl={pagesAnchor}
              open={Boolean(pagesAnchor)}
              onClose={() => setPagesAnchor(null)}
              elevation={2}
              sx={{ '& .MuiPaper-root': { borderRadius: 0, mt: 1, minWidth: 150 } }}
            >
              <MenuItem onClick={() => setPagesAnchor(null)} component={Link} to="/about" className="text-sm uppercase font-bold">{t('about')}</MenuItem>
              <MenuItem onClick={() => setPagesAnchor(null)} component={Link} to="/contact" className="text-sm uppercase font-bold">{t('contact')}</MenuItem>
            </Menu>
          </div>

          {/* 4. Icons & Language */}
          <div className="flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
            
            {/* Language Switcher */}
            <button
              onClick={(e) => setLangAnchor(e.currentTarget)}
              className="text-xs md:text-sm font-bold hover:text-[#a67c52] px-2 transition-colors uppercase"
            >
              {i18n.language === 'ar' ? 'العربية' : 'EN'}
            </button>
            <Menu
              anchorEl={langAnchor}
              open={Boolean(langAnchor)}
              onClose={() => setLangAnchor(null)}
              sx={{ '& .MuiPaper-root': { borderRadius: 0 } }}
            >
              <MenuItem onClick={() => changeLanguage('en')} className="text-xs">English</MenuItem>
              <MenuItem onClick={() => changeLanguage('ar')} className="text-xs">العربية</MenuItem>
            </Menu>

            {/* Other Icons */}
            <IconButton color="inherit" className="hover:text-[#a67c52]"><SearchIcon sx={{ fontSize: { xs: 20, md: 24 } }} /></IconButton>
            
            <Link to="/login" className="hidden sm:block">
              <IconButton color="inherit" className="hover:text-[#a67c52]"><PersonOutlineOutlinedIcon sx={{ fontSize: { xs: 20, md: 24 } }} /></IconButton>
            </Link>

            <Link to="/favorites">
              <IconButton color="inherit" className="hover:text-[#a67c52]">
                <Badge badgeContent={count} color="error" sx={{ '& .MuiBadge-badge': { bgcolor: '#c62828', fontSize: 10 } }}>
                  <FavoriteBorderIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                </Badge>
              </IconButton>
            </Link>

            <Link to="/cart">
              <IconButton color="inherit" className="hover:text-[#a67c52]">
                <Badge badgeContent={countCart} color="error" sx={{ '& .MuiBadge-badge': { bgcolor: '#c62828', fontSize: 10 } }}>
                  <ShoppingBagOutlinedIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </div>
      </div>

      {/* --- Mobile Sidebar (Drawer) --- */}
      <Drawer
        anchor={i18n.language === 'ar' ? 'right' : 'left'}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ '& .MuiPaper-root': { width: '80%', maxWidth: 300 } }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-lg font-serif font-bold uppercase tracking-widest">Menu</span>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          
          <List className="space-y-4">
            {navLinks.map((link) => (
              <ListItem 
                key={link.name} 
                disablePadding
                component={Link} 
                to={link.path !== '#' ? link.path : undefined}
                onClick={() => link.path !== '#' && setMobileOpen(false)}
              >
                <ListItemText 
                  primary={link.name} 
                  primaryTypographyProps={{ 
                    sx: { 
                      fontWeight: isActive(link.path) ? 800 : 500, 
                      color: isActive(link.path) ? '#a67c52' : 'black',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      fontSize: '14px'
                    } 
                  }} 
                />
              </ListItem>
            ))}
          </List>

          <Divider className="my-6" />

          <div className="mt-auto">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">Language</p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <button onClick={() => changeLanguage('en')} className={`text-sm font-bold ${i18n.language === 'en' ? 'text-[#a67c52]' : ''}`}>English</button>
              <button onClick={() => changeLanguage('ar')} className={`text-sm font-bold ${i18n.language === 'ar' ? 'text-[#a67c52]' : ''}`}>العربية</button>
            </div>
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;