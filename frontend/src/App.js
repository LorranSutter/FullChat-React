import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Rooms from './pages/Rooms';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/rooms' component={Rooms} />
                {/* <Route path='/profile' component={Profile} />
                <Route path='/incidents/new' component={NewIncident} /> */}
      </Switch>
    </BrowserRouter>
  );
}