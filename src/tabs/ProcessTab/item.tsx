import React from 'react';

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import {Process} from "../../api/models/system";

interface ProcessItemProps {
  data: Process;
}

const ProcessItem: React.FC<ProcessItemProps> = (props) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row" align="center">{props.data.pid}</TableCell>
      <TableCell align="center">{props.data.name}</TableCell>
      <TableCell align="right">{props.data.cpuPercent}%</TableCell>
      <TableCell align="right">{props.data.vms}B</TableCell>
    </TableRow>
  );
};

export default ProcessItem;
