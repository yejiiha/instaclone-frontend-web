import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.formColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.darkGray};
`;

export const FatText = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
`;
