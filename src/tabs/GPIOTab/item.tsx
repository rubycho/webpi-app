import React from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';

import HintIconButton from "../../common/HintIconButton";

import {Pin} from "../../api/models/gpio";

interface GPIOItemProps {
  data: Pin;
  onMode?: () => void;
  onValue?: () => void;
  onPWM?: () => void;
}

export default function GPIOItem(props: GPIOItemProps) {
  return (
    <TableRow>
      <TableCell component="th" scope="row" align="center">{props.data.pin}</TableCell>
      <TableCell align="center">{props.data.type}</TableCell>
      <TableCell align="center">{props.data.mode}</TableCell>
      <TableCell align="center">{props.data.value}</TableCell>
      <TableCell align="center">
        {props.data.pwm ?
          `dutycycle: ${props.data.pwmDutycycle}, freq: ${props.data.pwmFreq}`:
          `No PWM`}
      </TableCell>
      <TableCell align="center">
        <HintIconButton
          title="Set mode"
          onClick={props.onMode}
        >
          <LooksOneIcon />
        </HintIconButton>
        <HintIconButton
          title="Set value"
          onClick={props.onValue}
        >
          <LooksTwoIcon />
        </HintIconButton>
        <HintIconButton
          title="Set PWM"
          onClick={props.onPWM}
        >
          <Looks3Icon />
        </HintIconButton>
      </TableCell>
    </TableRow>
  );
}