import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import DefaultDialog, {CustomizeDialogProps} from "../../common/DefaultDialog";

interface ChangePathDialogReturnType {
  path: string;
}

export function ChangePathDialog(props: CustomizeDialogProps<ChangePathDialogReturnType>) {
  const [path, setPath] = React.useState('');

  return (
    <DefaultDialog
      title="Move to specific path"
      content="Please provide a valid directory path."
      open={props.open} setOpen={props.setOpen}
      onSubmit={() => {
        props.onSubmit({path});
        props.setOpen(false);
        setPath('');
      }}
    >
      <TextField
        fullWidth
        value={path}
        onChange={e => setPath(e.target.value)} />
    </DefaultDialog>
  );
}

interface CreateDirectoryDialogReturnType {
  dirname: string;
}

export function CreateDirectoryDialog(props: CustomizeDialogProps<CreateDirectoryDialogReturnType>) {
  const [dirname, setDirname] = React.useState('');

  return (
    <DefaultDialog
      title="Create directory"
      content="Please provide a new-valid directory name."
      open={props.open} setOpen={props.setOpen}
      onSubmit={() => {
        props.onSubmit({dirname});
        props.setOpen(false);
        setDirname('');
      }}
    >
      <TextField
        fullWidth
        value={dirname}
        onChange={e => setDirname(e.target.value)} />
    </DefaultDialog>
  )
}

interface UploadFileDialogReturnType {
  file: FileList;
}

export function UploadFileDialog(props: CustomizeDialogProps<UploadFileDialogReturnType>) {
  const [file, setFile] = React.useState({} as FileList);

  return (
    <DefaultDialog
      title="Upload file"
      content="Please provide a file you want to upload."
      open={props.open}
      setOpen={props.setOpen}
      onSubmit={() => {
        props.onSubmit({file});
        props.setOpen(false);
        setFile({} as FileList);
      }}
    >
      <input
        hidden
        type="file"
        onChange={e => setFile(e.target.files || {} as FileList)}
        id="raised-button-file"
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
    </DefaultDialog>
  );
}
