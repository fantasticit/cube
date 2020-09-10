import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { uuid } from 'utils/uuid';
import { Drawer, Tooltip } from 'antd';
import { CodeOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Store } from '@/store';
import { LeftPannel } from './LeftPannel';
import { RightPannel } from './RightPannel';
import { Stage } from './Stage';
import styles from './index.module.scss';

const components = [
  {
    id: uuid(),
    name: 'text1',
    component: 'Text',
    props: {
      text: '# 文章列表',
    },
  },
  {
    id: uuid(),
    name: 'container1',
    component: 'Container',
    props: {
      span: 24,
      children: [
        {
          id: uuid(),
          name: 'JSONSchemaForm1',
          component: 'JSONSchemaForm',
          props: {
            schema: {
              title: '',
              description: '',
              type: 'object',
              properties: {
                title: {
                  title: '标题',
                  type: 'string',
                },
              },
            },
            data: '',
            onSubmit: '{{query1.fetch}}',
            layout: 'inline',
            submitText: '搜索',
          },
        },
      ],
    },
  },
  {
    id: uuid(),
    name: 'container2',
    component: 'Container',
    props: {
      span: 24,
      style: {
        padding: {
          paddingTop: 8,
        },
      },
      children: [
        {
          id: uuid(),
          name: 'table1',
          component: 'Table',
          props: {
            loading: '{{query1.isFetching}}',
            data: '{{query1.data.data.0}}',
            columns: ['id', 'title', 'cover', 'status'],
          },
        },
      ],
    },
  },
  // {
  //   id: uuid(),
  //   name: 'container1',
  //   component: 'Container',
  //   props: {
  //     span: 24,
  //     children: [
  //       {
  //         id: uuid(),
  //         name: 'table1',
  //         component: 'Table',
  //         props: {
  //           loading: '{{query1.isFetching}}',
  //           data: '{{query1.data.data}}',
  //           columns: [],
  //         },
  //       },
  //       {
  //         id: uuid(),
  //         name: 'button1',
  //         component: 'Button',
  //         props: {
  //           children: '刷新',
  //           loading: '{{query1.isFetching}}',
  //           onClick: '{{query1.fetch}}',
  //         },
  //       },

  //       {
  //         id: uuid(),
  //         name: 'button2',
  //         component: 'Button',
  //         props: {
  //           text: '{{table1.selectedRow.data.label}}',
  //           children: '{{table1.selectedRow.data.label}}',
  //           loading: '{{query1.isFetching}}',
  //         },
  //       },
  //     ],
  //   },
  // },
  // {
  //   id: uuid(),
  //   name: 'container2',
  //   component: 'Container',
  //   props: {
  //     span: 24,
  //     offset: 0,
  //     children: [
  //       {
  //         id: uuid(),
  //         name: 'table2',
  //         component: 'Table',
  //         props: {
  //           loading: '{{query2.isFetching}}',
  //           data: '{{query2.data.data}}',
  //           columns: [],
  //         },
  //       },
  //       {
  //         id: uuid(),
  //         name: 'button3',
  //         component: 'Button',
  //         props: {
  //           children: '刷新',
  //           loading: '{{query2.isFetching}}',
  //           onClick: '{{query2.fetch}}',
  //         },
  //       },
  //     ],
  //   },
  // },
  // {
  //   id: uuid(),
  //   name: 'JSONSchemaForm1',
  //   component: 'JSONSchemaForm',
  //   props: {
  //     schema: {
  //       title: '分类',
  //       description: '请在表格 2 中选中一行数据.',
  //       type: 'object',
  //       required: ['label', 'value'],
  //       properties: {
  //         id: {
  //           title: 'ID',
  //           type: 'string',
  //           hidden: false,
  //         },
  //         label: {
  //           title: 'Label',
  //           type: 'string',
  //         },
  //         value: {
  //           title: 'Value',
  //           type: 'string',
  //         },
  //       },
  //     },
  //     data: '{{table2.selectedRow.data}}',
  //     onSubmit: '{{query3.post}}',
  //   },
  // },
];

const Header = observer(({ store }) => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  return (
    <>
      <header>
        <div className={styles.logo}>Odin</div>
        <nav>
          <ul>
            <li>
              <Tooltip title="代码">
                <CodeOutlined onClick={() => setCodeVisible(true)} />
              </Tooltip>
            </li>
            <li>
              <Tooltip title="预览">
                <PlayCircleOutlined onClick={() => setPreviewVisible(true)} />
              </Tooltip>
            </li>
          </ul>
        </nav>
      </header>
      <Drawer
        title={'代码'}
        width="80vw"
        visible={codeVisible}
        onClose={() => setCodeVisible(false)}
        footer={null}
      >
        <div className="editor-code-wrapper">
          <CodeMirror
            value={JSON.stringify(store, null, 2)}
            options={{
              mode: 'javascript',
              theme: 'default',
              lineNumbers: true,
              fullscreen: true,
            }}
          />
        </div>
      </Drawer>
      <Drawer
        title={'预览'}
        width="80vw"
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
        footer={null}
      >
        <Stage store={store} preview={true} />
      </Drawer>
    </>
  );
});

const Main = observer(({ store }) => {
  return (
    <main>
      <section>
        <LeftPannel store={store} />
      </section>
      <section>
        <Stage store={store} />
      </section>
      <section>
        <RightPannel store={store} />
      </section>
    </main>
  );
});

export const Editor = () => {
  const store = new Store({
    components,
    queries: [
      {
        name: 'query1',
        url: 'https://api.blog.wipi.tech/api/article',
        method: 'get',
      },
      {
        name: 'query2',
        url: 'https://api.blog.wipi.tech/api/category',
        method: 'get',
      },
      {
        name: 'query3',
        url: 'https://api.blog.wipi.tech/api/category',
        method: 'post',
      },
    ],
  });

  useEffect(() => {
    // codemirror 语法高亮
    Promise.all([import('codemirror/mode/javascript/javascript')]);
  }, []);

  return (
    <div className={styles.container}>
      <Header store={store} />
      <Main store={store} />
    </div>
  );
};
