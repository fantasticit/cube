import React, { useMemo } from 'react';
import { AutoComplete, Popover } from 'antd';
import { UnControlled as CodeMirror } from 'react-codemirror2';

export const StoreValueView = ({ store, visible, value, onChange, children }) => {
  const result = useMemo(() => {
    if (!value) {
      return '';
    }

    const path = value.replace(/\.$/, '').replace(/^{{/, '').replace(/}}$/, '');
    let json = store.getValue(`{{${path}}}`);

    if (typeof json === 'boolean') {
      json = String(json);
    }

    if (
      json === '' ||
      json === value ||
      json === `{{}}` ||
      json === `}` ||
      json === `{{${value}}}`
    ) {
      return '';
    }

    return JSON.stringify(json, null, 2);
  }, [store, value]);

  return (
    <Popover
      placement={'left'}
      visible={result && result.length && visible}
      content={
        <div className={'store-value-view-wrapper'}>
          <CodeMirror
            value={result}
            options={{
              mode: 'javascript',
              theme: 'default',
              lineNumbers: true,
              readOnly: 'nocursor',
            }}
          />
        </div>
      }
    >
      <AutoComplete
        style={{ width: '100%' }}
        backfill={true}
        options={store.match(value)}
        onChange={(value) => {
          onChange(value);
        }}
      >
        {children}
      </AutoComplete>
    </Popover>
  );
};
