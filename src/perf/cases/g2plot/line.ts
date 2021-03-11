import { Line as LineG2plot } from '@antv/g2plot';
import { Data } from '../../../types';
import { X_FIELD, Y_FIELD, sleep, block } from '../../../helper';

/**
 * @param container
 * @param data
 */
export async function Line(container: HTMLElement, data: Data): Promise<number> {
  const startTime = performance.now();

  const line = new LineG2plot(container, {
    data,
    xField: X_FIELD,
    yField: Y_FIELD,
  });

  line.render();

  const endTime = performance.now();

  await sleep();

  await block();

  line.destroy();
  // 返回最后的时间
  return endTime - startTime;
}
