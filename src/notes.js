import { getDB, insert, saveDB } from "./db.js";

export const newNote = async (note, tags) => {
  const data = {
    tags,
    content: note,
    id: Date.now(),
  };

  //insert the data to db.json
  await insert(data);
  return data;
};

export const getAllNotes = async () => {
    const db = await getDB();
    return db.notes;
}

export const removeAllNotes = async () => {
    await saveDB({notes: []});
}

export const removeNote = async (id) => {
    //get db 
    //get notes
    const notes  = await getAllNotes();
    const match = notes.find(note => note.id === id);
    //match the notes id with the id param
    if(match){
        const newNotes = notes.filter(note => note.id !== id);
        await saveDB({notes:newNotes});
        return id;
    }
    //if a match is there then remove the id and save to db
    //return id

}

export const findNotes = async (filter) => {
    const notes = await getAllNotes();

    return notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase()));
}
