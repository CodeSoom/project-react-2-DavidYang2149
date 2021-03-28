import styled from '@emotion/styled';

const HeaderNav = styled.nav`
display: flex;
justify-content: space-between;
background: #fff;
align-items: center;
padding: 10px;
`;

const HeaderTitle = styled.h1`
  color: #1f2a37;
  font-size: 2rem;
  font-weight: 800;
  font-family: sans-serif;
  padding-left: 20px;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const HeaderUser = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 10px;
`;

const HeaderButton = styled.button`
  color: #361d74;
  margin: 10px;
  padding: 5px 7px;
  font-size: 1.025rem;
  font-weight: 600;
  border-radius: 6px;
  border-color: #361d74;
  background: transparent;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const ButtonLines = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export {
  HeaderNav,
  HeaderTitle,
  HeaderUser,
  HeaderButton,
  ButtonLines,
};
