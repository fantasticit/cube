import React, { useEffect, useRef } from 'react';
import { markdown } from 'utils/markdown';

export const Text = ({ text, editorProps, style }) => {
  const { bindKey, indicator, draggable, resizeable, ...restEditorProps } = editorProps;
  const ref = useRef();

  useEffect(() => {
    draggable(ref.current);
    resizeable(ref.current);
  }, [draggable, resizeable]);

  return (
    <span {...restEditorProps} style={style} ref={ref}>
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
