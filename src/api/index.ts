const headers = new Headers();
headers.append("Content-Type", "application/json");

const baseURL = "https://clutch-interview-service.herokuapp.com";

type LoanPurpose = "Debt Consolidation" | "Personal" | "API error";

type RequestOfferProps = {
  loanPurpose: LoanPurpose;
  amount: number;
  terms: number;
};

export type RequestOfferResponse = {
  id: string;
  monthlyPayments: number;
  apr: number;
};

export async function requestOffer({
  loanPurpose,
  amount,
  terms,
}: RequestOfferProps): Promise<RequestOfferResponse> {
  if (![12, 24, 36, 48].includes(terms)) throw new Error("Invalid Loan term");

  const response = await fetch(`${baseURL}/offers`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      loanPurpose,
      amount,
      terms,
    }),
  });

  return await response.json();
}
