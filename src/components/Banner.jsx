import { Box } from '@mui/material';
import BannerBox from './BannerBoxCustom';
import { useTranslation } from "react-i18next";

const PromotionGrid = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '100%',
        m: 0,
        p: 0,
        overflow: 'hidden'
      }}
    >

      <Box
        sx={{
          flex: { xs: 'none', md: '60%' },
          width: '100%',
          height: '500px',
        }}
      >
        <BannerBox
          title={t("promotion.freshFinds")}
          linkText={t("promotion.exploreNow")}
          bgImage="/box1.jpg"
          height={{ xs: '400px', md: '100%' }}
        />
      </Box>

      <Box
        sx={{
          flex: { xs: 'none', md: '40%' },
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >

        <BannerBox
          title={t("promotion.newArrivals")}
          linkText={t("promotion.shopLook")}
          bgImage="/box2.jpg"
          height={{ xs: '300px', md: '100%' }}
          fontSize="1.8rem"
        />

        <BannerBox
          title={t("promotion.styleSpace")}
          linkText={t("promotion.explore")}
          bgImage="/box3.jpg"
          height={{ xs: '300px', md: '100%' }}
          fontSize="1.8rem"
        />

      </Box>

    </Box>
  );
};

export default PromotionGrid;