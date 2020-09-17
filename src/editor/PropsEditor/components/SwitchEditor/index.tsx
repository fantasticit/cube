import React from 'react';
import { Switch } from 'antd';

export const SwitchEditor = ({ schema, value, onChange }) => {
  return (
    <div
      className={'prop-item-editor-wrapper'}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <span>
        {schema.title || '开关'}
        <span>{schema.desc}</span>
      </span>
      <Switch checked={value} onChange={onChange} />
    </div>
  );
};
