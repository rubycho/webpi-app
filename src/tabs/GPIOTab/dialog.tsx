import React from "react";

import {TextField} from "@material-ui/core";

import DefaultDialog, {CustomizeDialogProps} from "../../common/DefaultDialog";

import {PinModeForm, PinPWMForm, PinValueForm} from "../../api/gpio";

export function PinModeDialog(props: CustomizeDialogProps<PinModeForm>) {
  const [mode, setMode] = React.useState('0');

  return (
    <DefaultDialog
      title="Set mode"
      content="Please provide a mode value. (0 = IN, Non-0 = OUT)"
      open={props.open}
      setOpen={props.setOpen}
      onSubmit={() => {
        props.onSubmit({mode: parseInt(mode, 10)});
        props.setOpen(false);
        setMode('0');
      }}
    >
      <TextField
        fullWidth
        type="number"
        value={mode}
        onChange={e => setMode(e.target.value)} />
    </DefaultDialog>
  );
}

export function PinValueDialog(props: CustomizeDialogProps<PinValueForm>) {
  const [value, setValue] = React.useState('0');

  return (
    <DefaultDialog
      title="Set value"
      content="Please provide a value. (0 = LOW, Non-0 = HIGH)"
      open={props.open}
      setOpen={props.setOpen}
      onSubmit={() => {
        props.onSubmit({value: parseInt(value, 10)});
        props.setOpen(false);
        setValue('0');
      }}
    >
      <TextField
        fullWidth
        type="number"
        value={value}
        onChange={e => setValue(e.target.value)} />
    </DefaultDialog>
  );
}

export function PinPWMDialog(props: CustomizeDialogProps<PinPWMForm>) {
  const [freq, setFreq] = React.useState('0');
  const [dutycycle, setDutycycle] = React.useState('0');

  return (
    <DefaultDialog
      title="Set pwm frequency & dutycycle"
      content="Please provide a frequency & dutycycle value. (0 <= freq, 0 <= dutycycle <= 255)"
      open={props.open}
      setOpen={props.setOpen}
      onSubmit={() => {
        props.onSubmit({
          freq: parseInt(freq, 10),
          dutycycle: parseInt(dutycycle, 10),
        });
        props.setOpen(false);
        setFreq('0'); setDutycycle('0');
      }}
    >
      <TextField
        fullWidth
        type="number"
        label="frequency"
        value={freq}
        onChange={e => setFreq(e.target.value)}
      />
      <TextField
        fullWidth
        type="number"
        label="dutycycle"
        value={dutycycle}
        onChange={e => setDutycycle(e.target.value)}
      />
    </DefaultDialog>
  );
}
