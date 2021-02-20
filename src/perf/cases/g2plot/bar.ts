import { Column as BarG2plot } from '@antv/g2plot';
import { Data } from '../../../types';
import { X_FIELD, Y_FIELD, size, sleep } from '../../../helper';

/**
 * @param container
 * @param data
 */
export async function Bar(container: HTMLElement, data: Data): Promise<number> {
  const startTime = performance.now();

  const bar = new BarG2plot(container, {
    data,
    xField: X_FIELD,
    yField: Y_FIELD,
    ...size,
  });

  bar.render();

  const endTime = performance.now();

  await sleep();

  bar.destroy();
  // 返回最后的时间
  return endTime - startTime;
}
