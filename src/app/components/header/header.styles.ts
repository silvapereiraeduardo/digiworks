import styled from 'styled-components';

export const MainHeader = styled.div`
  height: 32px;
  position: relative;
  margin-top: 10px;
`;

export const MainHeaderLogo = styled.div`
  display: inline-block;
  height: 32px;
  float: left;
`;

export const MainHeaderText = styled.div`
  display: inline-block;
  height: 32px;
  float: left;
  color: #b51e27;
  
  h2 {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    font-size: 25.7px;
    margin-left: 15px;
  }
`;

export const MainHeaderOptions = styled.ul`
    float: right;
    list-style: none;
    margin: 0;
    padding: 9px 0;
`;

export const MainHeaderOptionsLink = styled.a`
    text-decoration: none;
    color: #000;
    cursor: pointer;
    font-style: italic;
`;
