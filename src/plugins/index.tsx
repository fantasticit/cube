import { plugins } from './registry';
import { STYLE_SCHEMA } from './style';
import { Button } from './Button';
import { Container } from './Container';
import { JSONSchemaForm } from './JSONSchemaForm';
import { Table } from './Table';
import { Text } from './Text';
import { TextInput } from './TextInput';

plugins.register(Container);
plugins.register(Text);
plugins.register(TextInput);
plugins.register(Button);
plugins.register(Table);
plugins.register(JSONSchemaForm);

export { plugins, STYLE_SCHEMA };
