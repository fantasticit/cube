import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Drawer, Radio, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Store } from '@/store';
import { Renderer } from '@/renderer';
import { PCIcon } from './icons/PC';
import { MobileIcon } from './icons/Mobile';
import { IPadIcon } from './icons/IPad';
import { LeftPannel } from './LeftPannel';
import { RightPannel } from './RightPannel';
import { Stage } from './Stage';
import { Device } from './Device';
import styles from './index.module.scss';
import { SimpleArticleManage } from './demo';

const devices = [
  {
    label: (
      <span style={{ verticalAlign: 'middle' }}>
        <PCIcon />
      </span>
    ),
    value: 'pc',
  },

  {
    label: (
      <span style={{ verticalAlign: 'middle' }}>
        <IPadIcon />
      </span>
    ),
    value: 'ipadmini',
  },
  {
    label: (
      <span style={{ verticalAlign: 'middle' }}>
        <MobileIcon />
      </span>
    ),
    value: 'iphone8',
  },
];

const Header = observer(({ store, device, onChangeDevice }) => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  const preview = () => {
    window.sessionStorage.setItem('page', JSON.stringify(store));
    window.open(`${process.env.NODE_ENV === 'production' ? '/odin/' : '/'}preview`);
  };

  return (
    <>
      <header className="editor-header">
        <div className={styles.logo}></div>
        <nav>
          <Radio.Group
            options={devices}
            onChange={(e) => onChangeDevice(e.target.value)}
            value={device}
            optionType="button"
            buttonStyle="solid"
            size="small"
          />
        </nav>
        <nav>
          <Button size="small" onClick={() => setCodeVisible(true)}>
            查看配置
          </Button>
          <Button size="small" type="primary" style={{ marginLeft: 16 }} onClick={preview}>
            切换至{store.readonly ? '编辑' : '预览'}
          </Button>
          <Button
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => {
              window.open('https://github.com/fantasticit/cube');
            }}
          >
            <GithubOutlined />
          </Button>
        </nav>
      </header>
      <Drawer
        title={'实时配置'}
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
    </>
  );
});

const Main = observer(({ store, device }) => {
  const isPC = device === 'pc';

  return (
    <main>
      <section>
        <LeftPannel store={store} />
      </section>
      <section style={{ padding: !isPC ? '20px 0' : 0 }}>
        {!isPC ? (
          <Device device={device}>
            <Stage store={store} />
          </Device>
        ) : (
          <Stage store={store} />
        )}
      </section>
      <section>
        <RightPannel store={store} />
      </section>
    </main>
  );
});

const store = new Store({
  readonly: false,
  components: SimpleArticleManage.components,
  apis: SimpleArticleManage.apis,
});

export const Editor = () => {
  const [device, setDevice] = useState(devices[0].value);

  useEffect(() => {
    // codemirror 语法高亮
    Promise.all([import('codemirror/mode/javascript/javascript')]);
  }, []);

  return (
    <div className={styles.container}>
      <Header store={store} device={device} onChangeDevice={setDevice} />
      <Main store={store} device={device} />
    </div>
  );
};
