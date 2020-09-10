import * as Showdown from 'showdown';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  emoji: true,
});

export function markdown(text) {
  if (!text) {
    return '';
  }
  let str = converter.makeHtml(String(text));
  str = str.replace(/<\/?p[^>]*>/g, '');
  str = str.replace(/<\/?code[^>]*>/g, '');
  return str;
}
