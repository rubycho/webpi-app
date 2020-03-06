import React, {useCallback} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import 'xterm/css/xterm.css';
import {Terminal} from "xterm";

import Alert from '@material-ui/lab/Alert'
import AlertTitle from "@material-ui/lab/AlertTitle";

import TextField from "@material-ui/core/TextField";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";

import HintIconButton from "../../common/HintIconButton";
import {TerminalPasswordDialog} from "./dialog";
import TerminalItem from "./item";

import {inject, observer} from "mobx-react";

import {terminal} from "../../api/models/terminal";

import {StoreType} from "../../store";
import TerminalStore from "../../store/terminal";

interface TerminalTabProps {
  [StoreType.TERMINAL_STORE]?: TerminalStore;
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    common: {
      width: '100%',
      maxWidth: 740,
    },
    divider: {
      visibility: 'hidden',
      color: '0',
    }
  })
);

const TerminalTab: React.FC<TerminalTabProps> = (props) => {
  const [xterm] = React.useState(new Terminal());
  const [input, setInput] = React.useState('');
  const [_terminal, setTerminal] = React.useState(terminal());
  const [pDialog, setPDialog] = React.useState(false);

  React.useEffect(() => {
    props.terminalStore?.getTerminals();

    const getStdout = () => {
      if (props.terminalStore?.lastSuccessful)
        props.terminalStore?.tryStdout();
    };
    const sched = setInterval(getStdout, 1000);

    return () => clearInterval(sched);
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (xterm.element) xterm.write(props.terminalStore?.offset || '');
    // eslint-disable-next-line
  }, [props.terminalStore?.offset]);

  const callback = useCallback(node => {
    if (node != null) {
      xterm.open(node);
      xterm.write(props.terminalStore?.stdout || '');
    }
    // eslint-disable-next-line
  }, []);

  const classes = styles();

  return (
    <>
      <TerminalPasswordDialog
        open={pDialog}
        setOpen={setPDialog}
        onSubmit={v => {
          _terminal.password = v.password;
          props.terminalStore?.setTerminal(_terminal);
        }} />

      <HintIconButton
        title="Refresh"
        onClick={() => props.terminalStore?.getTerminals()}
      >
        <RefreshIcon/>
      </HintIconButton>
      <HintIconButton
        title="Create terminal"
        onClick={async () => {
          await props.terminalStore?.createTerminal();
          await props.terminalStore?.getTerminals();
        }}
      >
        <AddIcon/>
      </HintIconButton>
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
            {
              props.terminalStore?.terminals.map(item => {
                return (
                  <TerminalItem
                    key={item.id}
                    data={item}
                    onConnect={() => {
                      setTerminal(item);
                      setPDialog(true);
                    }}
                    onDestroy={async () => {
                      if (window.confirm('Do you really want to terminate this bash process?')) {
                        await props.terminalStore?.destroyTerminal(item);
                        await props.terminalStore?.getTerminals();
                      }
                    }}
                  />
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>

      <hr className={classes.divider} />

      <Alert severity="warning"
             className={classes.common}
      >
        <AlertTitle>Warning</AlertTitle>
        - It is not recommended to use applications that requires live-stdin/stdout. <br/>
        - If you want to use vim, use the remap command. OR you will have to terminate the terminal. <br/>
        <pre>
          :inoremap jj &lt;ESC&gt;
        </pre>
        - Use \n to add newline, use \N to add "\n". <br/>
        - Use \t to add tab, use \T to add "\t".
      </Alert>

      <hr className={classes.divider} />

      <Alert
        className={classes.common}
        severity={props.terminalStore?.lastSuccessful ? "success" : "warning"}
      >
        <AlertTitle>
          Connection Status
        </AlertTitle>
        {props.terminalStore?.lastSuccessful ? "ACTIVE" : "LOST"}
        {
          props.terminalStore?.lastSuccessful &&
          <>
              <br/> * Save below credentials, to reuse the terminal instance.
              <br/> Terminal ID: {props.terminalStore?._terminal.id}
              <br/> Password: {props.terminalStore?._terminal.password}
          </>
        }
      </Alert>

      <hr className={classes.divider} />
      <hr className={classes.divider} />

      <div
        ref={callback}
        className={classes.common}/>
      <TextField
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={!props.terminalStore?.lastSuccessful}
        className={classes.common}
      />

      <div>
        <button
          disabled={!props.terminalStore?.lastSuccessful}
          onClick={() => {
            props.terminalStore?.tryStdin(input + '\n');
            setInput('');
          }}
        >
          Send with Enter
        </button>
        <button
          disabled={!props.terminalStore?.lastSuccessful}
          onClick={() => {
            props.terminalStore?.tryStdin(input);
            setInput('');
          }}
        >
          Send without Enter
        </button>
      </div>
      <div>
        <button
          disabled={!props.terminalStore?.lastSuccessful}
          onClick={() => props.terminalStore?.tryStdin('^C\n')}
        >
          Send Ctrl+C
        </button>
        <button
          disabled={!props.terminalStore?.lastSuccessful}
          onClick={() => props.terminalStore?.tryStdin('^D\n')}
        >
          Send Ctrl+D
        </button>
        <button
          disabled={!props.terminalStore?.lastSuccessful}
          onClick={() => props.terminalStore?.tryStdin('^Z\n')}
        >
          Send Ctrl+Z
        </button>
      </div>
    </>
  );
};

export default inject(StoreType.TERMINAL_STORE)(observer(TerminalTab));
