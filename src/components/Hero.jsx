import { Box, Typography, Link, Stack } from '@mui/material';

import { useEffect, useState } from 'react';

const HeroSection = () => {
    const [index, setIndex] = useState(0);
    const imgurl = ["hero1.jpg", "hero2.jpg", "hero3.jpg"];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % imgurl.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [imgurl.length]);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                position: 'relative',
                backgroundImage: `url(/${imgurl[index]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: '#fff',
                transition: 'background-image 0.8s ease-in-out',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    bgcolor: 'rgba(0,0,0,0.2)',
                    zIndex: 1,
                }}
            />

            <Stack spacing={2} sx={{ zIndex: 2, px: 2 }}>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '2.5rem', md: '4rem' },
                        fontWeight: 500,
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        mb: 2,
                        textShadow: '2px 2px 10px rgba(0,0,0,0.3)'
                    }}
                >
                    FORM MEETS <br /> FUNCTION
                </Typography>

                <Typography
                    variant="body1"
                    sx={{  fontSize: { xs: '0.9rem', md: '1.1rem' },  fontWeight: 300, letterSpacing: '1px',  maxWidth: '550px', mx: 'auto', opacity: 0.9}}
                >
                    Clean silhouettes and calm tones for modern spaces.
                </Typography>

                <Link
                    href="#"
                    sx={{
                        color: '#fff',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        letterSpacing: '2px',
                        mt: 5,
                        display: 'inline-block',
                        position: 'relative',
                        paddingBottom: '8px',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '100%',
                            height: '1px',
                            bottom: 0,
                            left: 0,
                            backgroundColor: '#fff',
                        },
                        '&:hover': { opacity: 0.7 }
                    }}
                >
                    BROWSE THE COLLECTION
                </Link>
            </Stack>
            <Stack
                direction="row"
                spacing={2}
                
                sx={{
                    position: 'absolute',
                    bottom: '40px',
                    zIndex: 2,
                    alignItems: 'center'
                }}
            >
                {imgurl.map((_, i) => (
                    <Box
                        key={i}
                        onClick={() => setIndex(i)}
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            cursor: 'pointer',
                            bgcolor: i === index ? '#fff' : 'rgba(255,255,255,0.4)',
                            transition: 'all 0.3s ease',
                            outline: i === index ? '1px solid #fff' : '1px solid transparent',
                            outlineOffset: '4px',
                            transform: i === index ? 'scale(1.2)' : 'scale(1)',
                            '&:hover': {
                                bgcolor: '#fff'
                            }
                        }}
                    />
                ))}
            </Stack>

            
        </Box>
    );
};

export default HeroSection;