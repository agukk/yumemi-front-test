import styled from "styled-components";

export const Title = ({ children }) => {
  return <STitle>{children}</STitle>;
};

const STitle = styled.h1`
  font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
  text-align: center;
  background: linear-gradient(25deg, #fff, #f89174);
  padding: 15px 0;
`;
