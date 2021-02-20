import { PerfCase } from '../../types';
import { Line as G2PlotLine } from './g2plot/line';
import { Area as G2PlotArea } from './g2plot/area';
import { Bar as G2PlotBar } from './g2plot/bar';
import { Scatter as G2PlotScatter } from './g2plot/scatter';

import { Line as G2Line } from './g2/line';
import { Area as G2Area } from './g2/area';
import { Bar as G2Bar } from './g2/bar';
import { Scatter as G2Scatter } from './g2/scatter';

import { Line as EchartsLine } from './echarts/line';
import { Area as EchartsArea } from './echarts/area';
import { Bar as EchartsBar } from './echarts/bar';
import { Scatter as EchartsScatter } from './echarts/scatter';

import { Line as HighchartsLine } from './highcharts/line';
import { Area as HighchartsArea } from './highcharts/area';
import { Bar as HighchartsBar } from './highcharts/bar';
import { Scatter as HighchartsScatter } from './highcharts/scatter';

// 所有的 case 管理
const CASES = new Map<string, PerfCase>();

// 注册所有的 case
CASES.set('g2plot-line', G2PlotLine);
CASES.set('g2plot-area', G2PlotArea);
CASES.set('g2plot-bar', G2PlotBar);
CASES.set('g2plot-scatter', G2PlotScatter);

CASES.set('g2-line', G2Line);
CASES.set('g2-area', G2Area);
CASES.set('g2-bar', G2Bar);
CASES.set('g2-scatter', G2Scatter);

CASES.set('echarts-line', EchartsLine);
CASES.set('echarts-area', EchartsArea);
CASES.set('echarts-bar', EchartsBar);
CASES.set('echarts-scatter', EchartsScatter);

CASES.set('highcharts-line', HighchartsLine);
CASES.set('highcharts-area', HighchartsArea);
CASES.set('highcharts-bar', HighchartsBar);
CASES.set('highcharts-scatter', HighchartsScatter);

/**
 * 从 case 池子中获取一个单测方法
 * @param engine
 * @param type
 */
export function getPerfCase(engine: string, type: string): PerfCase {
  return CASES.get(`${engine.toLowerCase()}-${type.toLowerCase()}`);
}
