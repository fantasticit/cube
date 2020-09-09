import * as Showdown from 'showdown';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  emoji: true,
});

export function markdown(text) {
  return converter.makeHtml(text);
}
