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

type SubmitApplicationProps = {
  offerId: string;
  loanPurpose: LoanPurpose;
  amount: number;
  terms: number;
};

export async function submitApplication({
  offerId,
  loanPurpose,
  amount,
  terms,
}: SubmitApplicationProps) {
  if (![12, 24, 36, 48].includes(terms)) throw new Error("Invalid Loan term");

  const response = await fetch(`${baseURL}/submissions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      offerId,
      loanPurpose,
      amount,
      terms,
    }),
  });

  return await response.json();
}

export type LoanProps = {
  id: string;
  lender: string;
  apr: string;
  balance: number;
  issueDate: string;
  monthlyPayments: number;
  originalAmount: number;
  originalMonths: number;
  remainingMonths: number;
  automobile: {
    isRefinanceable: boolean;
    id: string;
    vin: string;
    year: string;
    make: string;
    model: string;
    mileage: number;
    estimatedListPrice: null;
    registrationDate: string;
    state: null;
    imageSource: string;
  };
};

type LoanByUserResponse = {
  loansAvailable: LoanProps[];
};

export async function getLoansByUser(
  userId: string,
): Promise<LoanByUserResponse> {
  const response = await fetch(`${baseURL}/loans?userId=${userId}`, {
    method: "GET",
    headers,
  });

  return await response.json();
}
