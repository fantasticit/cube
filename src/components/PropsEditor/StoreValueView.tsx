import React, { useMemo } from 'react';
import { AutoComplete, Popover } from 'antd';
import style from './index.module.scss';
import dynamic from 'next/dynamic';
const ReactJson = dynamic(() => import('react-json-view'));

const resultStyle = { maxWidth: '50vw', maxHeight: '60vh', padding: 5, overflow: 'auto' };

export const StoreValueView = ({ store, visible, value, onChange, children }) => {
  const Result = useMemo(() => {
    if (!value) {
      return null;
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
      return null;
    }

    return typeof json === 'object' ? (
      <ReactJson src={json} style={resultStyle} />
    ) : (
      <div style={resultStyle}>{json}</div>
    );
  }, [store, value]);

  return (
    <Popover
      placement={'left'}
      visible={visible}
      content={<div className={style.resultWrapper}>{Result}</div>}
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
