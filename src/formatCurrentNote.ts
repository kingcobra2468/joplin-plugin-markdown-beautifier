import { Editor } from 'codemirror';
import { formatMarkdown } from './utils/format';

module.exports = {
  default: function (_context: any) {
    const plugin = function (CodeMirror) {
      CodeMirror.defineExtension('formatCurrentNote', function () {
        const cm: Editor = this; // to get autocomplete working

        const cursor = cm.getCursor();

        const doc = cm.getDoc();
        const content = doc.getValue();

        const formatted = formatMarkdown(content);

        const lines = content.split('\n');
        const lineCount = lines.length;
        const endLine = lines[lineCount - 1];

        // replace with prettier formatted text
        cm.replaceRange(
          formatted,
          { line: 0, ch: 0 },
          { line: lineCount, ch: endLine.length },
          content
        );
        // revert cursor to original position
        cm.setCursor(cursor);
      });
    };

    return {
      plugin
    };
  }
};
