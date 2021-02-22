import _ from 'lodash';
import * as Highcharts from 'highcharts';
import { Data } from '../../../types';
import helpers, { X_FIELD, Y_FIELD, size } from '../../../helper';

/**
 * @param container
 * @param data
 */
export async function Area(container: HTMLElement, data: Data): Promise<number> {
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
      type: 'area',
      ...size,
    },
    plotOptions: {
      area: {
        marker: {
          enabled: false,
        },
      },
    },
    xAxis: {
      categories: _.map(data, item => item[X_FIELD]),
    },
    series: [
      {
        data: _.map(data, item => item[Y_FIELD]),
        showInLegend: false,
      }，
    ],
  };
  const startTime = performance.now();

  const myChart = new Highcharts.Chart(container, option);

  const endTime = performance.now();

  await helpers.sleep();

  myChart.destroy();

  // 返回最后的时间
  return endTime - startTime;
}
