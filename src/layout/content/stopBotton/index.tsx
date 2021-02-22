import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'antd';
import helpers from '../../../helper';
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons';

const sleepThisObj = {
  stopFlag: false,
}

export const StopBotton = () => {
  const [stopFlag, setStopFlag] = useState(false);

  const onClick = () => {
    sleepThisObj.stopFlag = !stopFlag;
    helpers.sleep = helpers.sleep.bind(sleepThisObj);
    setStopFlag(!stopFlag);
  }

  return (
    <Button
      onClick={onClick}
      type="primary"
      shape="round"
      icon={stopFlag ? <CaretRightOutlined /> : <PauseOutlined />}
      size='small'
    >
      { stopFlag ? 'Start' : 'Pause'}
    </Button>
  )
}
