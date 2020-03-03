import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";

import ProcessItem from "./item";

import {inject, observer} from "mobx-react";

import {StoreType} from "../../store";
import SystemStore from "../../store/system";

interface ProcessTabProps {
  [StoreType.SYSTEM_STORE]?: SystemStore;
}

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});

const ProcessTab: React.FC<ProcessTabProps> = (props) => {
  const classes = useStyles();

  const CPU_SORTED = 'CPU'; const MEM_SORTED = 'MEM';
  const [radio, setRadio] = React.useState(CPU_SORTED);

  React.useEffect(() => {
    const refresh = () => {
      if (radio === CPU_SORTED) props.systemStore?.getProcCPU();
      else props.systemStore?.getProcMem();
    };
    refresh();

    const sched = setInterval(refresh, 1000);
    return () => clearInterval(sched);
    // eslint-disable-next-line
  }, [radio]);

  return (
    <>
      <RadioGroup
        row
        value={radio}
        onChange={e => setRadio(e.target.value)}
      >
        <FormControlLabel
          value={CPU_SORTED}
          control={<Radio />}
          label="CPU Sorted" />
        <FormControlLabel
          value={MEM_SORTED}
          control={<Radio />}
          label="Memory Sorted" />
      </RadioGroup>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">PID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">CPU Percent</TableCell>
              <TableCell align="center">Memory</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              radio === CPU_SORTED &&
              props.systemStore?._procCPU.map((item) => {
                return (<ProcessItem key={item.pid} data={item} />);
              })
            }
            {
              radio === MEM_SORTED &&
                props.systemStore?._procMem.map((item) => {
                  return <ProcessItem key={item.pid} data={item}/>
                })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default inject(StoreType.SYSTEM_STORE)(observer(ProcessTab));
