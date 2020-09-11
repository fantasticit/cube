import React from 'react';
import { Radio } from 'antd';

export const RadioEditor = ({ schema, value, onChange }) => {
  /* eslint-disable */
  let { options = [], ...rest } = schema;
  options = options.map((option) => {
    return typeof option === 'object' ? option : { label: option, value: option };
  });

  return (
    <div className={'prop-item-editor-wrapper'}>
      <p>
        {schema.title || '单选'}
        <span>{schema.desc}</span>
      </p>
      <div>
        <Radio.Group
          options={options}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={value}
          {...rest}
        ></Radio.Group>
      </div>
    </div>
  );
};
