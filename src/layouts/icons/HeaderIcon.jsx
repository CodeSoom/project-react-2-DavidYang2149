import styled from '@emotion/styled';

const HomeIcon = styled.img`
  width: 25px;
  height: 25px;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const UserIcon = styled.img`
  width: 25px;
  height: 25px;
  margin: 10px;
  cursor: pointer;

  @media screen and (min-width: 600px) {
    display: none;
  }
`;

export {
  HomeIcon,
  UserIcon,
};
