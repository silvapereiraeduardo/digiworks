import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import DashboardPage from './pages/dashboard-page';
import ConfigPage from './pages/config-page';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={DashboardPage} />
        <Route path="/config" component={ConfigPage} />
      </Switch>
    </BrowserRouter>
  );
}
