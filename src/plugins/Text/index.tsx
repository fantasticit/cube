import React from 'react';
import { markdown } from 'utils/markdown';

export const Text = ({ path, activePath, indicator, rootClassNames, style, text }) => {
  return (
    <span className={rootClassNames} data-path={path} data-active-path={activePath} style={style}>
      {indicator}
      <span dangerouslySetInnerHTML={{ __html: markdown(text) }}></span>
    </span>
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
