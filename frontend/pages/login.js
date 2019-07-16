import React, { useState } from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Base from '../components/Base';

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
        name
      }
    }
  }
`;

const Login = () => {
  const [data, setData] = useState({ username: '', password: '' });

  const onChange = e => {
    if (e && e.target) {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const confirm = data => {
    if (data && data.login) {
      const { login } = data;
      localStorage.setItem('TOKEN', login.token);
    }
  };

  return (
    <Base title="Log in">
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="box" style={{ width: '400px' }}>
          <h2>Login</h2>
          <input
            className="input"
            name="username"
            value={data.username}
            onChange={onChange}
            type="text"
            placeholder="Username"
          />
          <input
            className="input"
            name="password"
            value={data.password}
            onChange={onChange}
            type="password"
            placeholder="Password"
          />
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link href="/signup">
              <a>Sign up</a>
            </Link>
            <Mutation
              mutation={LOGIN_MUTATION}
              variables={data}
              onCompleted={confirm}
            >
              {mutation => (
                <button className="button" onClick={mutation}>
                  Log in
                </button>
              )}
            </Mutation>
          </div>
        </div>
      </div>
    </Base>
  );
};

Login.disableDashboard = true;

export default Login;