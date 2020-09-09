import React from 'react';
import { Button as AButton } from 'antd';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const Button = ({ runtimeName, store, ...props }) => {
  return <AButton {...props} />;
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
