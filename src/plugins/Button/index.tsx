import React from 'react';
import { Button as AButton } from 'antd';
import { transformStyle } from '@/plugins/shared';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const Button = ({ runtimeName, store, path, style, onClick, ...props }) => {
  return (
    <span style={transformStyle(style)}>
      <AButton {...props} onClick={() => typeof onClick === 'function' && onClick()} />
    </span>
  );
};

Button.componentInfo = {
  name: 'Button',
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
