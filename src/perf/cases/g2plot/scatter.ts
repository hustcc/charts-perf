import { Scatter as ScatterG2plot } from '@antv/g2plot';
import { Data } from '../../../types';
import { Z_FIELD, Y_FIELD, size, sleep } from '../../../helper';

/**
 * @param container
 * @param data
 */
export async function Scatter(container: HTMLElement, data: Data): Promise<number> {
  const startTime = performance.now();

  const scatter = new ScatterG2plot(container, {
    data,
    xField: Z_FIELD,
    yField: Y_FIELD,
    ...size,
  });

  scatter.render();

  const endTime = performance.now();

  await sleep();

  scatter.destroy();
  // 返回最后的时间
  return endTime - startTime;
}
