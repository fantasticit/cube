import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
// import { uuid } from 'utils/uuid';
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
    id: '205845d1-a7f5-4ed5-9eea-1f462a9805db',
    name: 'text1',
    component: 'Text',
    props: {
      style: {
        width: '100%',
        height: 'auto',
        bordered: false,
        boxShadow: false,
        margin: {
          marginTop: 0,
          marginRight: 0,
          marginBottom: 14,
          marginLeft: 0,
        },
        padding: {
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
        },
        font: {
          fontSize: 14,
          color: '#333',
          textAlign: 'left',
        },
      },
      text: '# 文章列表',
    },
  },
  {
    id: 'e7bdaec2-dcfe-425c-b8f1-9ee5f92fe223',
    name: 'container1',
    component: 'Container',
    props: {
      style: {
        width: '100%',
        height: 'auto',
        bordered: false,
        boxShadow: false,
        margin: {
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
        },
        padding: {
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
        },
        font: {
          fontSize: 14,
          color: '#333',
          textAlign: 'left',
        },
      },
      span: 24,
      offset: 0,
      bordered: true,
      boxShadow: true,
      children: [
        {
          id: 'f632d485-af62-426e-9e91-f2f5c0b557f8',
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
    id: '2d95a615-b7e9-42f3-81ff-af38010f109f',
    name: 'container4',
    component: 'container',
    props: {
      style: {
        width: '100%',
        height: 'auto',
        bordered: false,
        boxShadow: false,
        margin: {
          marginTop: 16,
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
        },
        padding: {
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
        },
        font: {
          fontSize: 14,
          color: '#333',
          textAlign: 'left',
        },
      },
      span: 12,
      offset: 0,
      bordered: true,
      boxShadow: true,
      children: [
        {
          id: 'f099c841-6121-4d11-ba16-71fe3f82dad6',
          name: 'button2',
          component: 'Button',
          props: {
            style: {
              width: '100px',
              margin: {
                marginTop: 0,
                marginRight: 14,
                marginBottom: 0,
                marginLeft: 0,
              },
            },
            children: '刷新',
            loading: '{{query1.isFetching}}',
            onClick: '{{query1.fetch}}',
          },
        },
        {
          id: '2618eedb-645f-4f8b-80bd-f083bdc5340c',
          name: 'text2',
          component: 'Text',
          props: {
            hidden: '!{{table1.selectedRows.length}} || {{table1.selectedRows.length}} <= 0',
            text: '当前选择 {{table1.selectedRows.length}} 个',
          },
        },
        // {
        //   id: '73390fe8-e287-425b-aae5-25a2f87c2fdd',
        //   name: 'text3',
        //   component: 'Text',
        //   props: {
        //     text: '{{table1.selectedRows.length}}',
        //   },
        // },
        // {
        //   id: '73390fe8-e287-425b-aae5-25a2f87c2fdd',
        //   name: 'text4',
        //   component: 'Text',
        //   props: {
        //     text: '个',
        //   },
        // },
      ],
    },
  },
  {
    id: '77191e5b-f1fe-408d-b532-1af17ac31f91',
    name: 'container3',
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
          id: '9d02a929-2135-479a-9f83-dbcee2c418ca',
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

  const preview = () => {
    store.setReadonly(true);
    setPreviewVisible(true);
  };

  const exitPreview = () => {
    store.setReadonly(false);
    setPreviewVisible(false);
  };

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
                <PlayCircleOutlined onClick={preview} />
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
        onClose={exitPreview}
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
