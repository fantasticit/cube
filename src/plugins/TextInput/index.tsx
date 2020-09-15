import React, { useMemo, useCallback } from 'react';
import { Input } from 'antd';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const TextInput = ({
  store,
  editorProps,
  style,
  type,
  hidden,
  children,
  onClick,
  runtimeName,
  onPressEnter,
  ...props
}) => {
  const { bindKey, indicator, ...restEditorProps } = editorProps;

  const Component = useMemo(() => {
    switch (type) {
      case 'Search':
        return Input.Search;
      case 'Password':
        return Input.Password;
      case 'Input':
      default:
        return Input;
    }
  }, [type]);

  const onSubmit = useCallback(
    (e) => {
      const value = e.target.value;
      onPressEnter && onPressEnter(value);
    },
    [onPressEnter]
  );

  return (
    <span {...restEditorProps} style={style}>
      {indicator}
      <Component style={{ display: 'inline-block' }} {...props} onPressEnter={onSubmit} />
    </span>
  );
};

TextInput.componentInfo = {
  name: 'TextInput',
  title: '文本输入',
  description: '用文本输入控制查询或其他动作',
  icon: 'TextInputIcon',
};

TextInput.defaultProps = {
  placeholder: '',
  type: 'Input',
  onPressEnter: '',
};

TextInput.schema = {
  placeholder: {
    title: 'Placeholder',
    type: 'text',
  },
  type: {
    title: '类型',
    type: 'select',
    options: ['Input', 'Search', 'Password'],
  },
  onPressEnter: {
    title: '提交时运行',
    type: 'text',
  },
};
