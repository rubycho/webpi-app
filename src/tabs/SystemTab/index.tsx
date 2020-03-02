import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import RefreshIcon from '@material-ui/icons/Refresh';

import SystemItem from "./item";
import HintIconButton from "../../common/HintIconButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function SystemTab() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListSubheader>
        Pi Spec
      </ListSubheader>
      <SystemItem title="hello" value="world" />
      <Divider component="li" />
      <ListSubheader>
        Pi Status
        <HintIconButton title="Refresh">
          <RefreshIcon />
        </HintIconButton>
      </ListSubheader>
      <SystemItem title="hello" value="world" />
      <Divider component="li" />
    </List>
  );
}
