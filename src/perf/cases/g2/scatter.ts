import { Chart } from '@antv/g2';
import { Data } from '../../../types';
import { Z_FIELD, Y_FIELD, size, sleep, block } from '../../../helper';

/**
 * @param container
 * @param data
 */
export async function Scatter(container: HTMLElement, data: Data): Promise<number> {
  const startTime = performance.now();

  const chart = new Chart({
    container,
    ...size,
  });
  chart.data(data);
  chart.point().position(`${Z_FIELD}*${Y_FIELD}`);

  chart.render();
  const endTime = performance.now();

  await sleep();

  await block();

  chart.destroy();
  // 返回最后的时间
  return endTime - startTime;
}
