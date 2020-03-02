import React from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';

import HintIconButton from "../../common/HintIconButton";

interface DiskItemProps {
  data: any;
}

export default function DiskItem(props: DiskItemProps) {
  return (
    <TableRow key={props.data.name}>
      <TableCell component="th" scope="row">
        {props.data.name}
      </TableCell>
      <TableCell align="center">{props.data.type}</TableCell>
      <TableCell align="right">{props.data.size}B</TableCell>
      <TableCell align="center">{props.data.created}</TableCell>
      <TableCell align="center">{props.data.updated}</TableCell>
      <TableCell align="center">
        <HintIconButton title="Download">
          <GetAppIcon />
        </HintIconButton>
        <HintIconButton title="Delete">
          <DeleteIcon />
        </HintIconButton>
      </TableCell>
    </TableRow>
  );
}
