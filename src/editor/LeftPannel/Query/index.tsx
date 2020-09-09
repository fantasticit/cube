import React, { useCallback, useState, useRef, useEffect } from 'react';
import { List, Button, Form, Input, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { Store } from '@/store';
import styles from './index.module.scss';

interface IProps {
  store: Store;
}

export const Query: React.FC<IProps> = observer(({ store }) => {
  const queries = store.queries;
  const form = useRef(null);
  const [toAdd, setToAdd] = useState(false);
  const [toEdited, setToEdited] = useState(null);

  const close = useCallback(() => {
    setToAdd(false);
    setToEdited(null);
  }, []);

  const onFinish = useCallback(
    (values) => {
      toAdd ? store.addQuery(values) : alert('暂不支持编辑');
      close();
    },
    [toAdd, close, store]
  );

  useEffect(() => {
    if (toEdited && form.current) {
      form.current.setFieldsValue(toEdited);
    }
  }, [toEdited]);

  return (
    <div className={styles.wrapper}>
      <Button block={true} onClick={() => setToAdd(true)}>
        添加
      </Button>
      <List
        size="small"
        dataSource={queries}
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
        <Form name="basic" ref={form} initialValues={toAdd ? null : toEdited} onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: '请输入' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="URL" name="url" rules={[{ required: true, message: '请输入' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Method" name="method" rules={[{ required: true, message: '请输入' }]}>
            <Input />
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
