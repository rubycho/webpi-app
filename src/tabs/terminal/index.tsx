import React, { useState, useCallback } from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

import TextField from "@material-ui/core/TextField";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import TerminalItem from "./item";
import OneInputDialog from "../../common/OneInputDialog";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    term: {
      width: '100%',
      maxWidth: 740,
      overflow: 'scroll',
    },
    common: {
      width: '100%',
      maxWidth: 740,
    }
  })
);

export default function TerminalTab () {
  const [term] = useState(new Terminal());
  const callback = useCallback(node => {
    if (node != null) {
      term.open(node);
      term.write('waiting for connection...');
    }
  }, [term]);

  const classes = styles();
  return (
    <>
      <OneInputDialog
        title="Provide a password"
        content="Please provide a password, which was issued on terminal creation."
        inputProps={{type: "password"}}
        onSubmit={() => {}}/>
      <OneInputDialog
        title="Warning"
        content="Type 'yes' to terminate this terminal."
        inputProps={{type: "text"}}
        onSubmit={() => {}} />
      <TableContainer
        component={Paper}
        className={classes.common}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Created</TableCell>
              <TableCell align="center">Updated</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TerminalItem data={{id: 'AAAA'}}/>
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <br />

      <div
        ref={callback}
        className={classes.term} />
      <TextField
        type="text"
        className={classes.common} />

      <div>
        <button>Send with Enter</button>
        <button>Send without Enter</button>
      </div>
      <div>
        <button>Send Ctrl+C</button>
        <button>Send Ctrl+D</button>
        <button>Send Ctrl+Z</button>
      </div>
    </>
  );
}
