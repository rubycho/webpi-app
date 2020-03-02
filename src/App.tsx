import React from 'react';

import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

import {inject, observer} from "mobx-react";
import RootStore, {StoreType} from "./store";

interface AppProps {
  [StoreType.ROOT_STORE]?: RootStore;
}

const App: React.FC<AppProps> = (props) => {
  return (
    <>
      {
        props.rootStore?.authStore.passedLogin ?
          <MainPage />
          :
          <LoginPage />
      }
    </>
  );
};

export default inject(StoreType.ROOT_STORE)(observer(App));
