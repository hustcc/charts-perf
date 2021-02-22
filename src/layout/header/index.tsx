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
          <a href="https://github.com/hustcc/charts-perf" style={{ color: '#fff' }} target="_blank">
            <GithubOutlined />
          </a>
        </div>
      </div>
    </div>
  );
};
