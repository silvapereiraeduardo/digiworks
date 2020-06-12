import styled from 'styled-components';

export const ButtonStyled = styled.button`
  -webkit-appearance: none;
  background-color: #fff;
  border-radius: 3px;
  font-family: "Open Sans", Arial, sans-serif;
  border: 2px solid #b51e27;
  padding: 7px 10px;
  position: relative;
  text-align: center;
  text-decoration: none;
  -moz-transition: all .1s;
  -o-transition: all .1s;
  -webkit-transition: all .1s;
  transition: all .1s;
  font-size: 11px;
  color: #b51e27;
  margin: 5px 0 0 0;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  display: inline-block;
  text-transform: uppercase;
  
  &:hover {
      -webkit-appearance: none;
      background-color: #b51e27;
      color: white;
  }
  
  &:disabled {
      opacity: 0.5;
  }
`;
