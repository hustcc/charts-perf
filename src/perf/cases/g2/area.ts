import { Chart } from '@antv/g2';
import { Data } from '../../../types';
import helpers, { X_FIELD, Y_FIELD, size } from '../../../helper';

/**
 * @param container
 * @param data
 */
export async function Area(container: HTMLElement, data: Data): Promise<number> {
  const startTime = performance.now();

  const chart = new Chart({
    container,
    ...size,
  });
  chart.data(data);
  chart.line().position(`${X_FIELD}*${Y_FIELD}`);
  chart.area().position(`${X_FIELD}*${Y_FIELD}`);

  chart.render();
  const endTime = performance.now();

  await helpers.sleep();

  chart.destroy();
  // 返回最后的时间
  return endTime - startTime;
}