import React from 'react';

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

interface HintIconButtonProps {
  title: string;
  onClick?: () => void;
}

export default function HintIconButton(props: React.PropsWithChildren<HintIconButtonProps>) {
  return (
    <Tooltip
      title={props.title}
      onClick={props.onClick}
    >
      <IconButton>
        {props.children}
      </IconButton>
    </Tooltip>
  )
}
