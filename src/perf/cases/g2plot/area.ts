import { Area as AreaG2plot } from '@antv/g2plot';
import { Data } from '../../../types';
import { X_FIELD, Y_FIELD, size, sleep } from '../../../helper';

/**
 * @param container
 * @param data
 */
export async function Area(container: HTMLElement, data: Data): Promise<number> {
  const startTime = performance.now();

  const area = new AreaG2plot(container, {
    data,
    xField: X_FIELD,
    yField: Y_FIELD,
    ...size,
  });

  area.render();
  const endTime = performance.now();

  await sleep();

  area.destroy();
  // 返回最后的时间
  return endTime - startTime;
}
