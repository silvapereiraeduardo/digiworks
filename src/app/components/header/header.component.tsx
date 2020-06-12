import React from 'react';
import { MainHeader, MainHeaderLogo, MainHeaderText, MainHeaderOptions, MainHeaderOptionsLink } from './header.styles';

type HeaderPropTypes = {
  title: string;
  hideMenu?: boolean;
}

const HeaderMenu = () => (
  <MainHeaderOptions>
    <li>
      <MainHeaderOptionsLink href="#">
        Configurações
      </MainHeaderOptionsLink>
    </li>
  </MainHeaderOptions>
);

const Header: React.FunctionComponent<HeaderPropTypes> = ({ title, hideMenu }) => (
  <MainHeader>
    <MainHeaderLogo>
      <img src="assets/images/digifred_avatar.png" alt="Logo Digifred" height="32"/>
    </MainHeaderLogo>
    <MainHeaderText><h2>{title}</h2></MainHeaderText>
    {hideMenu ? null : <HeaderMenu />}
  </MainHeader>
);

export default Header;
