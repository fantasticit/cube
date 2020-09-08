import React, { useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import { Controlled as CodeMirror } from 'react-codemirror2';
import style from './index.module.scss';

let lastPropsValue = null;

export const JSONEditor = ({ schema, value: defaultValue, onChange }) => {
  const [value, setValue] = useState(JSON.stringify(defaultValue, null, 2));

  useEffect(() => {
    if (isEqual(defaultValue, lastPropsValue)) {
      return;
    }
    lastPropsValue = defaultValue;
    setValue(JSON.stringify(defaultValue, null, 2));
  }, [defaultValue]);

  return (
    <div className={style.wrapper}>
      <p>
        {schema.title || '文本'}
        <span className={style.desc}>{schema.desc}</span>
      </p>
      <div>
        <CodeMirror
          value={value}
          options={{
            mode: 'javascript',
            theme: 'default',
            lineNumbers: false,
          }}
          onBeforeChange={(_, __, code) => {
            setValue(code);
          }}
          onChange={(_, __, code) => {
            let value = null;
            /* eslint-disable no-empty */
            try {
              value = JSON.parse(code);
            } catch (e) {}
            value && onChange(value);
          }}
        />
      </div>
    </div>
  );
};
