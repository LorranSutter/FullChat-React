import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import LoginAdmin from './pages/LoginAdmin';
import Admin from './pages/History';
import Rooms from './pages/Rooms';
import Chat from './pages/Chat';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/loginAdmin' component={LoginAdmin} />
        <Route path='/admin' component={Admin} />
        <Route path='/rooms' component={Rooms} />
        <Route path='/chat/:roomId' component={Chat} />
      </Switch>
    </BrowserRouter>
  );
}