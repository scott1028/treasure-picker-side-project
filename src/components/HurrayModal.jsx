import _ from 'lodash';
import styled from 'styled-components';
import { faUserTie, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  HorizontalStretch,
  Button,
  SectionTitle,
} from '../components';

const ModalWrapper = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalCurtain = styled.div`
  background-color: #666;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const ModalContent = styled.div`
  background-color: #fff;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 100px;
  margin-top: 15vh;
  min-height: 400px;
  border-radius: 3px;
  padding: 15px;

  @media only screen and (max-height: 860px) {
    margin-top: 30px;
    margin-top: 8vh;
  }

  @media only screen and (max-height: 820px) {
    margin-top: 50px;
    margin-top: 5vh;
  }

  @media only screen and (max-height: 620px) {
    margin-top: 25px;
    margin-top: 2vh;
  }

  @media only screen and (max-width: 720px) {    
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0px;
  }
`;

const Zoom = styled.div`
  zoom: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  padding-top: calc(5vh);
  padding-bottom: 15px;
  padding-bottom: calc(2vh);
`;

const UserNameWrapper = styled.div`
  text-align: center;
  padding-top: 5px;
  padding-bottom: 50px;
  font-size: 3em;
  font-weight: 900;
`;

const AvatarWrapper = styled.div`
  background-color: #31B6A3;
  padding: 10px;
  padding-left: 25px;
  padding-right: 25px;
`;

const Wrapper = styled.div`
`;

export const HurrayModal = ({ onClosed, user }) => {
  return (
    <ModalWrapper>
      <ModalCurtain />
      <ModalContent>
        <Button className="float-right cross-btn" onClick={onClosed}>
          <FontAwesomeIcon icon={faTimes} size="2x" className="icon" />
        </Button>
        <Wrapper>
          <SectionTitle>抽獎結果</SectionTitle>
          <Zoom>
            <AvatarWrapper style={{
              color: user?.color,
              /*backdropFilter: user?.color, filter: 'invert(100%)'*/
              }}>
              <FontAwesomeIcon icon={faUserTie} size="10x" className="icon" />
            </AvatarWrapper>
          </Zoom>
          <UserNameWrapper>{user?.userName}</UserNameWrapper>
        </Wrapper>
      </ModalContent>
    </ModalWrapper>
  );
};
