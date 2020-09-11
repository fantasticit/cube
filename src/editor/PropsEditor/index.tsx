import React, { useState, useEffect } from 'react';
import clone from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { ConfigProvider, Tabs } from 'antd';
import { STYLE_SCHEMA } from '@/plugins';
// import { CloseOutlined } from '@ant-design/icons';
import { renderEditorItem } from './renderEditorItem';
import { Font } from './Style/Font';
import { WidthHeight } from './Style/WidthHeight';
import { Border } from './Style/Border';
import styles from './index.module.scss';

const { TabPane } = Tabs;

const Empty = <div className={styles.empty}>请先选中组件</div>;

export const PropsEditor = ({ active, store, props: defaultProps, schema, onChange }) => {
  // const [, setV] = useState(-1);
  // const [opend, setOpend] = useState(false);
  const [props, setProps] = useState(defaultProps);
  const { style = {}, ...restProps } = props;

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

  const renderStyleProp = (key) =>
    renderEditorItem(
      key,
      style[key],
      STYLE_SCHEMA[key],
      (key, newValue) => {
        const newProps = clone(props);
        newProps.style = newProps.style || {};
        newProps.style[key] = newValue;
        setProps(newProps);
        onChange(newProps);
      },
      store
    );

  return (
    <div className={'props-editor'}>
      <Tabs defaultActiveKey="1x">
        <TabPane tab="配置" key="1">
          {active
            ? Object.keys(schema).map((key) => {
                return renderEditorItem(
                  key,
                  restProps && restProps[key],
                  schema[key],
                  handle,
                  store
                );
              })
            : Empty}
        </TabPane>
        <TabPane tab="样式" key="2">
          {active ? (
            <ConfigProvider componentSize="middle">
              <WidthHeight render={renderStyleProp} />
              <Border render={renderStyleProp} />
              <Font render={renderStyleProp} />
            </ConfigProvider>
          ) : (
            Empty
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};
