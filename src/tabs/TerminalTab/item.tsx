import React from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import DeleteIcon from '@material-ui/icons/Delete';

import HintIconButton from "../../common/HintIconButton";

import {Terminal} from "../../api/models/terminal";

interface TerminalItemProps {
  data: Terminal;
  onConnect?: () => void;
  onDestroy?: () => void;
}

export default function TerminalItem(props: TerminalItemProps) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">{props.data.id}</TableCell>
      <TableCell align="center">{props.data.created}</TableCell>
      <TableCell align="center">{props.data.updated}</TableCell>
      <TableCell align="center">
        <HintIconButton
          title="Reconnect"
          onClick={props.onConnect}
        >
          <SettingsInputComponentIcon />
        </HintIconButton>
        <HintIconButton
          title="Terminate"
          onClick={props.onDestroy}
        >
          <DeleteIcon />
        </HintIconButton>
      </TableCell>
    </TableRow>
  );
}
