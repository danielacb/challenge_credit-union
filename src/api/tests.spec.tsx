import { getLoansByUser, LoanProps, requestOffer, submitApplication } from ".";

const baseURL = "https://clutch-interview-service.herokuapp.com";

global.fetch = jest.fn();

describe("API functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("requestOffer", () => {
    it("should  send a POST request and return data", async () => {
      const mockResponse = { id: "123", monthlyPayments: 200, apr: 5 };
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const response = await requestOffer({
        loanPurpose: "Debt Consolidation",
        amount: 5000,
        terms: 24,
      });

      expect(fetch).toHaveBeenCalledWith(`${baseURL}/offers`, {
        method: "POST",
        headers: expect.any(Headers),
        body: JSON.stringify({
          loanPurpose: "Debt Consolidation",
          amount: 5000,
          terms: 24,
        }),
      });

      expect(response).toEqual(mockResponse);
    });

    it("should throw an error for invalid loan term", async () => {
      await expect(
        requestOffer({
          loanPurpose: "Debt Consolidation",
          amount: 5000,
          terms: 60, // Invalid term
        }),
      ).rejects.toThrow("Invalid Loan term");
    });
  });

  describe("submitApplication", () => {
    it("should send a POST request and return data", async () => {
      const mockResponse = { success: true };
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const response = await submitApplication({
        offerId: "123",
        loanPurpose: "Debt Consolidation",
        amount: 5000,
        terms: 24,
      });

      expect(fetch).toHaveBeenCalledWith(`${baseURL}/submissions`, {
        method: "POST",
        headers: expect.any(Headers),
        body: JSON.stringify({
          offerId: "123",
          loanPurpose: "Debt Consolidation",
          amount: 5000,
          terms: 24,
        }),
      });

      expect(response).toEqual(mockResponse);
    });

    it("should throw an error for invalid loan term", async () => {
      await expect(
        submitApplication({
          offerId: "123",
          loanPurpose: "Debt Consolidation",
          amount: 5000,
          terms: 60, // Invalid term
        }),
      ).rejects.toThrow("Invalid Loan term");
    });
  });

  describe("getLoansByUser", () => {
    it("should fetch loans and return data", async () => {
      const mockLoans: LoanProps[] = [
        {
          id: "1",
          lender: "Lender 1",
          apr: "5",
          balance: 1000,
          issueDate: "2020-01-01",
          monthlyPayments: 200,
          originalAmount: 5000,
          originalMonths: 24,
          remainingMonths: 12,
          automobile: {
            isRefinanceable: true,
            id: "123",
            vin: "1HGBH41JXMN109186",
            year: "2019",
            make: "Toyota",
            model: "Camry",
            mileage: 30000,
            estimatedListPrice: null,
            registrationDate: "2020-01-01",
            state: null,
            imageSource: "image.jpg",
          },
        },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ loansAvailable: mockLoans }),
      });

      const response = await getLoansByUser("user123");

      expect(fetch).toHaveBeenCalledWith(`${baseURL}/loans?userId=user123`, {
        method: "GET",
        headers: expect.any(Headers),
      });

      expect(response).toEqual({ loansAvailable: mockLoans });
    });
  });
});
