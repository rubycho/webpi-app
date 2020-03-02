import React from 'react';

import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import {Button} from "@material-ui/core";

export default function App() {
  const [login, setLogin] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setLogin(!login)}>
        Toggle
      </Button>

      {login ?
        <MainPage />
        :
        <LoginPage />
      }
    </div>
  );
}
