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
import MoreVert from "../Icons/MoreVert";
import InfoItem from "../InfoItem";
import { LoanProps } from "../../api";
import { formatAmount, toTitleCase } from "../../utils";

export default function LoanCard({ loan }: { loan: LoanProps }) {
  const { automobile, apr, monthlyPayments, remainingMonths, balance, lender } =
    loan;

  const { imageSource, year, model, make } = automobile;
  const carTitle = `${year} ${toTitleCase(make)} ${toTitleCase(model)}`;

  return (
    <Card variant="outlined" sx={{ height: "100%" }} data-testid="loan-card">
      <CardHeader
        title={toTitleCase(lender)}
        subheader={`$${formatAmount(monthlyPayments)}/month`}
      />

      <CardContent sx={{ paddingBottom: 0 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <ImageContainer>
            <img src={imageSource} alt={carTitle} />
          </ImageContainer>

          <Box width="100%">
            <Typography variant="subtitle1">{carTitle}</Typography>
            <Typography variant="caption">
              Estimated {formatAmount(balance)} mil
            </Typography>
          </Box>

          <IconButton aria-label="open menu" sx={{ mt: -1 }}>
            <MoreVert />
          </IconButton>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <InfoItem title="APR" value={`${apr}%`} size="small" />
        <InfoItem
          title="Time remaining"
          value={`${remainingMonths} mon`}
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
