import _ from 'lodash';
import * as Highcharts from 'highcharts';
import { Data } from '../../../types';
import { Z_FIELD, Y_FIELD, size, sleep } from '../../../helper';

/**
 * @param container
 * @param data
 */
export async function Scatter(container: HTMLElement, data: Data): Promise<number> {
  const option = {
    title: null,
    navigation: null,
    credits: {
      enabled: false,
    },
    yAxis: {
      title: null,
    },
    chart: {
      type: 'scatter',
      ...size,
    },
    series: [
      {
        data: _.map(data, (item) => [item[Z_FIELD], item[Y_FIELD]]),
        showInLegend: false,
      },
    ],
  };

  const startTime = performance.now();

  const myChart = new Highcharts.Chart(container, option);

  const endTime = performance.now();

  await sleep();

  myChart.destroy();

  // 返回最后的时间
  return endTime - startTime;
}
