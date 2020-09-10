import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { transformStyle } from '@/plugins/shared';

export const JSONSchemaForm = ({
  // store,
  style,
  schema,
  data,
  layout,
  showLoading,
  submitText,
  onSubmit,
  submitSuccessText,
}) => {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);

  const onFinish = useCallback(
    (values) => {
      const promise = onSubmit(values);
      if (promise && promise.then) {
        setLoading(true);
        promise
          .then(() => {
            submitSuccessText && message.success(submitSuccessText);
          })
          .catch((e) => {
            message.error('请求失败：', e.message || e);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [onSubmit, submitSuccessText]
  );

  /* eslint-disable prefer-const */
  let { title = '', description = '', required = [], properties = null } = schema;
  if (!properties) {
    properties = Object.keys(typeof data === 'object' ? data : {}).reduce((a, c) => {
      a[c] = {
        type: typeof data[c],
        key: c,
        title: c,
      };
      return a;
    }, {});
    schema.properties = properties;
  }

  useEffect(() => {
    if (!form.current) {
      return;
    }

    if (typeof data !== 'object') {
      form.current.resetFields();
    } else {
      form.current.setFieldsValue(data);
    }
  }, [data]);

  return (
    <div style={transformStyle(style)}>
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
      <Form name="basic" layout={layout} ref={form} onFinish={onFinish}>
        {Object.keys(properties).map((key) => {
          const property = properties[key];
          return (
            <Form.Item
              fieldKey={key}
              key={key}
              name={key}
              label={property.title}
              hidden={property.hidden}
              rules={[{ required: required.includes(key), message: '请输入' }]}
            >
              <Input />
            </Form.Item>
          );
        })}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={showLoading && loading}>
            {submitText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

JSONSchemaForm.componentInfo = {
  name: 'JSONSchemaForm',
};

JSONSchemaForm.defaultProps = {
  schema: {
    title: 'A registration form',
    description: 'A simple form example.',
    type: 'object',
    required: [],
    properties: {},
  },
  data: '',
  onSubmit: '',
  submitText: '提交',
  submitSuccessText: '',
  showLoading: true,
  layout: 'vertical',
};

JSONSchemaForm.schema = {
  schema: {
    title: 'Schema',
    type: 'json',
  },
  data: {
    title: '数据',
    type: 'text',
  },
  layout: {
    title: '文本对齐',
    type: 'select',
    options: ['horizontal', 'vertical', 'inline'],
  },
  onSubmit: {
    title: '提交事件',
    type: 'text',
  },

  showLoading: {
    title: '提交时加载',
    type: 'switch',
  },
  submitText: {
    title: '提交按钮文字',
    type: 'text',
  },
  submitSuccessText: {
    title: '提交成功文字',
    type: 'text',
  },
};
