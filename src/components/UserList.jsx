import styled from 'styled-components';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserItem = styled.div`
  margin-bottom: 30px;

  & .icon {
    margin-right: 20px;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
`;

export const UserList = ({ users }) => {
  return (
    <Wrapper>
      {
        users.map(item => {
          return (
            <UserItem key={item?.id} style={{ color: item?.color }}>
              <FontAwesomeIcon icon={faUserTie} size="6x" className="icon" />
              { item?.userName }
            </UserItem>
          );
        })
      }
    </Wrapper>
  );
};
