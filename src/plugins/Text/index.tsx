import React from 'react';
import { transformStyle } from '@/plugins/shared';
import { markdown } from 'utils/markdown';

export const Text = ({ indicator, style, text }) => {
  return (
    <div
      className="component-indicator-wrapper"
      style={{
        background: '#fff',
        ...transformStyle(style),
      }}
    >
      {indicator}
      <div dangerouslySetInnerHTML={{ __html: markdown(text) }}></div>
    </div>
  );
};

Text.componentInfo = {
  name: 'Text',
};

Text.defaultProps = {
  text: '# hello world',
};

Text.schema = {
  text: {
    title: '文本（支持 markdown）',
    type: 'textarea',
    placeholder: '支持 markdown',
  },
};
