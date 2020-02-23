import React from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';

import HintIconButton from "../../common/HintIconButton";

interface GPIOItemProps {
  data: any;
}

export default function GPIOItem(props: GPIOItemProps) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">{props.data.pin}</TableCell>
      <TableCell align="center">{props.data.type}</TableCell>
      <TableCell align="center">{props.data.mode}</TableCell>
      <TableCell align="center">{props.data.value}</TableCell>
      <TableCell align="center">
        {props.data.pwm ?
          `dutycycle: ${props.data.pwm_dutycycle}, freq: ${props.data.pwm_freq}`:
          `No PWM`}
      </TableCell>
      <TableCell align="center">
        <HintIconButton title="Set mode">
          <LooksOneIcon />
        </HintIconButton>
        <HintIconButton title="Set value">
          <LooksTwoIcon />
        </HintIconButton>
        <HintIconButton title="Set PWM">
          <Looks3Icon />
        </HintIconButton>
      </TableCell>
    </TableRow>
  );
}