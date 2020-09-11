import React, { useCallback, useState, useRef, useEffect } from 'react';
import { List, Button, Form, Input, Modal, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import isEqual from 'lodash/isEqual';
import { observer } from 'mobx-react';
import { Store } from '@/store';
import styles from './index.module.scss';

const { Option } = Select;

interface IProps {
  store: Store;
}

const methods = ['get', 'post', 'patch', 'delete'];

export const Apis: React.FC<IProps> = observer(({ store }) => {
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
    <div className={styles.wrapper}>
      <Button block={true} onClick={() => setToAdd(true)}>
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
                onClick={() => setToEdited(item)}
              />,
            ]}
          >
            {item.name}
          </List.Item>
        )}
      />
      <Modal title={'接口'} visible={toAdd || Boolean(toEdited)} onCancel={close} footer={null}>
        <Form
          name="basic"
          layout="vertical"
          ref={form}
          initialValues={toAdd ? null : toEdited}
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
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
          <Form.Item label="URL" name="url" rules={[{ required: true, message: '请输入' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Method" name="method" rules={[{ required: true, message: '选择' }]}>
            <Select>
              {methods.map((method) => (
                <Option key={method} value={method}>
                  {method}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
