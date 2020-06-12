import styled from 'styled-components';

export const TasksListStyled = styled.div`
  margin-top: 5px;

  .table-total {
      font-weight: bold;
  }
  
  .table-footer {
      font-weight: bold;
  }
  
  td.success {
      color: white;
      background-color: #019c3f;
      border-radius: 3px;
      white-space: nowrap;
      text-decoration: none;
      padding: 1px 2px;
      font-style: italic;
      text-align: center;
  }
  
  td.danger {
      color: white;
      background-color: #ef1717;
      border-radius: 3px;
      white-space: nowrap;
      text-decoration: none;
      padding: 1px 2px;
      font-style: italic;
      font-weight: bold;
      text-align: center;
  }
  
  td.warning {
      color: white;
      background-color: #F7941E;
      border-radius: 3px;
      white-space: nowrap;
      text-decoration: none;
      padding: 1px 2px;
      font-weight: bold;
      text-align: center;
  }
  
  .invalid-key {
      color: #000;
      font-style: italic;
      background: #ffb4b4;
  }
  
  .invalid-key:hover {
      background-color: #ef1717;
      color: #fff;
  }
  
  .already-logged {
      opacity: 0.5;
  }
`;

export const SelectAllLinkStyled = styled.a`
      color: #FFF;
      text-decoration: none;
`;
