import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
import OneInputDialog from "../../common/OneInputDialog";

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

export default function DiskTab() {
  const classes = useStyles();

  return (
    <>
      <OneInputDialog
        title="Move to specific path"
        content="Please provide a valid directory path."
        inputProps={{type: "text"}}
        onSubmit={() => {}} />
      <OneInputDialog
        title="Create directory"
        content="Please provide a new-valid directory name."
        inputProps={{type: "text"}}
        onSubmit={() => {}} />
      <OneInputDialog
        title="Upload file"
        content="Please provide a file you want to upload."
        inputProps={{type: "file"}}
        onSubmit={() => {}}/>
      <Typography variant="h6" className={classes.pathTypo}>
        /home/pi/
      </Typography>
      <Divider orientation="horizontal" />
      <Grid container alignItems="center">
        <HintIconButton title="Parent directory">
          <ArrowUpwardIcon />
        </HintIconButton>
        <HintIconButton title="Change path">
          <EditLocationIcon />
        </HintIconButton>
        <Divider orientation="vertical" flexItem light={true}/>
        <HintIconButton title="Create directory">
          <CreateNewFolderIcon />
        </HintIconButton>
        <HintIconButton title="Upload file">
          <AddIcon />
        </HintIconButton>
        <Divider orientation="vertical" flexItem light={true}/>
        <HintIconButton title="Refresh">
          <RefreshIcon />
        </HintIconButton>
      </Grid>
      <Divider orientation="horizontal" />
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
            <DiskItem
              data={{name: '.vimrc', type: false ? 'dir' : 'file', size: 14}} />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
