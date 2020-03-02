import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Avatar from "@material-ui/core/Avatar";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import DiskTab from "../../tabs/DiskTab";
import SystemTab from "../../tabs/SystemTab";
import GPIOTab from "../../tabs/GPIOTab";
import TerminalTab from '../../tabs/TerminalTab'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  logo: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: theme.spacing(1),
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color='default'>
        <Avatar
          src={require('../../assets/logo.png')}
          className={classes.logo}
        />
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
        >
          <Tab label="System Status" {...a11yProps(0)} />
          <Tab label="File Manager" {...a11yProps(1)} />
          <Tab label="GPIO Control" {...a11yProps(2)} />
          <Tab label="Terminal" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SystemTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DiskTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GPIOTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TerminalTab />
      </TabPanel>
    </div>
  );
}
