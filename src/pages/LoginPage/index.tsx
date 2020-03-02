import React from 'react';
import { makeStyles, Theme } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  return (
    <Container
      maxWidth="xs"
      className={classes.root}
    >
      <img src={require('../../assets/logo.png')} />

      <Typography variant="h4">
        Hello, Welcome to WebPI;
      </Typography>

      <TextField
        fullWidth
        type="text"
        label="username"
      />
      <TextField
        fullWidth
        type="password"
        label="password"
      />
      <Button fullWidth>
        Login
      </Button>
    </Container>
  );
}
