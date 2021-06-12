import _ from 'lodash';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
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
  margin-left: 50%;
  margin-right: 20%;
  margin-top: 100px;
  margin-top: 15vh;
  min-height: 200px;
  min-width: 400px;
  transform: translateX(-50%);
  border-radius: 3px;
  padding: 15px;
`;

const Wrapper = styled.div`
  text-align: center;
`;

export const AlertModal = ({ onClosed, message = '' }) => {
  return (
    <ModalWrapper>
      <ModalCurtain />
      <ModalContent>
        <Button className="float-right cross-btn" onClick={onClosed}>
          <FontAwesomeIcon icon={faTimes} size="2x" className="icon" />
        </Button>
        <Wrapper>
          <SectionTitle>輸入的數值無效</SectionTitle>
          { message }
        </Wrapper>
      </ModalContent>
    </ModalWrapper>
  );
};
