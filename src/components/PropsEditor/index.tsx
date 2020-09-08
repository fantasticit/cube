import React, { useState, useEffect } from 'react';
import clone from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
// import { CloseOutlined } from '@ant-design/icons';
import { renderEditorItem } from './renderEditorItem';
import style from './index.module.scss';

export const PropsEditor = ({ props: defaultProps, schema, onChange }) => {
  // const [, setV] = useState(-1);
  // const [opend, setOpend] = useState(false);
  const [props, setProps] = useState(defaultProps);

  useEffect(() => {
    if (isEqual(defaultProps, props)) {
      return;
    }
    setProps(defaultProps);
  }, [defaultProps, props]);

  const handle = (key, newValue) => {
    const newProps = clone(props);
    newProps[key] = newValue;
    setProps(newProps);
    onChange(newProps);
  };

  return (
    <div className={style.container}>
      <header>
        <span>Inspector</span>
        {/* <CloseOutlined
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setOpend(false);
          }}
        /> */}
      </header>
      <ul>
        {Object.keys(schema).map((key) => {
          return (
            <li key={key}>{renderEditorItem(key, props && props[key], schema[key], handle)}</li>
          );
        })}
      </ul>
    </div>
  );
};
