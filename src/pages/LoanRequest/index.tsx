import {
  Button,
  Divider,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { NumericFormat } from "react-number-format";

import { loanPurposeOptions, loanTermOptions } from "./options";
import { Form, FormFooter, Wrapper } from "./styles";

export default function LoanRequest() {
  return (
    <Wrapper>
      <Typography variant="h1" marginBottom={6}>
        Loan Information
      </Typography>

      <Form>
        <FormControl fullWidth>
          <InputLabel id="loan-purpose">Loan Purpose</InputLabel>
          <Select labelId="loan-purpose" id="loan-purpose" label="Loan Purpose">
            <MenuItem disabled value="">
              Select an option
            </MenuItem>
            {loanPurposeOptions.map((purpose) => (
              <MenuItem key={purpose} value={purpose}>
                {purpose}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <NumericFormat
          customInput={TextField}
          fullWidth
          id="outlined-basic"
          label="Total Loan Amount"
          variant="outlined"
          thousandSeparator=","
          decimalSeparator="."
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
        />

        <FormControl fullWidth>
          <InputLabel id="loan-terms">{`Loan term (months)`}</InputLabel>
          <Select
            labelId="loan-terms"
            id="loan-terms"
            label="Loan term (months)"
          >
            <MenuItem disabled value="">
              Select an option
            </MenuItem>
            {loanTermOptions.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis
          dictum dignissim. In hac habitasse platea dictumst. Duis at efficitur
          dolor. Nulla id venenatis lectus, vitae laoreet magna. Etiam tincidunt
          ipsum sapien, sed convallis dui mollis eget. Vestibulum a cursus eros,
          et tempor odio. Integer ut lobortis metus. Curabitur elementum sapien
          auam. lobortis blandit iosum varius at.
        </Typography>

        <Grid2 container sx={{ marginTop: 2.5 }}>
          <Grid2 size={6}>
            <Typography variant="body1">Monthly payment</Typography>
          </Grid2>
          <Grid2 size={6} sx={{ textAlign: "right" }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              $85
            </Typography>
          </Grid2>
        </Grid2>

        <Divider sx={{ marginY: 1 }} />

        <Grid2 container>
          <Grid2 size={6}>
            <Typography variant="body1">APR</Typography>
          </Grid2>
          <Grid2 size={6} sx={{ textAlign: "right" }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              2.49%
            </Typography>
          </Grid2>
        </Grid2>

        <FormFooter>
          <Button fullWidth type="submit" variant="contained">
            Submit application
          </Button>
        </FormFooter>
      </Form>
    </Wrapper>
  );
}
