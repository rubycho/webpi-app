import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import SystemItem from "./item";

import {inject, observer} from "mobx-react";

import {StoreType} from "../../store";
import SystemStore from "../../store/system";

interface SystemTabProps {
  [StoreType.SYSTEM_STORE]?: SystemStore;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const SystemTab: React.FC<SystemTabProps> = (props) => {
  const classes = useStyles();

  React.useEffect(() => {
    props.systemStore?.getSystemInfo();
    props.systemStore?.getSystemStatus();

    const sched = setInterval(() => props.systemStore?.getSystemStatus(), 1000);
    return () => clearInterval(sched);
    // eslint-disable-next-line
  }, []);

  return (
    <List className={classes.root}>
      <ListSubheader>
        Pi Spec
      </ListSubheader>
      <SystemItem title="Pi Ver." value={props.systemStore?._systemInfo.rpi || ''} />
      <SystemItem title="Distro" value={props.systemStore?._systemInfo.dist || ''} />
      <SystemItem title="CPU" value={props.systemStore?._systemInfo.cpu || ''} />
      <SystemItem title="Total Memory" value={props.systemStore?._systemInfo.totalMem.toString() + 'B' || ''} />
      <Divider component="li" />

      <ListSubheader>
        Pi Status
      </ListSubheader>
      <SystemItem title="# of procs" value={props.systemStore?._systemStatus.numProc.toString() || ''} />
      <SystemItem title="Memory Usage" value={props.systemStore?._systemStatus.usingMem.toString() + 'B' || ''} />
      <SystemItem title="CPU Temperature"
                  value={props.systemStore?._systemStatus.temperature.join(',') || ''} />
      <SystemItem title="Current Time" value={props.systemStore?._systemStatus.currentTime || ''} />
      <Divider component="li" />
    </List>
  );
};

export default inject(StoreType.SYSTEM_STORE)(observer(SystemTab));
