import React from 'react';

import {createStyles, makeStyles} from "@material-ui/core/styles";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

import {inject, observer} from "mobx-react";
import RootStore, {StoreType} from "./store";

interface AppProps {
  [StoreType.ROOT_STORE]?: RootStore;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = makeStyles(() =>
  createStyles({
    backdrop: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      zIndex: 1,
    },
  })
);

const App: React.FC<AppProps> = (props) => {
  const classes = styles();

  return (
    <>
      {
        props.rootStore?.authStore.passedLogin ?
          <MainPage />
          :
          <LoginPage />
      }
      <Backdrop
        open={props.rootStore?.promisePending || false}
        className={classes.backdrop}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <Snackbar
        open={props.rootStore?.snackSuccessOpen || false}
        autoHideDuration={6000}
        onClose={() => props.rootStore?.setSnackSuccess(false)}>
        <Alert
          onClose={() => props.rootStore?.setSnackSuccess(false)}
          severity="success"
        >
          {props.rootStore?.snackSuccessMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={props.rootStore?.snackFailureOpen || false}
        autoHideDuration={6000}
        onClose={() => props.rootStore?.setSnackFailure(false)}
      >
        <Alert
          onClose={() => props.rootStore?.setSnackFailure(false)}
          severity="error">
          {props.rootStore?.snackFailureMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default inject(StoreType.ROOT_STORE)(observer(App));
