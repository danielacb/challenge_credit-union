import { Chip, Grid2, Typography } from "@mui/material";
import { Content, PageHeader } from "./styles";

import CheckIcon from "/check.svg";
import LoanCard from "../../components/LoanCard";

export default function Confirmation() {
  return (
    <>
      <PageHeader>
        <div className="container">
          <img src={CheckIcon} alt="Icon check" />
          <Typography variant="h1" mt={2} mb={4}>
            Thank you!
          </Typography>
          <Typography variant="body1" mb={2} lineHeight={1.2} fontWeight={500}>
            A loan officer will reach out to you shortly. If you have any other
            questions please call us at (202) 555-0139.
          </Typography>
          <Typography variant="body1" lineHeight={1.2} fontWeight={500}>
            Want to speed up the process?
          </Typography>
        </div>
      </PageHeader>

      <Content>
        <div className="container">
          <Chip color="success" label="savings available" />
          <Typography variant="body1" my={3}>
            <strong>You could be saving money</strong> on your existing loans
          </Typography>

          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <LoanCard />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <LoanCard />
            </Grid2>
          </Grid2>
        </div>
      </Content>
    </>
  );
}
