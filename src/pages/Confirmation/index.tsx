import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid2,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";

import CheckIcon from "/check.svg";
import LoanCard from "../../components/LoanCard";
import { Content, PageHeader } from "./styles";
import { getLoansByUser, LoanProps } from "../../api";

export default function Confirmation() {
  const [loans, setLoans] = useState<LoanProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setAPIError] = useState("");
  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    setIsLoading(true);
    async function getLoans() {
      try {
        const loans = await getLoansByUser(userId);
        setLoans(loans.loansAvailable);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setAPIError("Unable to retrieve loans. Please try again shortly!");
      } finally {
        setIsLoading(false);
      }
    }

    if (userId) getLoans();
  }, [userId]);

  if (!userId) {
    // Display this message if the user accesses this page without filling out the loan request form.
    return (
      <>
        <PageHeader>
          <Typography variant="h1" mt={2} mb={4} align="center">
            It looks like you haven't completed the loan request yet.
          </Typography>
        </PageHeader>
        <Content>
          <Typography variant="body1" my={3}>
            Please go back to the form and submit your personal loan request to
            proceed with the confirmation.
          </Typography>
          <Button href="/" variant="contained">
            Go to the form
          </Button>
        </Content>
      </>
    );
  }

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

          {apiError ? (
            <Alert severity="error" sx={{ my: 4 }}>
              {apiError}
            </Alert>
          ) : isLoading ? (
            <Box sx={{ width: "100%", textAlign: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : loans.length ? (
            <Grid2 container spacing={2}>
              {loans?.map((loan) => (
                <Grid2 key={loan.id} size={{ xs: 12, sm: 6 }}>
                  <LoanCard loan={loan} />
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <Typography>No loans found</Typography>
          )}
        </div>
      </Content>
    </>
  );
}
