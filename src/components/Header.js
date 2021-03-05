import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.formColor};
  padding: 17px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Column = styled.div``;
const HTitle = styled.h1`
  font-size: 24px;
  font-family: "Pacifico", cursive;
`;
const Icon = styled.span`
  margin-left: 18px;
  cursor: pointer;
`;

function Header() {
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <HTitle>Jistagram</HTitle>
        </Column>
        <Column>
          <Icon>
            <FontAwesomeIcon icon={faHome} size="2x" />
          </Icon>
          <Icon>
            <FontAwesomeIcon icon={faCompass} size="2x" />
          </Icon>
          <Icon>
            <FontAwesomeIcon icon={faUser} size="2x" />
          </Icon>
        </Column>
      </Wrapper>
    </SHeader>
  );
}

export default Header;
