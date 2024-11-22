import styled from "@emotion/styled";

export const Nav = styled.nav`
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[100]};

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 33px;
  }
`;
