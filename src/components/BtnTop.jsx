import { IconButton } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
export default function BtnTop() {
  return (
    <>
    <IconButton
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                sx={{
                    position: 'absolute',
                    right: '30px',
                    bottom: '30px',
                    bgcolor: '#fff',
                    color: '#333',
                    zIndex: 2,
                    '&:hover': { bgcolor: '#f5f5f5', transform: 'translateY(-3px)' },
                    transition: '0.3s',
                    width: 45,
                    height: 45
                }}
            >
                <KeyboardArrowUpIcon />
       </IconButton>
    </>
  )
}
