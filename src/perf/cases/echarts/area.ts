import _ from 'lodash';
import * as echarts from 'echarts';
import { Data } from '../../../types';
import helpers, { X_FIELD, Y_FIELD, size } from '../../../helper';

/**
 * @param container
 * @param data
 */
export async function Area(container: HTMLElement, data: Data): Promise<number> {
  const startTime = performance.now();

  const myChart = echarts.init(container, undefined, size);
  const option = {
    grid: {
      top: 10,
      right: 10,
      bottom: 24,
      left: 36,
    },
    xAxis: {
      data: _.map(data, (item) => item[X_FIELD]),
    },
    yAxis: {},
    series: [
      {
        data: _.map(data, (item) => item[Y_FIELD]),
        areaStyle: {},
        type: 'line',
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  myChart.setOption(option);

  const endTime = performance.now();

  await helpers.sleep();

  myChart.dispose();

  // 返回最后的时间
  return endTime - startTime;
}