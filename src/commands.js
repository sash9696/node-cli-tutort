import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { findNotes, getAllNotes, newNote, removeAllNotes, removeNote } from "./notes.js";
import { listNotes } from "./utils.js";

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create a new note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "The content of the note to create",
      });
    },
    async (argv) => {
      //   console.log(argv);

      const tags = argv.tags ? argv.tags.split(",") : [];
      //create a note
      const note = await newNote(argv.note, tags);

      console.log("Note added!", note.id);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      // console.log(notes)
      listNotes(notes);
    }
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        type: "string",
        description:
          "The search text to filter the notes , which will be applied to note.content",
      });
    },
    async (argv) => {
      const notes = await findNotes(argv.filter);
      listNotes(notes);
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id);
      if (id) {
        console.log("Note removed: ", id);
      } else {
        console.log("Note not found");
      }
    }
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      await removeAllNotes();

      console.log("All notes removed");
    }
  )
  .demandCommand(1)
  .parse();
