import _ from 'lodash';
import { getPerfCase } from '../cases';
import { createDIV, getSeq, removeDIV, mock } from '../../helper';
import { ChartType, PerfData, PerfDatum, Data, ChangeOption, DataAttributeType } from '../../types';
import { CHART_TYPES } from '../../common/const';

/**
 * 运行一个单测
 * @param engine 渲染引擎
 * @param type 性能测试 case
 * @param length 数据条数
 */
async function runPerfCase(engine: string, type: ChartType, length: number, mockData: Data): Promise<PerfDatum> {
  const perfCase = getPerfCase(engine, type);

  // 创建容器
  const div = createDIV(document.getElementById('renderDom'));

  // 执行
  const time = await perfCase(div, mockData.slice(0, length)); // TODO 优化一下 slice，具备有一定的随机性

  removeDIV(div);

  return {
    engine,
    length,
    time,
    type,
  };
}

/**
 * 运行显示进度
 * @param engine 渲染引擎
 * @param type 性能测试 case
 * @param length 数据条数
 * @param amount 总条数
 * @param count 数据条数
 */
function changeBreadCrumb({ engine, type, length, amount, count, total }: ChangeOption) {
  // 图表文本
  const chartType = _.find(CHART_TYPES, ({ value }) => _.isEqual(value, type))?.label;
  // 文本显示
  _.set(
    document.getElementsByClassName('accounted'),
    '[0].innerHTML',
    `render <b>${chartType}</b> on <b>${engine}</b>, ${length} / ${total} `
  );
  const percent = `${_.round((count / amount) * 100, 2)}%`;
  // 完成度显示
  _.set(document.getElementsByClassName('progress'), '[0].innerHTML', `Finished: <span>${percent}</span> `);
  // 进度条样式
  _.set(document.getElementsByClassName('progressBackground'), '[0].style.width', percent);
}

/**
 * 具体的执行
 * @param engines
 * @param types
 */
export async function run(engines: string[], types: ChartType[], dataAttribute: DataAttributeType): Promise<PerfData> {
  const r: PerfData = {};
  const seq = getSeq(..._.map(dataAttribute, (item) => item.num));
  // 最大的
  const mockData = mock(seq[seq.length - 1]);
  const total = mockData.length;

  const amount = seq.length * engines.length * types.length; // 总条数
  let count = 0; // 记录当前条数

  for (const engine of engines) {
    for (const type of types) {
      for (const length of seq) {
        const perfDatum = await runPerfCase(engine, type, length, _.shuffle(mockData));

        count++;
        changeBreadCrumb({ engine, type, length, amount, count, total });

        if (!r[type]) {
          r[type] = [];
        }

        r[type].push(perfDatum);
      }
    }
  }

  return r;
}
