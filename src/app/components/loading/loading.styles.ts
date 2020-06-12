import styled from 'styled-components';

export const LoadingDivStyled = styled.div`
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
  display: block;
`;

export const LoadingDivLogoStyled = styled.img`
  margin-bottom: 10px;
`;

export const LoadingBarStyled = styled.div`
  position: absolute;
  left: 50%;
  top: 100px;
  width: 115px;
  margin-left: -83px;
  color: #FFFFFF;
  padding: 10px;
  border-radius: 10px 10px 10px 10px;
  margin-top: 0;
  font-weight: bold;
  background-color: #111111;
  font-size: 10px;
  text-shadow: 0 1px 0 #252525;
  text-align: center;
  border-bottom: 1px solid #252525;
`;
