import React, { useState, useEffect, useCallback } from 'react';
import isEqual from 'lodash/isEqual';
import { Button } from 'antd';
import { Controlled as CodeMirror } from 'react-codemirror2';
import style from './index.module.scss';

let lastValue = null;

export const JSONEditor = ({ schema, value: propsValue, onChange }) => {
  const [value, setValue] = useState(JSON.stringify(propsValue, null, 2));

  useEffect(() => {
    if (isEqual(lastValue, propsValue)) {
      return;
    }

    lastValue = propsValue;
    setValue(JSON.stringify(propsValue, null, 2));
  }, [propsValue]);

  const onClick = useCallback(() => {
    let json = null;
    /* eslint-disable no-empty */
    try {
      json = JSON.parse(value);
    } catch (e) {}
    json && onChange(json);
  }, [value, onChange]);

  return (
    <div className={'prop-item-editor-wrapper'}>
      <p>
        {schema.title || '文本'}
        <span className={style.desc}>{schema.desc}</span>
      </p>
      <main>
        <CodeMirror
          value={value}
          options={{
            mode: 'javascript',
            theme: 'default',
            lineNumbers: true,
          }}
          onBeforeChange={(_, __, code) => {
            setValue(code);
          }}
        />
        <footer style={{ color: 'inherit' }}>
          <Button size="small" onClick={onClick} style={{ margin: '10px 0', color: 'inherit' }}>
            确认
          </Button>
        </footer>
      </main>
    </div>
  );
};
