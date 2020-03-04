import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";

import AddIcon from '@material-ui/icons/Add';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import RefreshIcon from '@material-ui/icons/Refresh';

import DiskItem from "./item";
import HintIconButton from "../../common/HintIconButton";

import {ChangePathDialog, CreateDirectoryDialog, UploadFileDialog} from "./dialog";

import {inject, observer} from "mobx-react";

import {StoreType} from "../../store";
import DiskStore from "../../store/disk";

interface DiskTabProps {
  [StoreType.DISK_STORE]?: DiskStore;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tContainer: {
      marginTop: theme.spacing(2),
    },
    table: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    pathTypo: {
      margin: theme.spacing(1),
    },
  }),
);

const DiskTab: React.FC<DiskTabProps> = (props) => {
  const classes = useStyles();
  const [pDialog, setPDialog] = React.useState(false);
  const [dDialog, setDDialog] = React.useState(false);
  const [fDialog, setFDialog] = React.useState(false);

  React.useEffect(() => {
    props.diskStore?.listDirectory();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ChangePathDialog
        open={pDialog}
        setOpen={setPDialog}
        onSubmit={v => props.diskStore?.listDirectory(v.path)} />
      <CreateDirectoryDialog
        open={dDialog}
        setOpen={setDDialog}
        onSubmit={async v => {
          await props.diskStore?.createDirectory(v.dirname);
          await props.diskStore?.listDirectory();
        }} />
        <UploadFileDialog
          open={fDialog}
          setOpen={setFDialog}
          onSubmit={async v => {
            await props.diskStore?.uploadFile(v.file);
            await props.diskStore?.listDirectory();
          }} />

      <Typography variant="h6" className={classes.pathTypo}>
        {props.diskStore?.path}
      </Typography>
      <Divider orientation="horizontal"/>
      <Grid container alignItems="center">
        <HintIconButton
          title="Parent directory"
          onClick={() => props.diskStore?.listDirectory('../', true)}
        >
          <ArrowUpwardIcon/>
        </HintIconButton>
        <HintIconButton
          title="Change path"
          onClick={() => setPDialog(true)}
        >
          <EditLocationIcon/>
        </HintIconButton>
        <Divider orientation="vertical" flexItem light={true}/>
        <HintIconButton
          title="Create directory"
          onClick={() => setDDialog(true)}
        >
          <CreateNewFolderIcon/>
        </HintIconButton>
        <HintIconButton
          title="Upload file"
          onClick={() => setFDialog(true)}
        >
          <AddIcon/>
        </HintIconButton>
        <Divider orientation="vertical" flexItem light={true}/>
        <HintIconButton
          title="Refresh"
          onClick={() => props.diskStore?.listDirectory()}
        >
          <RefreshIcon/>
        </HintIconButton>
      </Grid>
      <Divider orientation="horizontal"/>
      <TableContainer
        component={Paper}
        className={classes.tContainer}
      >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center">Created</TableCell>
              <TableCell align="center">Updated</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.diskStore?.files.map(item => {
                return (
                  <DiskItem
                    key={item.name}
                    data={item}
                    onBrowse={() => props.diskStore?.listDirectory(item.name, true)}
                    onDownload={() => props.diskStore?.downloadFile(item.name)}
                    onDelete={async () => {
                      if (window.confirm(
                        'Do you really want to remove this item? ' +
                        'you can\'t restore it after deletion.'
                      )) {
                        await props.diskStore?.deleteItem(item.name);
                        await props.diskStore?.listDirectory();
                      }
                    }}
                  />
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default inject(StoreType.DISK_STORE)(observer(DiskTab));
