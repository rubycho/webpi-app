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

import {PinModeDialog, PinPWMDialog, PinValueDialog} from "./dialog";

import {inject, observer} from "mobx-react";

import {StoreType} from "../../store";
import GPIOStore from "../../store/gpio";

interface GPIOTabProps {
  [StoreType.GPIO_STORE]?: GPIOStore
}

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});

const GPIOTab: React.FC<GPIOTabProps> = (props) => {
  const classes = useStyles();

  const [mDialog, setMDialog] = React.useState(false);
  const [vDialog, setVDialog] = React.useState(false);
  const [pDialog, setPDialog] = React.useState(false);
  const [currentPin, setCurrentPin] = React.useState(5);

  React.useEffect(() => {
    props.gpioStore?.getPins();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <PinModeDialog
        open={mDialog}
        setOpen={setMDialog}
        onSubmit={async v => {
          await props.gpioStore?.setMode(currentPin, v);
          await props.gpioStore?.getPins();
        }} />
      <PinValueDialog
        open={vDialog}
        setOpen={setVDialog}
        onSubmit={async v => {
          await props.gpioStore?.setValue(currentPin, v);
          await props.gpioStore?.getPins();
        }} />
      <PinPWMDialog
        open={pDialog}
        setOpen={setPDialog}
        onSubmit={async v => {
          await props.gpioStore?.setPWM(currentPin, v);
          await props.gpioStore?.getPins();
        }} />

      <HintIconButton
        title="Refresh"
        onClick={() => props.gpioStore?.getPins()}
      >
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
            {
              props.gpioStore?.pins.map(item => {
                return (
                  <GPIOItem
                    key={item.pin}
                    data={item}
                    onMode={() => {
                      setCurrentPin(item.pin);
                      setMDialog(true);
                    }}
                    onValue={() => {
                      setCurrentPin(item.pin);
                      setVDialog(true);
                    }}
                    onPWM={() => {
                      setCurrentPin(item.pin);
                      setPDialog(true);
                    }}
                  />);
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default inject(StoreType.GPIO_STORE)(observer(GPIOTab));
