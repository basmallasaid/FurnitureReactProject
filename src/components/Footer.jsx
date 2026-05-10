import {
  Box,
  Container,
  Typography,
  Stack,
  Link,
  IconButton,
  Button,
  Divider,
  InputBase
} from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
import NorthEastIcon from '@mui/icons-material/NorthEast';

import { useTranslation } from "react-i18next";

const Footer = () => {

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        pt: 10,
        pb: 4,
        borderTop: '1px solid #eee'
      }}
    >
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

          {/* Left */}
          <Box sx={{ flex: 1.5, minWidth: '250px' }}>

            <Box
              component="img"
              src="/logo.png"
              alt="logo"
              sx={{
                width: 100,
                height: 'auto',
                mb: 3,
                objectFit: 'contain'
              }}
            />

            <Stack spacing={1.5} sx={{ color: '#666', mb: 4 }}>

              <Typography variant="body2">
                {t("footer.findLocation")}
              </Typography>

              <Link
                href="#"
                sx={{
                  color: '#666',
                  textDecoration: 'none',
                  '&:hover': { color: '#000' }
                }}
              >
                {t("footer.seeStores")}
              </Link>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: '#333'
                }}
              >
                (64) 8344 1233
              </Typography>

              <Typography variant="body2">
                hello@ecomposer.com
              </Typography>

            </Stack>

            <Stack direction="row" spacing={1.5}>

              {[FacebookIcon, InstagramIcon, XIcon, InstagramIcon, PinterestIcon].map((Icon, index) => (

                <IconButton
                  key={index}
                  sx={{
                    bgcolor: '#f5f5f5',
                    color: '#000',
                    width: 40,
                    height: 40,

                    '&:hover': {
                      bgcolor: '#000',
                      color: '#fff'
                    }
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>

              ))}

            </Stack>

          </Box>

          {/* Quick Links */}
          <Box sx={{ flex: 1 }}>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 3,
                letterSpacing: 1
              }}
            >
              {t("footer.quickLink")}
            </Typography>

            <Stack spacing={2}>

              {[
                t("footer.ourStory"),
                t("footer.visitStore"),
                t("footer.contactUs"),
                t("footer.account")
              ].map((item) => (

                <Link
                  key={item}
                  href="#"
                  sx={{
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: '0.9rem',

                    '&:hover': {
                      color: '#000'
                    }
                  }}
                >
                  {item}
                </Link>

              ))}

            </Stack>

          </Box>

          {/* Social */}
          <Box sx={{ flex: 1 }}>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 3,
                letterSpacing: 1
              }}
            >
              {t("footer.connectUs")}
            </Typography>

            <Stack spacing={2}>

              {[
                t("footer.facebook"),
                t("footer.instagram"),
                t("footer.tiktok"),
                t("footer.pinterest")
              ].map((item) => (

                <Link
                  key={item}
                  href="#"
                  sx={{
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: '0.9rem',

                    '&:hover': {
                      color: '#000'
                    }
                  }}
                >
                  {item}
                </Link>

              ))}

            </Stack>

          </Box>

          {/* Newsletter */}
          <Box sx={{ flex: 2, minWidth: { md: '350px' } }}>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 3,
                letterSpacing: 1
              }}
            >
              {t("footer.newsletter")}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: '#666',
                mb: 3,
                lineHeight: 1.8
              }}
            >
              {t("footer.newsletterText")}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                border: '1px solid #ddd',
                overflow: 'hidden',
                bgcolor: '#fff'
              }}
            >

              <InputBase
                placeholder={t("footer.emailPlaceholder")}
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
                  bgcolor: '#222',
                  color: '#fff',
                  borderRadius: 0,
                  px: 4,
                  textTransform: 'none',
                  fontWeight: 600,

                  '&:hover': {
                    bgcolor: '#000'
                  }
                }}
              >
                {t("footer.submit")}
              </Button>

            </Box>

          </Box>

        </Box>

        <Divider sx={{ mb: 4, opacity: 0.5 }} />

        {/* Bottom */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >

          <Typography
            variant="body2"
            sx={{ color: '#666' }}
          >
            {t("footer.rights")}
          </Typography>

          <Stack direction="row" spacing={3}>

            <Link
              href="#"
              sx={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 500
              }}
            >
              {t("footer.terms")}
            </Link>

            <Link
              href="#"
              sx={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 500
              }}
            >
              {t("footer.privacy")}
            </Link>

          </Stack>

        </Box>

      </Container>
    </Box>
  );
};

export default Footer;