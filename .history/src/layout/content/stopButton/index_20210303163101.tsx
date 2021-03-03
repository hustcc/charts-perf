import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'antd';
import { sleepThisObj } from '../../../helper';
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons';

type Props = {
  readonly size: 'small' | 'middle';
}

export const StopButton = (props: Props) => {
  const [stopFlag, setStopFlag] = useState(false);

  const onClick = () => {
    sleepThisObj.paused = !stopFlag;
    setStopFlag(!stopFlag);
  };

  return (
    <Button
      shape="round"
      type="primary"
      onClick={onClick}
      size={props.size}
      icon={stopFlag ? <CaretRightOutlined /> : <PauseOutlined />}
    >
      {stopFlag ? 'Start' : 'Pause'}
    </Button>
  );
};
