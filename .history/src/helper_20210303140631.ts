import * as _ from 'lodash';
import { M } from 'miz'; // ES6

export const sleepThisObj = {
  paused: false,
};

/**
 * 创建一个 div 节点
 */
export const createDIV = (parent: HTMLElement): HTMLElement => {
  const div = document.createElement('div');

  parent.appendChild(div);

  return div;
};

/**
 * 移除 dom 元素
 * @param dom
 */
export const removeDIV = (dom: HTMLElement): void => dom.remove();

/**
 * 获得测试的数据长度序列（按需配置）
 * @param start
 * @param end
 * @param step
 */
export const getSeq = (start = 200, end = 10000, step = 200): number[] => {
  const r = [];
  for (let i = start; i <= end; i += step) {
    r.push(i);
  }

  return r;
};

export const X_FIELD = 'x';
export const Y_FIELD = 'y';
export const Z_FIELD = 'z';

// 容器宽高
export const size = {
  // 长宽
  height: 500,
  width: 800,
};

/**
 * 数据 mock，根据数据量缓存
 * @param length
 * @param x
 * @param y
 */
export const mock = _.memoize((length: number, x: string = X_FIELD, y: string = Y_FIELD, z: string = Z_FIELD) =>
  M.arrayOf(
    M.shape({
      [x]: M.string(10),
      [y]: M.number(10, 1000),
      [z]: M.number(10, 1000),
    }),
    length
  ).mock()
);

// 延迟
export function sleep(ms: number = 50): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}

// 阻塞 初始化不需要延迟 阻塞ms为100
export function block(ms: number = 0): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(async () => {
      if (!_.isUndefined(sleepThisObj?.paused) && sleepThisObj?.paused) {
        await block(100);
      }
      resolve(true);
    }, ms);
  });
}

// 移动还是pc
export function getUseType() {
  const agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  const userAgentInfo = navigator.userAgent;
  return _.some(agents, item => _.includes(userAgentInfo, item)) ? 'moblie' : 'pc';
}
