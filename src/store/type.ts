import React from 'react';
import { Method } from 'axios';
import { plugins } from '@/plugins';

const components = plugins.getAllComponentNames();

export interface IApiConfig {
  name: string;
  url: string;
  method: Method;
}

export interface IComponentConfig {
  id: string;
  name: string;
  component: typeof components[number];
  props: {
    style: React.CSSProperties;
  } & Record<string, unknown>;
}

export interface IPageConfig {
  apis: Array<IApiConfig>;
  components: Array<IComponentConfig>;
}
