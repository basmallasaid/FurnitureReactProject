import { useContext, useState, useEffect } from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AddShoppingCart, FavoriteBorder, Favorite, SyncAlt, VisibilityOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FavContext } from '../context/FavContext';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const navigate = useNavigate();

  const [activeImg, setActiveImg] = useState(product?.variants?.[0]?.img || null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (product?.variants?.[0]?.img) {
      setActiveImg(product.variants[0].img);
    }
  }, [product]);

  const { fav, addFav } = useContext(FavContext);
  const isFav = fav?.some((item) => String(item.id) === String(product?.id));

  const { cartList, addCart } = useContext(CartContext);
  const isCart = cartList?.some((item) => String(item.id) === String(product?.id));

  if (!product) return null;

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 4, maxWidth: 270, mx: 'auto', position: 'relative' }}
    >
      <Box
        sx={{ position: 'relative', overflow: 'hidden', mb: 2, width: '100%', display: 'flex', justifyContent: 'center', cursor: 'pointer', bgcolor: '#f9f9f9', borderRadius: '4px', height: '280px' }}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {activeImg && (
          <Box
            component="img"
            src={activeImg}
            alt={product.name_en}
            sx={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply', transition: '0.8s ease', transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
          />
        )}

        <Stack
          spacing={1}
          sx={{ 
            position: 'absolute', 
            top: 15, 
            [isArabic ? 'left' : 'right']: isHovered ? 12 : -50, 
            opacity: isHovered ? 1 : 0, 
            transition: '0.4s ease-in-out', 
            zIndex: 10 
          }}
        >
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); addCart(product); }} sx={{ ...styleIcon, color: isCart ? '#a67c52' : '#333', bgcolor: isCart ? '#f6f5f3' : '#fff' }}>
            <AddShoppingCart sx={{ fontSize: '1.1rem' }} />
          </IconButton>
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); addFav(product); }} sx={styleIcon}>
            {isFav ? <Favorite sx={{ fontSize: '1.1rem', color: '#d32f2f' }} /> : <FavoriteBorder sx={{ fontSize: '1.1rem' }} />}
          </IconButton>
          <IconButton size="small" sx={styleIcon}><SyncAlt sx={{ fontSize: '1.1rem' }} /></IconButton>
          <IconButton onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }} size="small" sx={styleIcon}>
            <VisibilityOutlined sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        </Stack>
      </Box>

      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, fontSize: '0.95rem', color: '#222', cursor: 'pointer', '&:hover': { color: '#a67c52' } }} onClick={() => navigate(`/product/${product.id}`)}>
        {isArabic ? (product.name_ar || product.name_en) : product.name_en}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', alignItems: 'center', mb: 1.5 }}>
        {product?.oldPrice && (
          <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#999', fontSize: '0.8rem' }}> ${product.oldPrice} </Typography>
        )}
        <Typography variant="body2" sx={{ color: product?.oldPrice ? '#d32f2f' : '#333', fontWeight: 700, fontSize: '1rem' }}> ${product.currentPrice} </Typography>
      </Stack>

      <Stack direction="row" spacing={1.2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
        {product?.variants?.map((v, i) => (
          <Box key={i} onClick={() => { setActiveImg(v.img); setSelectedColor(i); }} sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: v.color, cursor: 'pointer', outline: selectedColor === i ? '1px solid #333' : 'none', outlineOffset: '2px', border: '1px solid rgba(0,0,0,0.1)', transition: '0.2s transform', '&:hover': { transform: 'scale(1.2)' } }} />
        ))}
      </Stack>
    </Box>
  );
};

const styleIcon = { bgcolor: '#fff', color: '#333', width: 34, height: 34, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', '&:hover': { bgcolor: '#000', color: '#fff', transform: 'translateY(-2px)' }, transition: '0.3s all' };
export default ProductCard;