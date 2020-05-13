import React, { Fragment, useState } from 'react';
import { Column, Field, Label, Control, Input, Button, Help } from 'rbx';
import { Link, Redirect } from "react-router-dom";

import UsersService from '../../../services/users';

function RegisterForm () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await UsersService.register({ name: name, email: email, password: password });  
      setRedirectToLogin(true);
    } catch (error) {
      setError(true);
    }
  }

  if (redirectToLogin)
    return <Redirect to={{ pathname: '/login' }} />

  return (
    <Fragment>
        <Column.Group centered>
          <form onSubmit={handleSubmit}>
            <Column size={12}>
              <Field>
                <Label size="small">Name:</Label>
                <Control>
                  <Input 
                    type="name"
                    required
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </Control>
              </Field>
              <Field>
                <Label size="small">Email:</Label>
                <Control>
                  <Input 
                    type="email" 
                    required
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Control>
              </Field>
              <Field>
                <Label size="small">Password:</Label>
                <Control>
                  <Input 
                    type="password" 
                    required
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Column.Group breakpoint="mobile">
                    <Column>
                      <Link className="button is-white has-text-custom-purple" onClick={e => setRedirectToLogin(true)}>Login or</Link>
                    </Column>
                    <Column>
                      <Button color="custom-purple" outlined>Register</Button>
                    </Column>
                  </Column.Group>
                </Control>
              </Field>
              { error && <Help color="danger">Email or Password invalid</Help> }
            </Column>
          </form>
        </Column.Group>
    </Fragment>
  );
}

export default RegisterForm;