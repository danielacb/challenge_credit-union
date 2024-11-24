import styled from "@emotion/styled";

export const ImageContainer = styled.div`
  width: 71px;
  height: 50px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
