# Joplin Plugin Markdown Beautifier

Markdown beautifier formatter plugin for Joplin.

## Usage

The following commands are exposed:

- **formatCurrentNote** - formats the current note.
- **formatAllNotes** - formats all notes.

## Building the plugin

The plugin is built using Webpack, which creates the compiled code in `/dist`.
A JPL archive will also be created at the root, which can use to distribute
the plugin.

To build the plugin, simply run `npm run dist`.

The project is setup to use TypeScript, although you can change the
configuration to use plain JavaScript.

## Updating the plugin framework

To update the plugin framework, run `npm run update`.

In general this command tries to do the right thing - in particular it's going
to merge the changes in package.json and .gitignore instead of overwriting. It
will also leave "/src" as well as README.md untouched.

The file that may cause problem is "webpack.config.js" because it's going to be
overwritten. For that reason, if you want to change it, consider creating a
separate JavaScript file and include it in webpack.config.js. That way, when
you update, you only have to restore the line that include your file.

## Inspiration

This plugin is an adaptation of
[joplin-plugin-markdown-prettier](https://github.com/shufo/joplin-plugin-markdown-prettier),
a plugin that enables formatting of the current note.
