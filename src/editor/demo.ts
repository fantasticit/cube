export const SimpleArticleManage = {
  apis: [
    {
      name: 'api1',
      url: 'https://api.blog.wipi.tech/api/article',
      method: 'get',
    },
    {
      name: 'api2',
      url: 'https://api.blog.wipi.tech/api/category',
      method: 'get',
    },
    {
      name: 'api3',
      url: 'https://api.blog.wipi.tech/api/category',
      method: 'post',
    },
  ],
  components: [
    {
      id: '205845d1-a7f5-4ed5-9eea-1f462a9805db',
      name: 'text1',
      component: 'Text',
      props: {
        style: {},
        text: '# 文章列表',
      },
    },
    {
      id: 'e7bdaec2-dcfe-425c-b8f1-9ee5f92fe223',
      name: 'container1',
      component: 'Container',
      props: {
        style: {},
        span: 24,
        offset: 0,
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
              onSubmit: '{{api1.fetch}}',
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
        style: {},
        span: 12,
        offset: 0,
        children: [
          {
            id: 'f099c841-6121-4d11-ba16-71fe3f82dad6',
            name: 'button2',
            component: 'Button',
            props: {
              style: {},
              children: '刷新',
              loading: '{{api1.isFetching}}',
              onClick: '{{api1.fetch}}',
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
        ],
      },
    },
    {
      id: '9d02a929-2135-479a-9f83-dbcee2c418ca',
      name: 'table1',
      component: 'Table',
      props: {
        loading: '{{api1.isFetching}}',
        data: '{{api1.data.data.0}}',
        columns: ['id', 'title', 'cover', 'status'],
      },
    },
  ],
};
