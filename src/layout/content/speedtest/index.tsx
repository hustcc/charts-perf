import React, { useState } from 'react';
import { Button, Select } from 'antd';
import { Line as LineG2plot, Column as ColumnG2plot, Scatter as ScatterG2plot, Plot } from '@antv/g2plot';
import './index.less';

const TYPES = ['Apple', 'Orange', 'Banana', 'Pear'];

export const Speedtest = () => {
  const ref = React.useRef();
  const plot = React.useRef<Plot<any>>();
  const interval = React.useRef<any>();
  const date = React.useRef<Date>(new Date(0));

  const [streaming, updateStreaming] = useState(false);
  const [DataPoints, updateDataPoints] = useState(5000);
  const [chartType, updateChartType] = useState('line');
  const [streamingPoints, updateStreamingPoints] = useState(100);
  const [streamingInterval, updateStreamingInterval] = useState(20);
  const [renderTime, updateRenderTime] = useState(0);
  const [streamingRenderTime, updateStreamingRenderTime] = useState(0);

  const CtorMap = {
    line: LineG2plot,
    column: ColumnG2plot,
    scatter: ScatterG2plot,
  };

  const perfData = (start = 0, end = DataPoints) => {
    return new Array(end - start).fill(0).map((_, idx) => {
      const x = `${date.current.toLocaleDateString()}`;
      date.current.setTime(date.current.getTime() + 1000 * 60 * 60 * 24);
      return { x, y: Math.random() < 0.1 ? 0 : 1000 * Math.random(), type: TYPES[idx % 4] };
    });
  };

  const data = React.useMemo(() => {
    date.current = new Date(0);
    return perfData(0, DataPoints);
  }, [DataPoints]);

  function render() {
    if (plot.current) {
      plot.current.destroy();
      plot.current = null;
    }

    const startTime = performance.now();
    plot.current = new CtorMap[chartType](ref.current, {
      data,
      xField: 'x',
      yField: 'y',
      seriesField: 'type',
      point: { size: 0 },
    });
    plot.current.render();
    const endTime = performance.now();
    updateRenderTime(endTime - startTime);

    // 置空
    updateStreamingRenderTime(0);
  }

  React.useEffect(() => render(), [chartType, data]);

  const startStreaming = () => {
    if (!plot.current) return;

    let count = 0;
    let total = 0;
    interval.current = setInterval(() => {
      const appendData = perfData(DataPoints, DataPoints + streamingPoints);
      const newData = data.slice(streamingPoints).concat(appendData);
      count++;

      const st = performance.now();
      plot.current.changeData(newData);
      const et = performance.now();
      total += et - st;
      updateStreamingRenderTime(Math.floor(total / count));
    }, streamingInterval);
  };

  const stopStreaming = () => {
    clearInterval(interval.current);
    interval.current = null;
  };

  const toggleStreaming = () => {
    stopStreaming();
    if (!streaming) {
      startStreaming();
      updateStreaming(true);
    } else {
      updateStreaming(false);
    }
  };

  React.useEffect(() => {
    if (streaming) {
      stopStreaming();
      startStreaming();
    }
  }, [streamingPoints, streamingInterval]);

  return (
    <div className="speedtest-content">
      <div ref={ref} style={{ height: '400px' }} />
      <div>
        <div>
          <div className="name">Chart Settings</div>
          <Select
            value={chartType}
            style={{ width: 200, marginTop: '8px' }}
            options={[
              { label: 'Line', value: 'line' },
              { label: 'Column', value: 'column' },
              { label: 'Scatter', value: 'scatter' },
            ]}
            onChange={(e) => updateChartType(e)}
          />
          <Select
            value={DataPoints}
            style={{ width: 200, marginTop: '8px' }}
            options={[
              { label: '5,00 Data Points', value: 500 },
              { label: '5,000 Data Points', value: 5000 },
              { label: '10,000 Data Points', value: 10000 },
              { label: '15,000 Data Points', value: 15000 },
              { label: '20,000 Data Points', value: 20000 },
              { label: '25,000 Data Points', value: 25000 },
              { label: '40,000 Data Points', value: 40000 },
              { label: '50,000 Data Points', value: 50000 },
              { label: '60,000 Data Points', value: 60000 },
              { label: '70,000 Data Points', value: 70000 },
              { label: '80,000 Data Points', value: 80000 },
            ]}
            onChange={(e) => updateDataPoints(e)}
          />
          <div className="description">
            <div className="flex">Rendering {DataPoints} Data Points</div>
            <div className="flex">
              Chart rendering: <span style={{ color: '#873bf4' }}>{renderTime ? Math.floor(renderTime) : '-'} ms</span>
            </div>
          </div>
          <Button type="primary" onClick={render} style={{ marginBottom: '8px' }}>
            刷新
          </Button>
        </div>
        <div>
          <div className="name">Streaming</div>
          <Select
            value={streamingPoints}
            style={{ width: 200, marginTop: '8px' }}
            options={[
              { label: '100 Data Points', value: 100 },
              { label: '500 Data Points', value: 500 },
              { label: '1,000 Data Points', value: 1000 },
              { label: '5,000 Data Points', value: 5000 },
              { label: '10,000 Data Points', value: 10000 },
              { label: '15,000 Data Points', value: 15000 },
              { label: '20,000 Data Points', value: 20000 },
            ]}
            onChange={(e) => updateStreamingPoints(e)}
          />
          <Select
            value={streamingInterval}
            style={{ width: 200, marginTop: '8px' }}
            options={[
              { label: '20ms', value: 20 },
              { label: '60ms', value: 60 },
              { label: '80ms', value: 80 },
              { label: '100ms', value: 100 },
              { label: '1s', value: 1000 },
              { label: '2s', value: 2000 },
              { label: '4s', value: 4000 },
              { label: '5s', value: 5000 },
            ]}
            onChange={(e) => updateStreamingInterval(e)}
          />
          <Button type="primary" onClick={toggleStreaming} style={{ marginTop: '8px' }}>
            {!streaming ? 'Start' : 'Stop'} Streaming
          </Button>
          <div className="description">
            <div className="flex">Streaming {streamingPoints} Data Points</div>
            <div className="flex">
              Average rendering time:{' '}
              <span style={{ color: '#873bf4' }}>{streamingRenderTime ? Math.floor(streamingRenderTime) : '-'} ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
