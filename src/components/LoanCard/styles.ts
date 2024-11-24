import styled from "@emotion/styled";

export const ImageContainer = styled.div`
  position: relative;
  width: 71px;
  height: 50px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    transform: translate(-50%, -50%);
  }
`;
