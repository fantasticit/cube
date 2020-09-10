import React, { useState } from 'react';
import { Input } from 'antd';
import { StoreValueView } from '../../StoreValueView';
import style from './index.module.scss';

export const TextareaEditor = ({ schema, value, onChange, store }) => {
  const { placeholder } = schema;
  const [focused, setFocused] = useState(false);

  return (
    <div className={style.wrapper}>
      <p>
        {schema.title || '文本'}
        <span className={style.desc}>{schema.desc}</span>
      </p>
      <div>
        <StoreValueView store={store} visible={focused} value={value} onChange={onChange}>
          <Input.TextArea
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            value={value}
            autoSize={true}
            onChange={(e) => onChange(e.target.value)}
          />
        </StoreValueView>
      </div>
    </div>
  );
};
