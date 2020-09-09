import React from 'react';
import { observer } from 'mobx-react';
import { uuid } from 'utils/uuid';
import { Store } from '@/store';
import { LeftPannel } from './LeftPannel';
import { RightPannel } from './RightPannel';
import { Stage } from './Stage';
import styles from './index.module.scss';

const components = [
  {
    id: uuid(),
    name: 'container1',
    component: 'Container',
    props: {
      span: 24,
      children: [
        {
          id: uuid(),
          name: 'table1',
          component: 'Table',
          props: {
            loading: '{{query1.isFetching}}',
            data: '{{query1.data.data}}',
            columns: [],
          },
        },
        {
          id: uuid(),
          name: 'button1',
          component: 'Button',
          props: {
            children: '刷新',
            loading: '{{query1.isFetching}}',
            onClick: '{{query1.fetch}}',
          },
        },

        {
          id: uuid(),
          name: 'button2',
          component: 'Button',
          props: {
            text: '{{table1.selectedRow.data.label}}',
            children: '{{table1.selectedRow.data.label}}',
            loading: '{{query1.isFetching}}',
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
      offset: 0,
      children: [
        {
          id: uuid(),
          name: 'table2',
          component: 'Table',
          props: {
            loading: '{{query2.isFetching}}',
            data: '{{query2.data.data}}',
            columns: [],
          },
        },
        {
          id: uuid(),
          name: 'button3',
          component: 'Button',
          props: {
            children: '刷新',
            loading: '{{query2.isFetching}}',
            onClick: '{{query2.fetch}}',
          },
        },
      ],
    },
  },
  {
    id: uuid(),
    name: 'JSONSchemaForm1',
    component: 'JSONSchemaForm',
    props: {
      schema: {
        title: 'A registration form',
        description: 'A simple form example.',
        type: 'object',
        required: ['label', 'value'],
        properties: {
          id: {
            title: 'ID',
            type: 'string',
            hidden: false,
          },
          label: {
            title: 'Label',
            type: 'string',
          },
          value: {
            title: 'Value',
            type: 'string',
          },
        },
      },
      data: '{{table2.selectedRow.data}}',
      onSubmit: '{{query3.post}}',
    },
  },
];

const Main = observer(({ store }) => {
  return (
    <div className={styles.container}>
      <main>
        <section>
          <LeftPannel store={store} />
        </section>
        <section>
          <Stage store={store} />
        </section>
      </main>
      <aside>
        <RightPannel store={store} />
      </aside>
    </div>
  );
});

export const Editor = () => {
  // const [, setV] = useState(0);
  const store = new Store({
    components,
    queries: [
      {
        name: 'query1',
        url: 'https://api.blog.wipi.tech/api/tag',
      },
      {
        name: 'query2',
        url: 'https://api.blog.wipi.tech/api/category',
      },
      {
        name: 'query3',
        url: 'https://api.blog.wipi.tech/api/category',
      },
    ],
  });
  // store.subscribe(() => setV((v) => v + 1));

  return (
    <>
      <Main store={store} />
      {/* <section style={{ height: 300 }}>
        <CodeMirror
          value={JSON.stringify(store.components, null, 2)}
          options={{
            mode: 'javascript',
            theme: 'default',
            lineNumbers: true,
          }}
          onChange={(_, __, value) => {
            store.components = JSON.parse(value);
          }}
        />
      </section> */}
    </>
  );
};
