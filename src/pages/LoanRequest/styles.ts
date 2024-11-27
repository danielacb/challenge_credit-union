import styled from "@emotion/styled";

export const Wrapper = styled.div`
  max-width: 958px;
  padding: 0 24px 124px;
  margin: 50px auto;

  @media (max-width: 600px) {
    margin: 26px auto;
    padding-bottom: 245px;
  }
`;

export const Form = styled.form`
  max-width: 458px;

  .MuiFormControl-root {
    margin-bottom: 24px;
  }

  p.MuiTypography-body2 {
    color: ${({ theme }) => theme.palette.grey[500]};
    padding: 12px 0 8px;
    margin-bottom: 0;

    @media (max-width: 600px) {
      margin-bottom: 8px;
      z-index: 10;
      background-color: ${({ theme }) => theme.palette.lorem.gray[100]};
      position: fixed;
      bottom: 106px;
      left: 0;
      padding: 0 24px;
    }
  }
`;

export const FormFooter = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 24px;
  text-align: center;
  z-index: 10;
  background-color: ${({ theme }) => theme.palette.lorem.gray[100]};

  button {
    max-width: 404px;
  }

  @media (min-width: 601px) {
    border-top: 1px solid ${({ theme }) => theme.palette.grey[300]};
  }
`;
