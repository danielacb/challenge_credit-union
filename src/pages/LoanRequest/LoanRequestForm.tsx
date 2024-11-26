import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { FormData } from ".";
import { loanPurposeOptions, loanTermOptions } from "./options";

type LoanRequestFormProps = {
  errors: FieldErrors<FormData>;
  register: UseFormRegister<FormData>;
  getValues: UseFormGetValues<FormData>;
  setValue: UseFormSetValue<FormData>;
};

export default function LoanRequestForm({
  errors,
  register,
  getValues,
  setValue,
}: LoanRequestFormProps) {
  return (
    <>
      <FormControl fullWidth error={!!errors.loanPurpose}>
        <InputLabel id="loan-purpose">Loan Purpose</InputLabel>
        <Select
          defaultValue=""
          labelId="loan-purpose"
          id="loan-purpose"
          label="Loan Purpose"
          error={!!errors.loanPurpose}
          {...register("loanPurpose")}
        >
          <MenuItem disabled value="">
            Select an option
          </MenuItem>
          {loanPurposeOptions.map((purpose) => (
            <MenuItem key={purpose} value={purpose}>
              {purpose}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.loanPurpose?.message}</FormHelperText>
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
        value={getValues("amount") || ""}
        onValueChange={(values) => {
          const { floatValue } = values;
          setValue("amount", floatValue || 0, { shouldValidate: true });
        }}
        error={!!errors.amount}
        helperText={errors.amount?.message}
      />

      <FormControl fullWidth error={!!errors.loanTerm}>
        <InputLabel id="loan-terms">{`Loan term (months)`}</InputLabel>
        <Select
          defaultValue=""
          labelId="loan-terms"
          id="loan-terms"
          label="Loan term (months)"
          error={!!errors.loanTerm}
          {...register("loanTerm", {
            setValueAs: (value) =>
              [12, 24, 36, 48].includes(value) ? value : undefined,
          })}
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
        <FormHelperText>{errors.loanTerm?.message}</FormHelperText>
      </FormControl>
    </>
  );
}
