import React from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import DeleteIcon from '@material-ui/icons/Delete';

import HintIconButton from "../../common/HintIconButton";

interface TerminalItemProps {
  data: any;
}

export default function TerminalItem(props: TerminalItemProps) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">{props.data.id}</TableCell>
      <TableCell align="center">{props.data.created}</TableCell>
      <TableCell align="center">{props.data.updated}</TableCell>
      <TableCell align="center">
        <HintIconButton title="Reconnect">
          <SettingsInputComponentIcon />
        </HintIconButton>
        <HintIconButton title="Terminate">
          <DeleteIcon />
        </HintIconButton>
      </TableCell>
    </TableRow>
  );
}
