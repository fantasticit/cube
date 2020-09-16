import React, { useEffect, useState } from 'react';
import { Renderer } from '@/renderer';

export default function Home() {
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    const raw = window.sessionStorage.getItem('page');

    if (raw) {
      setConfig(JSON.parse(raw));
    }
  }, []);

  return <Renderer config={config} />;
}
