import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import HomeScreen from './screens/home';
import RegisterScreen from './screens/auth/register';
import LoginScreen from './screens/auth/login';
import NotesScreen from './screens/notes/index';
import UsersEditScreen from './screens/users/edit';

import PrivateRoute from './components/auth/private_router';
import PublicRoute from './components/auth/public_router';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute path='/' exact component={HomeScreen} />
      <PublicRoute path='/register' component={RegisterScreen} />
      <PublicRoute path='/login' component={LoginScreen} />
      <PrivateRoute path='/notes' component={NotesScreen} />
      <PrivateRoute path='/users/edit' component={UsersEditScreen} />
    </Switch>
  </BrowserRouter>
)

export default Routes;