import joplin from 'api';
import {
  ContentScriptType,
  MenuItemLocation,
  ToolbarButtonLocation
} from 'api/types';
import formatAllNotes from './formatAllNotes';

joplin.plugins.register({
  onStart: async function () {
    joplin.contentScripts.register(
      ContentScriptType.CodeMirrorPlugin,
      'currentNoteFormatter',
      'formatCurrentNote.js'
    );

    joplin.commands.register({
      name: 'formatCurrentNote',
      label: 'Format Note',
      iconName: 'fas fa-code',
      enabledCondition: 'markdownEditorVisible',
      execute: async () => {
        await joplin.commands.execute('editor.execCommand', {
          name: 'formatCurrentNote'
        });
      }
    });

    joplin.commands.register({
      name: 'formatAllNotes',
      label: 'Format All Notes',
      iconName: 'fas fa-code',
      enabledCondition: 'markdownEditorVisible',
      execute: async () => {
        await formatAllNotes();
      }
    });

    await joplin.views.menuItems.create(
      'Format current note',
      'formatCurrentNote',
      MenuItemLocation.Edit,
      { accelerator: 'Alt+Shift+F' }
    );
    await joplin.views.toolbarButtons.create(
      'prettier-markdown',
      'formatCurrentNote',
      ToolbarButtonLocation.EditorToolbar
    );
    await joplin.views.menuItems.create(
      'FormatNote',
      'formatCurrentNote',
      MenuItemLocation.EditorContextMenu
    );
  }
});
