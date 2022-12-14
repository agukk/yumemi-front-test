import styled from "styled-components";

export const CheckboxTitle = ({ children }) => {
  return <SCheckboxTitle>{children}</SCheckboxTitle>;
};

const SCheckboxTitle = styled.h2`
  font-size: clamp(0.5rem, 2vw + 1rem, 1.5rem);
  margin: 1.5% 0 1.5% 1.5%;
`;
