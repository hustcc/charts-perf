import _ from 'lodash';
import * as echarts from 'echarts';
import { Data } from '../../../types';
import { Z_FIELD, Y_FIELD, sleep, block } from '../../../helper';

/**
 * @param container
 * @param data
 */
export async function Scatter(container: HTMLElement, data: Data): Promise<number> {
  const startTime = performance.now();

  const myChart = size?.width ? echarts.init(container, undefined, size) : echarts.init(container);
  const option = {
    grid: {
      top: 10,
      right: 10,
      bottom: 24,
      left: 36,
    },
    xAxis: {},
    yAxis: {},
    series: [
      {
        data: _.map(data, (item) => [item[Z_FIELD], item[Y_FIELD]]),
        type: 'scatter',
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  myChart.setOption(option);

  const endTime = performance.now();

  await sleep();

  await block();

  myChart.dispose();
  // 返回最后的时间
  return endTime - startTime;
}
