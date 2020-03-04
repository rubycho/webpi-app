import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface CustomizeDialogProps<T> {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSubmit: (v: T) => void;
}

export interface DefaultDialogProps extends CustomizeDialogProps<any> {
  title: string;
  content: string;
}

export default function DefaultDialog(props: React.PropsWithChildren<DefaultDialogProps>) {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {props.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.content}
        </DialogContentText>
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={props.onSubmit}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
