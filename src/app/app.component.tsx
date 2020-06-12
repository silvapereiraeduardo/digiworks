import React from 'react';
import GlobalStyled from './styles/global';
import Routes from './app.routes';
import {BrowserRouter} from 'react-router-dom';

const AppProviders: React.FunctionComponent = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

const AppComponent = () => {
  return (
    <AppProviders>
      <div className="App">
        <GlobalStyled/>
        <div id="main-content">
          <Routes />
        </div>
      </div>
    </AppProviders>
  );
}

export default AppComponent;
