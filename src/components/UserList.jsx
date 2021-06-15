import styled from 'styled-components';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserItem = styled.div`
  position: relative;
  margin-bottom: 30px;

  & .icon {
    margin-right: 20px;
    text-align: left;
  }

  && svg {
    max-width: 50%;
  }

  & .user-picture,
  & .username {
    display: inline;
  }

  @media only screen and (max-width: 600px) {
    && svg {
      margin-left: 50%;
      transform: translateX(-50%);
    }

    & .username {
      display: block;
      text-align: center;
    }

    .icon {
      margin-right: 0px;
      text-align: center;
    }
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
              <div className="user-picture"><FontAwesomeIcon icon={faUserTie} size="6x" className="icon" /></div>
              <div className="username">{ item?.userName }</div>
            </UserItem>
          );
        })
      }
    </Wrapper>
  );
};
