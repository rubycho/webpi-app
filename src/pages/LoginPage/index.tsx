import React from 'react';
import { makeStyles, Theme } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import {inject, observer} from "mobx-react";

import {StoreType} from "../../store";
import AuthStore from "../../store/auth";

interface LoginPageProps {
  [StoreType.AUTH_STORE]?: AuthStore,
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
}));

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const classes = useStyles();

  const [host, setHost] = React.useState('https://localhost:8080');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Container
      maxWidth="xs"
      className={classes.root}
    >
      <img
        alt="logo"
        src={require('../../assets/logo.png')}
      />

      <Typography variant="h4">
        Hello, Welcome to WebPI;
      </Typography>

      <TextField
        fullWidth
        type="text"
        label="WebPI API Address"
        value={host}
        onChange={(e) => setHost(e.target.value)}
      />
      <TextField
        fullWidth
        type="text"
        label="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        type="password"
        label="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        fullWidth
        onClick={() => props.authStore?.tryLogin(host, {username, password})}
      >
        Login
      </Button>
    </Container>
  );
};

export default inject('authStore')(observer(LoginPage));
