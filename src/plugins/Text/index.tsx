import React from 'react';
import { markdown } from 'utils/markdown';

export const Text = ({ text, editorProps, style }) => {
  const { bindKey, ...restEditorProps } = editorProps;

  return (
    <div {...restEditorProps} style={style}>
      <div dangerouslySetInnerHTML={{ __html: markdown(text) }}></div>
    </div>
  );
};

Text.componentInfo = {
  name: 'Text',
  title: '文本',
  description: '支持 Markdown 或者 HTML',
  icon: 'TextIcon',
};

Text.defaultProps = {
  text: '文本',
};

Text.schema = {
  text: {
    title: '文本（支持 markdown）',
    type: 'textarea',
    placeholder: '支持 markdown',
  },
};
