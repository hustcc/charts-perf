import { Chart } from '@antv/g2';
import { Data } from '../../../types';
import { X_FIELD, Y_FIELD,  sleep, block } from '../../../helper';

/**
 * @param container
 * @param data
 */
export async function Bar(container: HTMLElement, data: Data): Promise<number> {
  const startTime = performance.now();

  const chart = new Chart({
    container,
    autoFit: true,
  });

  chart.data(data);
  chart.interval().position(`${X_FIELD}*${Y_FIELD}`);

  chart.render();
  const endTime = performance.now();

  await sleep();

  await block();

  chart.destroy();
  // 返回最后的时间
  return endTime - startTime;
}
