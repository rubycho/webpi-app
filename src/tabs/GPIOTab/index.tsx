import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import RefreshIcon from '@material-ui/icons/Refresh';

import GPIOItem from "./item";
import HintIconButton from "../../common/HintIconButton";
import OneInputDialog from "../../common/OneInputDialog";

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});

export default function GPIOTab() {
  const classes = useStyles();

  return (
    <>
      <OneInputDialog
        title="Set mode"
        content="Please provide a mode value. (0 = IN, Non-0 = OUT)"
        inputProps={{type: "number"}}
        onSubmit={() => {}} />
      <OneInputDialog
        title="Set value"
        content="Please provide a value. (0 = LOW, Non-0 = HIGH)"
        inputProps={{type: "number"}}
        onSubmit={() => {}} />
      <OneInputDialog
        title="Set pwm dutycycle"
        content="Please provide a dutycycle value. (0 <= dutycycle <= 255)"
        inputProps={{type: "number", inputProps: {min: 0, max: 255}}}
        onSubmit={() => {}} />
      <OneInputDialog
        title="Set pwm frequency"
        content="Please provide a frequency value (0 <= freq)"
        inputProps={{type: "number", inputProps: {min: 0}}}
        onSubmit={() => {}} />

      <HintIconButton title="Refresh">
        <RefreshIcon />
      </HintIconButton>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">No.</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Mode</TableCell>
              <TableCell align="center">Value</TableCell>
              <TableCell align="center">PWM</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <GPIOItem
              data={{pin: 6, type: 'GENERAL', mode: 0 ? 'OUT' : 'IN', value: 0 ? 'High' : 'Low'}} />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
