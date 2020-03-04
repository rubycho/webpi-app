import React from "react";

import Link from "@material-ui/core/Link";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';

import HintIconButton from "../../common/HintIconButton";

import {File} from "../../api/models/disk";

interface DiskItemProps {
  data: File;
  onBrowse?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
}

export default function DiskItem(props: DiskItemProps) {
  return (
    <TableRow key={props.data.name}>
      <TableCell component="th" scope="row">
        {
          props.data.isDir ?
            <Link onClick={props.onBrowse}>
              {props.data.name}
            </Link>
            :
            <p>{props.data.name}</p>
        }
      </TableCell>
      <TableCell align="center">{props.data.isDir ? 'DIR' : 'FILE'}</TableCell>
      <TableCell align="right">{props.data.size}B</TableCell>
      <TableCell align="center">{props.data.created}</TableCell>
      <TableCell align="center">{props.data.modified}</TableCell>
      <TableCell align="center">
        {
          !props.data.isDir &&
          <HintIconButton
              title="Download"
              onClick={props.onDownload}
          >
              <GetAppIcon />
          </HintIconButton>
        }
        <HintIconButton
          title="Delete"
          onClick={props.onDelete}
        >
          <DeleteIcon />
        </HintIconButton>
      </TableCell>
    </TableRow>
  );
}
