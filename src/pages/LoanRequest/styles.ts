import styled from "@emotion/styled";

export const Wrapper = styled.div`
  max-width: 958px;
  padding: 0 24px;
  margin: 50px auto;

  @media (max-width: 600px) {
    margin: 26px auto;
  }
`;

export const Form = styled.div`
  max-width: 458px;

  .MuiFormControl-root {
    margin-bottom: 24px;
  }

  p.MuiTypography-body2 {
    color: ${({ theme }) => theme.palette.grey[500]};
    margin-bottom: 8px;

    @media (max-width: 600px) {
      position: absolute;
      bottom: 106px;
      left: 0;
      padding: 0 24px;
    }
  }
`;

export const FormFooter = styled.footer`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 24px;
  text-align: center;

  button {
    max-width: 404px;
  }

  @media (min-width: 601px) {
    border-top: 1px solid ${({ theme }) => theme.palette.grey[300]};
  }
`;
