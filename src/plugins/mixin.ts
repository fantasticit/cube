import React from 'react';

const COMMON_PROPS = {
  style: {
    width: 'auto',
    height: 'auto',
  },
  hidden: '',
};

const COMMON_SCHEMA = {
  hidden: {
    title: '隐藏',
    type: 'textarea',
  },
  style: {
    title: '基本样式',
    type: 'children',
    schema: {
      width: {
        title: '宽度',
        type: 'text',
      },
      height: {
        title: '高度',
        type: 'text',
      },
    },
  },
};

export const getProps = (props) => {
  return Object.assign(Object.create(null), COMMON_PROPS, props);
};

export const getSchema = (schema) => {
  return Object.assign(Object.create(null), schema, COMMON_SCHEMA);
};
