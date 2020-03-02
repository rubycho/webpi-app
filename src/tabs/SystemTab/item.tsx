import React from "react";

import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

interface SystemItemProps {
  title: string;
  value: string;
}

export default function SystemItem(props: SystemItemProps) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={props.title}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
            >
              {props.value}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
