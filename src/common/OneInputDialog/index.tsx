import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface SimpleDialogProps {
  title: string;
  content: string;
  inputProps: object;
  onSubmit: () => void;
}

export default function OneInputDialog(props: SimpleDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="default"
        onClick={handleClickOpen}
      >
        {props.title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.content}
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            {...props.inputProps}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.onSubmit} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
