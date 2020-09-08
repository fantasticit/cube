import React from 'react';
import { Button as AButton } from 'antd';

export const Button = (props) => {
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
