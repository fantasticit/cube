import React, { useCallback, useState, useRef, useEffect } from 'react';
import { List, Button, Form, Input, Popover, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import isEqual from 'lodash/isEqual';
import { observer } from 'mobx-react';
import { Store } from '@/store';
import { CodeIcon } from '.././../icons/Code';
import styles from './index.module.scss';

const { Option } = Select;

interface IProps {
  store: Store;
}

const methods = ['get', 'post', 'patch', 'delete'];

export const Apis: React.FC<IProps> = observer(({ store }) => {
  const ref = useRef<HTMLDivElement>();
  const apis = store.apiStore.apis;
  const names = apis.map((api) => api.name);
  const form = useRef(null);
  const [toAdd, setToAdd] = useState(false);
  const [toEdited, setToEdited] = useState(null);

  const close = useCallback(() => {
    setToAdd(false);
    setToEdited(null);
  }, []);

  const onFinish = useCallback(
    (values) => {
      if (toAdd) {
        store.apiStore.addApi(values);
      } else {
        if (!isEqual(toEdited, values)) {
          store.apiStore.updateApi(values);
        }
      }
      close();
    },
    [toAdd, toEdited, close, store]
  );

  useEffect(() => {
    if (form.current) {
      toAdd ? form.current.resetFields() : form.current.setFieldsValue(toEdited);
    }
  }, [toEdited, toAdd]);

  return (
    <Popover
      title={null}
      visible={toAdd || Boolean(toEdited)}
      placement={'rightBottom'}
      onVisibleChange={(v) => !v && close()}
      trigger={'click'}
      content={
        <Form
          name="basic"
          layout="vertical"
          className={styles.formWrapper}
          ref={form}
          initialValues={toAdd ? null : toEdited}
          onFinish={onFinish}
          style={{ width: 392, padding: 16 }}
        >
          <h2>
            <CodeIcon />
            <span>接口</span>
          </h2>
          <Form.Item
            label={
              <div className={styles.labelWrapper}>
                <h3>接口名称</h3>
                <p>为接口命名以便在页面中使用</p>
              </div>
            }
            name="name"
            rules={[
              { required: true, message: '请输入' },
              toEdited
                ? null
                : ({ getFieldValue }) => ({
                    validator() {
                      if (names.indexOf(getFieldValue('name')) < 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(`该接口名称已被占用`));
                    },
                  }),
            ].filter(Boolean)}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <div className={styles.labelWrapper}>
                <h3>请求类型</h3>
                <p>选择接口请求类型</p>
              </div>
            }
            name="method"
            rules={[{ required: true, message: '选择' }]}
          >
            <Select>
              {methods.map((method) => (
                <Option key={method} value={method}>
                  {method}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={
              <div className={styles.labelWrapper}>
                <h3>接口地址</h3>
                <p>输入接口服务地址</p>
              </div>
            }
            name="url"
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input autoFocus={true} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      }
    >
      <div ref={ref} className={styles.wrapper}>
        <Button
          block={true}
          onClick={() => {
            setToAdd(true);
            setToEdited(null);
          }}
        >
          添加
        </Button>
        <List
          size="small"
          dataSource={apis}
          renderItem={(item) => (
            <List.Item
              key={item.name}
              actions={[
                <EditOutlined
                  key="edit"
                  className={styles.editorWrapper}
                  onClick={() => {
                    setToAdd(false);
                    setToEdited(item);
                  }}
                />,
              ]}
            >
              {item.name}
            </List.Item>
          )}
        />
      </div>
    </Popover>
  );
});
