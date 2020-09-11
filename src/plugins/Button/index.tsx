import React from 'react';
import { Button as AButton } from 'antd';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const Button = ({
  store,
  path,
  activePath,
  isActivePath,
  indicator,
  runtimeName,
  rootClassNames,
  style,
  onClick,
  ...props
}) => {
  return (
    <span style={style} className={rootClassNames} data-path={path} data-active-path={activePath}>
      {indicator}
      <AButton {...props} onClick={() => typeof onClick === 'function' && onClick()} />
    </span>
  );
};

Button.componentInfo = {
  name: 'Button',
  title: '按钮',
  description: '触发操作',
  icon: 'ButtonIcon',
};

Button.defaultProps = {
  children: '文案',
  loading: false,
};

Button.schema = {
  children: {
    title: '文案',
    type: 'text',
  },
  loading: {
    title: 'loading',
    type: 'text',
  },
  onClick: {
    title: '点击事件',
    type: 'text',
  },
};
