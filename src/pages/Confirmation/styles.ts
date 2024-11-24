import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const PageHeader = styled.header`
  ${({ theme }) => css`
    margin-top: 8px;
    padding: 32px 24px;
    color: ${theme.palette.lorem.gray["100"]};
    background-color: ${theme.palette.lorem.primary};

    .container {
      max-width: 910px;
      margin: 0 auto;
    }
  `}
`;

export const Content = styled.div`
  padding: 32px 24px 50px;
  color: ${({ theme }) => theme.palette.lorem.gray["700"]};

  .container {
    max-width: 910px;
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    padding-top: 18px;
  }
`;
