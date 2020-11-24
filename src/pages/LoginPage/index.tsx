import React from 'react';
import { makeStyles, Theme } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import DefaultDialog from "../../common/DefaultDialog";

import {inject, observer} from "mobx-react";

import {StoreType} from "../../store";
import AuthStore from "../../store/auth";

import Logo from "../../assets/logo.png";

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
  const [fDialog, setFDialog] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <>
      <DefaultDialog
        title="Login Failures"
        content="Failing... Failing... Failing..."
        open={fDialog}
        setOpen={setFDialog}
        onSubmit={() => {setFDialog(false)}}
      >
        <Typography variant="subtitle2">
          Keep failing, though you gave the right credentials, and server address?<br/>
          Requests could have been blocked due to self-signed certificate on API.<br/>
          Try access the API, allow the certificate, and try again.<br/><br/>

          I've made a link for you based on "WebPI API Address" :)<br/>
          <a href={host} rel="noopener noreferrer" target="_blank">{host}</a>
        </Typography>
      </DefaultDialog>

      <Container
        maxWidth="xs"
        className={classes.root}
      >
        <img
          alt="logo"
          src={Logo}
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
        <Button
          fullWidth
          color="secondary"
          onClick={() => setFDialog(true)}
        >
         Keep failing?
        </Button>
      </Container>
    </>
  );
};

export default inject('authStore')(observer(LoginPage));
