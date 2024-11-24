import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form, FormFooter, Wrapper } from "./styles";
import InfoItem from "../../components/InfoItem";
import LoanRequestForm from "./LoanRequestForm";
import {
  RequestOfferResponse,
  requestOffer,
  submitApplication,
} from "../../api";
import { formatAmount, formatPercentage } from "../../utils";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const schema = z.object({
  loanPurpose: z
    .enum(["Debt Consolidation", "Personal", ""])
    .refine((value) => value !== "", {
      message: "Please select a Loan Purpose",
    }),
  amount: z.number({ message: "Total Loan Amount is required" }),
  loanTerm: z
    .number({ message: "Please select a Loan term" })
    .refine((value) => [12, 24, 36, 48].includes(value), {
      message: "Please select a valid loan term",
    }),
});

export type FormData = z.infer<typeof schema>;

export default function LoanRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setAPIError] = useState("");
  const [offer, setOffer] = useState<RequestOfferResponse>();

  const navigate = useNavigate();

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const formValues = watch();
  const { loanPurpose, amount, loanTerm } = formValues;

  useEffect(() => {
    async function fetchOffers() {
      setIsLoading(true);

      try {
        const offer = await requestOffer({
          loanPurpose,
          amount,
          terms: loanTerm,
        });

        setOffer(offer);
      } catch (error) {
        setAPIError("Unable to retrieve offers. Please try again shortly!");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isValid) fetchOffers();
  }, [isValid, loanPurpose, amount, loanTerm]);

  async function onSubmit() {
    setIsLoading(true);

    try {
      if (!offer?.id) throw new Error("Offer not found");

      const { userId } = await submitApplication({
        offerId: offer.id,
        loanPurpose,
        terms: loanTerm,
        amount,
      });

      navigate("/confirmation", { state: { userId } });
    } catch (error) {
      setAPIError("Unable to submit application. Please try again shortly!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Wrapper>
      <Typography variant="h1" marginBottom={6}>
        Loan Information
      </Typography>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <LoanRequestForm
          errors={errors}
          register={register}
          getValues={getValues}
          setValue={setValue}
        />

        <Typography variant="body2" sx={{ marginBottom: 2.5 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis
          dictum dignissim. In hac habitasse platea dictumst. Duis at efficitur
          dolor. Nulla id venenatis lectus, vitae laoreet magna. Etiam tincidunt
          ipsum sapien, sed convallis dui mollis eget. Vestibulum a cursus eros,
          et tempor odio. Integer ut lobortis metus. Curabitur elementum sapien
          auam. lobortis blandit iosum varius at.
        </Typography>

        {apiError ? (
          <Alert severity="error" sx={{ my: 4 }}>
            {apiError}
          </Alert>
        ) : isLoading ? (
          <Box sx={{ width: "100%", textAlign: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : offer ? (
          <>
            <InfoItem
              title="Monthly payment"
              value={`$${formatAmount(offer.monthlyPayments)}`}
              sx={{ marginTop: 2.5 }}
            />
            <Divider sx={{ marginY: 1 }} />
            <InfoItem title="APR" value={formatPercentage(offer.apr)} />
          </>
        ) : null}

        <FormFooter>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={!offer || isLoading}
          >
            Submit application
          </Button>
        </FormFooter>
      </Form>
    </Wrapper>
  );
}
