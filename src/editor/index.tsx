import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Drawer, Tooltip } from 'antd';
import { CodeOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Store } from '@/store';
import { LeftPannel } from './LeftPannel';
import { RightPannel } from './RightPannel';
import { Stage } from './Stage';
import styles from './index.module.scss';
import { SimpleArticleManage } from './demo';

const Header = observer(({ store }) => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  const preview = () => {
    store.readonly = true;
    setPreviewVisible(true);
  };

  const exitPreview = () => {
    store.readonly = false;
    setPreviewVisible(false);
  };

  return (
    <>
      <header>
        <div className={styles.logo}></div>
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
    components: SimpleArticleManage.components,
    apis: SimpleArticleManage.apis,
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
