import _ from 'lodash';
import * as Highcharts from 'highcharts';
import { Data } from '../../../types';
import { X_FIELD, Y_FIELD, sleep, block } from '../../../helper';

/**
 * @param container
 * @param data
 */
export async function Bar(container: HTMLElement, data: Data): Promise<number> {
  const option = {
    title: null,
    navigation: null,
    credits: {
      enabled: false,
    },
    yAxis: {
      title: null,
    },
    xAxis: {
      categories: _.map(data, (item) => item[X_FIELD]),
    },
    series: [
      {
        type: 'column',
        data: _.map(data, (item) => item[Y_FIELD]),
        showInLegend: false,
      },
    ],
  };
  const startTime = performance.now();

  const myChart = new Highcharts.Chart(container, option);

  const endTime = performance.now();

  await sleep();

  await block();

  myChart.destroy();

  // 返回最后的时间
  return endTime - startTime;
}
