import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import { ImageContainer } from "./styles";
import CardImage from "/card-image.jpeg";
import MoreVert from "../Icons/MoreVert";
import InfoItem from "../InfoItem";

export default function LoanCard() {
  return (
    <Card variant="outlined">
      <CardHeader title="Santander Consumer USA" subheader="$409/month" />

      <CardContent sx={{ paddingBottom: 0 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <ImageContainer>
            <img
              src={CardImage}
              alt="A 2019 Toyota Camry drives along a scenic road, with lush vineyards visible in the background"
            />
          </ImageContainer>

          <Box width="100%">
            <Typography variant="subtitle1">2017 Toyota Prius II</Typography>
            <Typography variant="caption">Estimated 65,000 mil</Typography>
          </Box>

          <IconButton aria-label="open menu" sx={{ mt: -1 }}>
            <MoreVert />
          </IconButton>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <InfoItem title="APR" value="2.49%" size="small" />
        <InfoItem
          title="Time remaining"
          value="85 mon"
          size="small"
          sx={{ mt: 1 }}
        />
      </CardContent>

      <CardActions>
        <Button fullWidth variant="contained">
          Start Saving
        </Button>
      </CardActions>
    </Card>
  );
}
