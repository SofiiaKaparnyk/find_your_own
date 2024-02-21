import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import mapImg from "assets/map.png";
import waveImg from "assets/wave.svg";
// import Map from "./Map";
import { useTranslation } from "react-i18next";

const Hero: React.FC = () => {
    const { t } = useTranslation();
  return (
    <Container
      maxWidth="xl"
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        padding: 3,
        background: {
            xs: `linear-gradient(0deg, transparent 0%, #22346a 100%), url(${waveImg}) right 34vh / auto 40% no-repeat, url(${mapImg}) 50% 40vh / auto auto no-repeat`,
            md: `linear-gradient(0deg, transparent 0%, #22346a 100%), url(${waveImg}) right 34vh / auto no-repeat, url(${mapImg}) 50% 35vh / auto auto no-repeat`
        },
        isolation: "isolate",
      }}
    >
      <Box
        sx={{
          width: "60vw",
        marginInline: "auto",
          padding: 2,
        //   background: "#22346a",
          background: "transparent",
          borderRadius: "20px",
          color: "white",
        }}
      >
        <Typography variant="h3" mb={3} sx={{ textAlign: "center" }}>{t("hero.title")}</Typography>
        <Typography sx={{ fontSize: "18px", textAlign: "center" }}>{t("hero.description")}</Typography>
      </Box>
    </Container>
  );
};

export default Hero;
