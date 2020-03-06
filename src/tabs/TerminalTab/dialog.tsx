import React from 'react';

import {TextField} from "@material-ui/core";

import DefaultDialog, {CustomizeDialogProps} from "../../common/DefaultDialog";


interface TerminalPasswordDialogReturnType {
  password: string;
}

export function TerminalPasswordDialog(props: CustomizeDialogProps<TerminalPasswordDialogReturnType>) {
  const [password, setPassword] = React.useState('');

  return (
    <DefaultDialog
      title="Provide a password"
      content="Please provide a password, which was issued on terminal creation."
      open={props.open}
      setOpen={props.setOpen}
      onSubmit={() => {
        props.onSubmit({password});
        props.setOpen(false);
        setPassword('');
      }}
    >
      <TextField
        fullWidth
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)} />
    </DefaultDialog>
  );
}
