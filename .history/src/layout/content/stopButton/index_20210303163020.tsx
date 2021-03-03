import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'antd';
import { sleepThisObj } from '../../../helper';
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons';

type Props = {
  readonly type: 'small' | 'middle';
}

export const StopButton = (props: Props) => {
  const [stopFlag, setStopFlag] = useState(false);

  const onClick = () => {
    sleepThisObj.paused = !stopFlag;
    setStopFlag(!stopFlag);
  };

  return (
    <Button
      onClick={onClick}
      type={props.type}
      shape="round"
      icon={stopFlag ? <CaretRightOutlined /> : <PauseOutlined />}
      size="small"
    >
      {stopFlag ? 'Start' : 'Pause'}
    </Button>
  );
};
