export type Datum = Record<string, any>;
export type Data = Datum[];

/**
 * 性能测试的结果记录
 */
export type PerfDatum = {
  readonly engine: string;
  readonly type: ChartType;
  readonly length: number;
  readonly time: number;
};

export type ChartType = 'Line' | 'Area' | 'Bar' | 'Scatter';

export type PerfData = Partial<Record<ChartType, PerfDatum[]>>;

/**
 * 性能测试 case 的定义
 */
export type PerfCase = (container: HTMLElement, data: Data) => Promise<number>;

export interface ChangeOption extends Omit<PerfDatum, 'time'> {
  readonly amount: number;
  readonly count: number;
  readonly total: number;
}

export type OneDataType = { label: string; value: 'start' | 'end' | 'step'; num: number };

export type DataAttributeType = OneDataType[];
