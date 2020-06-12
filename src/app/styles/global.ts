import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
	* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
	}
	
	/* BODY */
  body {
      font-family: "Open Sans", Arial, sans-serif;
      min-width: 650px;
      background-color: #232323;
  }
  
  /* SHELL */
  #main-content {
      padding: 10px;
      background-color: #ffffff;
      overflow: auto;
      max-height: 560px;
  }
  
  /* CORE */
  .hide {
      display: none !important;
  }
  
  .deny-margin-top {
      margin-top: 0px !important;
  }
  
  .deny-margin-bottom {
      margin-bottom: 0px !important;
  }
  
  .deny-margin-left {
      margin-left: 0px !important;
  }
  
  .deny-margin-right {
      margin-right: 0px !important;
  }
  
  .text-right {
      text-align: right !important;
  }
  
  .text-left {
      text-align: left !important;
  }
  
  .w-50 {
    width: 50%;
  }
  
  .w-100 {
    width: 100%;
  }
  
  .field {
      margin: 10px;
  }
  
  .field label {
      display: block;
      font-size: 1em;
      font-weight: bold;
      padding: 0 0 5px;
      text-align: center;
  }
  
  .field input {
      width: 100%;
      padding: 5px;
      border-radius: 3px;
      box-sizing: border-box;
      border: 1px solid #ddd;
  }
  
  .action-button-wrapper {
      margin-top: 10px;
  }

  .table-toggl-wrapper {
      margin-top: 10px;
  }
  
  table {
      width: 100%;
      border: 0;
      border-spacing: 0;
      color: #000000;
  }
  
  thead > tr {
      background: #343a40;
      color: #FFFFFF;
  }
  
  tr {
      height: 22px;
      background-color: #FFFFFF;
  }
  
  tbody tr:hover {
      background-color: rgba(0,0,0,.05);
  }
  
  td, th {
      padding: 5px;
      text-align: center;
  }
  
  td:nth-of-type(3) {
      text-align: left;
  }
  
  td > a {
      color: white;
      background-color: #0747A6;
      border-radius: 3px;
      white-space: nowrap;
      text-decoration: none;
      padding: 1px 2px;
      font-weight: bold;
  }
  
  /* OPTIONS */
  #main-content-options {
      padding: 10px;
      background-color: #FFFFFF;
      overflow: auto;
  }
  
  .field-options label {
      display: block;
      margin: 10px;
  }
  
  .line {
      margin-top: 10px;
  }
  
  #status {
      display: none;
      border-radius: 3px;
      color: white;
      background: #019c3f;
      margin: 5px 0;
      padding: 7px 10px;
      text-align: center;
  }
  
  .field label.options {
      text-align: left;
  }
  
  .header {
      color: #000000;
  }
`;
