import React from 'react';
import { InputNumber } from 'antd';

export const NumberEditor = ({ schema, value, onChange }) => {
  const { min = -Infinity, flexDirection = 'row', alignItems = 'start' } = schema;

  return (
    <div
      className={'prop-item-editor-wrapper'}
      style={{
        display: 'flex',
        flexDirection,
        justifyContent: 'space-between',
        alignItems,
      }}
    >
      <span>
        {schema.title || '文本'}
        <span>{schema.desc}</span>
      </span>
      <div>
        <InputNumber value={value} onChange={onChange} min={min} />
      </div>
    </div>
  );
};
