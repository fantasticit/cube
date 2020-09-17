import React, { useState } from 'react';
import { Input } from 'antd';
import { StoreValueView } from '../../StoreValueView';

export const TextareaEditor = ({ schema, value, onChange, store }) => {
  const { placeholder } = schema;
  const [focused, setFocused] = useState(false);

  return (
    <div className={'prop-item-editor-wrapper'}>
      <p>
        {schema.title || '文本'}
        <span>{schema.desc}</span>
      </p>
      <div>
        <StoreValueView store={store} visible={focused} value={value} onChange={onChange}>
          <Input.TextArea
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            value={value}
            autoSize={{ minRows: 2, maxRows: 8 }}
            onChange={(e) => onChange(e.target.value)}
          />
        </StoreValueView>
      </div>
    </div>
  );
};
