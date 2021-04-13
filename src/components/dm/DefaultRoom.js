import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlaneContainer = styled.div`
  border: 3px solid;
  padding: 15px;
  border-radius: 50%;
  svg {
    font-size: 40px;
  }
`;

const TitleText = styled.span`
  text-align: center;
  margin-top: 16px;
  font-size: 20px;
`;

const Text = styled.span`
  margin-top: 12px;
  font-weight: 600;
  font-size: 12px;
`;

const SendBtn = styled.button`
  padding: 5px 9px;
  margin-top: 24px;
  background-color: ${(props) => props.theme.blue};
  color: white;
  text-align: center;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:focus {
    border: none;
    outline: none;
  }
`;

function DefaultRoom() {
  return (
    <Wrapper>
      <PlaneContainer>
        <FontAwesomeIcon icon={faPaperPlane} />
      </PlaneContainer>
      <TitleText>Your Messages</TitleText>
      <Text>Send private photos and messages to a friend or group.</Text>
      <SendBtn>Send Message</SendBtn>
    </Wrapper>
  );
}

export default DefaultRoom;
