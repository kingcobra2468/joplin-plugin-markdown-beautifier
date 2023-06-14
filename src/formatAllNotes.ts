import joplin from 'api';
import { formatMarkdown } from './utils/format';

const formatAllNotes = async () => {
  const currentNoteId = (await joplin.workspace.selectedNote())?.id ?? null;
  let page = 1;
  let response = await joplin.data.get(['notes'], {
    fields: ['id', 'title', 'body'],
    page
  });

  do {
    for (let note of response.items) {
      if (note.id == currentNoteId) {
        joplin.commands.execute('formatCurrentNote');
        continue;
      }

      await joplin.data.put(['notes', note.id], null, {
        body: formatMarkdown(note.body)
      });
    }
    page += 1;
  } while (response.has_more);
};

export default formatAllNotes;
