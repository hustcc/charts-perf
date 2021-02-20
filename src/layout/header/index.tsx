import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

import './index.less';

export const Header = () => {
  return (
    <div className="header">
      <div className="headerMain">
        <div className="headerTitle">Render Performance Test for Charts 👋 </div>
        <div className="headerFeatureList"></div>
        <div className="headerIcon">
          <GithubOutlined color="#fff" />
        </div>
      </div>
    </div>
  );
};
