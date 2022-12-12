import styled from "styled-components";

export const Title = ({ children }) => {
  return <STitle>{children}</STitle>;
};

const STitle = styled.h1`
  color: black;
  text-align: center;
`;
