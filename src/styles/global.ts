import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
	}
	
	body {
    font-family: "Open Sans", Arial, sans-serif;
    min-width: 650px;
    background-color: #232323;
  }
`;
