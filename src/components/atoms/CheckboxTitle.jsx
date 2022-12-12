import styled from "styled-components"

export const CheckboxTitle = ({ children }) => {
  return (
    <SCheckboxTitle>{ children }</SCheckboxTitle>
  )
}

const SCheckboxTitle = styled.h2`
    color: black;
`;
