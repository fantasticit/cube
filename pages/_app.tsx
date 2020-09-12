import React from 'react';
import 'antd/dist/antd.css';
import 'theme/globals.scss';
import 'theme/device.scss';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
