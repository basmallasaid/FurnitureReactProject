import { useContext, useState } from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';
import { FavContext } from '../context/FavContext';

const ProductCard = ({ product }) => {
  const [activeImg, setActiveImg] = useState(product.variants[0].img);
  const [selectedColor, setSelectedColor] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const{fav,addFav}=useContext(FavContext);
  const isFav = fav.some((item) => item.id === product.id);

  return (
    <Box 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ 
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', mb: 4, maxWidth: 270, mx: 'auto'
      }}
    >
      <Box sx={{ 
        position: 'relative', overflow: 'hidden', 
        mb: 2, width: '100%', display: 'flex', justifyContent: 'center',
        cursor: 'pointer'
      }}
      
      >
        <Box 
          component="img" 
          src={activeImg} 
          sx={{ 
            width: '100%', height: '280px', objectFit: 'contain', 
            transition: '0.5s ease', transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
          onClick={() => navigate(`/product/${product.id}`)} 
        />
        
        <Stack 
          spacing={0.8}
          sx={{ 
            position: 'absolute', top: 15, right: isHovered ? 12 : -40,
            opacity: isHovered ? 1 : 0, transition: '0.3s ease-in-out'
          }}
        >
          <IconButton size="small" sx={styleIcon}><AddShoppingCartIcon sx={{ fontSize: '1.1rem' }} /></IconButton>
          <IconButton size="small"
           onClick={(e)=>{ e.stopPropagation(); addFav(product)}}
           sx={styleIcon}>
          { isFav ?<FavoriteIcon sx={{fontSize: "1.1rem", color: "red",}}/>
          :<FavoriteBorderIcon sx={{ fontSize: "1.1rem",}} />}
          </IconButton>
          <IconButton size="small" sx={styleIcon}><SyncAltIcon sx={{ fontSize: '1.1rem' }} /></IconButton>
          <IconButton 
            onClick={(e) => {
              e.stopPropagation(); 
              navigate(`/product/${product.id}`);
            }}
            size="small" 
            sx={styleIcon}
          >
            <VisibilityOutlinedIcon sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        </Stack>
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5, fontSize: '0.95rem' }}>
        {product.name}
      </Typography>
      <Stack 
        direction="row" 
        spacing={1} 
        sx={{ justifyContent: 'center', alignItems: 'center', mb: 1.5 }}
      >
        {product.oldPrice && (
          <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#999' }}>
            ${product.oldPrice.toFixed(2)}
          </Typography>
        )}
        <Typography variant="body2" sx={{ color: product.oldPrice ? '#d32f2f' : '#333', fontWeight: 'bold' }}>
           ${product.currentPrice.toFixed(2)}
        </Typography>
      </Stack>
      <Stack 
        direction="row" 
        spacing={1.2} 
        sx={{ justifyContent: 'center' }}
      >
        {product.variants.map((v, i) => (
          <Box
            key={i}
            onClick={() => { setActiveImg(v.img); setSelectedColor(i); }}
            sx={{
              width: 14, height: 14, borderRadius: '50%', bgcolor: v.color, cursor: 'pointer',
              outline: selectedColor === i ? '1px solid #333' : 'none',
              outlineOffset: '2px', transition: '0.2s', border: '1px solid rgba(0,0,0,0.1)'
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

const styleIcon = { 
  bgcolor: '#fff', color: '#333', width: 32, height: 32, boxShadow: 1,
  '&:hover': { bgcolor: '#000', color: '#fff' }
};

export default ProductCard;