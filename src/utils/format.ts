import * as prettier from 'prettier/standalone';
import * as markdown from 'prettier/parser-markdown';

export const formatMarkdown = (content) => {
  return prettier.format(content, {
    parser: 'markdown',
    tabWidth: 2,
    printWidth: 80,
    plugins: [markdown]
  });
};
