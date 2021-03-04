import React from 'react';
import { Spin, Empty } from 'antd';
import _ from 'lodash';
import { Line } from '@antv/g2plot';
import G2Plot from 'react-g2plot';
import { PerfData } from '../../../types';
import { IConfig } from '../config';
import { CHART_TYPES } from '../../../common/const';
import { LineChartOutlined, BarChartOutlined, DotChartOutlined, AreaChartOutlined } from '@ant-design/icons';

import './index.less';

type Props = {
  readonly loading: boolean;
  readonly config: IConfig;
  readonly perfData: PerfData;
};

// 图表 icon
const Icons = {
  Line: <LineChartOutlined />,
  Bar: <BarChartOutlined />,
  Scatter: <DotChartOutlined />,
  Area: <AreaChartOutlined />,
};

const LINE_CONFIG = {
  height: 300,
  xField: 'length',
  yField: 'time',
  seriesField: 'engine',
  meta: {
    length: {
      type: 'cat',
    },
  },
  color: [
    '#9270CA',
    '#269A99',
    '#5AD8A6',
    '#F6BD16',
    '#6DC8EC',
    '#FF9D4D',
    '#FF99C3',
    '#BDD2FD',
    '#BEDED1',
    '#C2C8D5',
    '#EFE0B5',
    '#F6C3B7',
    '#B5D7E5',
    '#D3C6EA',
    '#F4DBC6',
    '#AAD8D8',
    '#F2CADA',
  ],
  yAxis: {
    title: {
      text: 'Time (ms)',
      style: {
        fontSize: 12,
      },
    },
  },
  xAxis: {
    title: {
      text: 'Data Size',
      style: {
        fontSize: 12,
      },
    },
  },
  label: {
    style: {
      fill: '#aaa',
    },
    formatter: function formatter(datum) {
      return `${datum.time.toFixed(2)} ms`;
    },
  },
};

export const Result = (props: Props) => {
  const { loading, config, perfData } = props;
  const { types } = config;

  return (
    <div className="resultsChartLine">
      {_.map(types, (type) => (
        <div className="resultsChartLineBox" key={type}>
          <div className="containerTitle">
            {Icons[type]} {_.find(CHART_TYPES, { value: type }).label}
          </div>
          <div className="renderLine">
            {loading ? (
              <div className="loadingSpin">
                <Spin size="large" tip="Loading..." />
              </div>
            ) : perfData[type] ? (
              <G2Plot
                style={{ width: '90%' }}
                options={{ ...LINE_CONFIG, data: (perfData[type] || []).map((d) => ({ ...d, length: `${d.length}` })) }}
                Ctor={Line}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} style={{ paddingTop: '150px' }} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
