import React from 'react';
import { transformStyle } from '@/plugins/shared';
import { markdown } from 'utils/markdown';

export const Text = ({ style, text }) => {
  return (
    <span style={transformStyle(style)} dangerouslySetInnerHTML={{ __html: markdown(text) }}></span>
  );
};

Text.componentInfo = {
  name: 'Text',
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
