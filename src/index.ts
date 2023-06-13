import joplin from 'api';
import * as prettier from 'prettier/standalone';
import * as markdown from 'prettier/parser-markdown'
import { ContentScriptType } from 'api/types';

joplin.plugins.register({
	onStart: async function() {
		const token = await joplin.settings.globalValue('api.token');
		
		/*
		1. Command one: Fix only this file
		2. Fix only the uncommitted files
		3. Fix all files      
		*/
    /*
    joplin.workspace.onNoteChange(async (h) => {
      if (h.event != 2) return;
      
      const note = await joplin.data.get(['notes', h.id], { fields: ['id', 'title', 'body'] });
      console.log(note)
      const formatted = prettier.format(note.body, { parser: 'markdown', tabWidth: 2, plugins: [markdown] });
      console.log(formatted)
      await joplin.data.put(['notes', h.id], null, { body: formatted });
      console.log('update')
    })*/

    await joplin.commands.register({
      name: 'test1',
      label: 'My Test Command 1',
      iconName: 'fas fa-music',
      execute: async (...args: any[]) => {
          console.log()
          const note = await joplin.workspace.selectedNote()
          const formatted = prettier.format(note.body, { parser: 'markdown', tabWidth: 2, plugins: [markdown] });
          await joplin.data.put(['notes', note.id], null, { body: formatted });
          //alert('Testing plugin command ');

      },
    });

    joplin.contentScripts.register(ContentScriptType.CodeMirrorPlugin, "formatter", "beautifier.js");
    joplin.commands.register({
      name: 'formatNote',
      label: 'Format Note',
      iconName: 'fas fa-code',
      enabledCondition: "markdownEditorVisible",
      execute: async () => {
        await joplin.commands.execute('editor.execCommand', { name: 'formatNote', });
      }
    });
    
		console.info('Hello world. Test plugin started!');
	},
});
