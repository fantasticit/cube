import React from 'react';
import { Select } from 'antd';
import style from './index.module.scss';

export const SelectEditor = ({ schema, value, onChange }) => {
  let { options = [] } = schema;
  options = options.map((option) => {
    return typeof option === 'object' ? option : { label: option, value: option };
  });

  return (
    <div className={'prop-item-editor-wrapper'}>
      <p>
        {schema.title || '单选'}
        <span className={style.desc}>{schema.desc}</span>
      </p>
      <div>
        <Select onChange={onChange} value={value} style={{ width: '100%' }}>
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};
