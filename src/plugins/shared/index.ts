import React from 'react';

export const fontCss: React.CSSProperties = {
  fontSize: 14,
  color: '#333',
  textAlign: 'left',
};
export const fontCssSchema = {
  title: '字体',
  fontSize: {
    title: '大小',
    type: 'number',
  },
  color: {
    title: '颜色',
    type: 'color',
  },
  textAlign: {
    title: '对齐方式',
    type: 'select',
    options: ['left', 'center', 'right'],
  },
};

export const paddingCss: React.CSSProperties = {
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
};
export const paddingCssSchema = {
  title: '内边距',
  type: 'children',
  paddingTop: {
    title: '上边距',
    type: 'number',
    min: 0,
  },
  paddingRight: {
    title: '右边距',
    type: 'number',
    min: 0,
  },
  paddingBottom: {
    title: '下边距',
    type: 'number',
    min: 0,
  },
  paddingLeft: {
    title: '左边距',
    type: 'number',
    min: 0,
  },
};

export const marginCss: React.CSSProperties = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
};
export const marginCssSchema = {
  title: '外边距',
  type: 'children',
  marginTop: {
    title: '上边距',
    type: 'number',
    min: 0,
  },
  marginRight: {
    title: '右边距',
    type: 'number',
    min: 0,
  },
  marginBottom: {
    title: '下边距',
    type: 'number',
    min: 0,
  },
  marginLeft: {
    title: '左边距',
    type: 'number',
    min: 0,
  },
};

const COMMON_PROPS = {
  style: {
    width: '100%',
    height: 'auto',
    bordered: false,
    boxShadow: false,
    margin: marginCss,
    padding: paddingCss,
    font: fontCss,
  },
};

const COMMON_SCHEMA = {
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
      bordered: {
        title: '边框',
        type: 'switch',
      },
      boxShadow: {
        title: '阴影',
        type: 'switch',
      },
      margin: marginCssSchema,
      padding: paddingCssSchema,
      font: fontCssSchema,
    },
  },
};

export const getProps = (props) => {
  return Object.assign(Object.create(null), COMMON_PROPS, props);
};

export const getSchema = (schema) => {
  return Object.assign(Object.create(null), schema, COMMON_SCHEMA);
};

export const transformStyle = (style) => {
  const ret = {} as React.CSSProperties;

  ret.width = style.width;
  ret.height = style.height;

  if (style.font) {
    Object.assign(ret, style.font);
  }

  if (style.boxShadow) {
    ret.boxShadow = '0 0 16px rgba(0,0,0,.03)';
  }

  if (style.bordered) {
    ret.border = '1px solid #ddd';
  }

  if (style.padding) {
    ret.padding = ``;
    void ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].forEach((key) => {
      ret.padding += ' ' + style.padding[key] + 'px';
    });
  }

  if (style.margin) {
    ret.margin = ``;
    void ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'].forEach((key) => {
      ret.margin += ' ' + style.margin[key] + 'px';
    });
  }

  return ret;
};
