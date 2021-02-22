import React from 'react';
import _ from 'lodash';
import { Form, Button, Checkbox, Row, InputNumber } from 'antd';
import { ENGINES, CHART_TYPES } from '../../../common/const';
import { ChartType, DataAttributeType, OneDataType } from '../../../types';

export type IConfig = {
  engines: string[];
  types: ChartType[];
};

type Props = {
  readonly loading: boolean;
  readonly engines: string[];
  readonly types: ChartType[];
  readonly inputNumberData: DataAttributeType;
  readonly onOk: () => void; // 执行运行
  readonly onChange: (config: IConfig) => void;
  readonly onInputNumberChange: (value: OneDataType, index: number) => void;
};

export function Config(props: Props) {
  const { loading, engines, types, onChange, onInputNumberChange, inputNumberData } = props;

  function onOk() {
    props.onOk();
  }

  function onEnginesChange(checked) {
    onChange({
      engines: checked,
      types,
    });
  }

  function onTypesChange(checked) {
    onChange({
      engines,
      types: checked,
    });
  }

  const allInputNumberStyle = {
    precision: 0,
    step: 100,
  };

  return (
    <>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
        <Form.Item name="engines" label="Chart Engines">
          <Checkbox.Group>
            <Row>
              <Checkbox.Group options={ENGINES} value={engines} onChange={onEnginesChange} />
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="chartList" label="Chart Types">
          <Checkbox.Group>
            <Row>
              <Checkbox.Group options={CHART_TYPES} value={types} onChange={onTypesChange} />
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="Render Data Size">
          {
            _.map(inputNumberData, (item, index) =>
              <Form.Item noStyle key={item.value}>
                <span className="ant-form-text">{item.label}</span>
                <InputNumber size="small"
                  {...allInputNumberStyle}
                  value={item.num}
                  onChange={(value) => onInputNumberChange({ ...item, num: value as number }, index)} />
              </Form.Item>)
          }
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
          <Button loading={loading} type="primary" onClick={!loading && onOk}>
            Run Performance Test
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
