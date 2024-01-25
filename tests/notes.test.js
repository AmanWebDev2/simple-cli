import { jest } from "@jest/globals";

jest.unstable_mockModule('../src/db.js',()=>({
    insertDB: jest.fn(),
    getDB: jest.fn(),
    saveDB: jest.fn()
}));

const { saveDB,getDB,insertDB } = await import('../src/db.js');
const { getAllNotes, removeNote, newNote} = await import('../src/notes.js');

beforeEach(()=>{
    insertDB.mockClear(),
    getDB.mockClear(),
    saveDB.mockClear()
});

describe('cli app',()=>{
test('newNote inserts data and returns it',async ()=>{
    const content = 'Test note';
    const tags = ['tag1','tag2'];
    const data = {
        tags,
        content,
        id: Date.now()
    };
    insertDB.mockResolvedValue(data);

    const result = await newNote(content,tags);
    expect(result).toEqual(data)
    
});


test('get all notes',async()=>{
    const db = {
        notes: ['note1','note2']
    }
    getDB.mockResolvedValue(db);
    const result = await getAllNotes();
    expect(result).toEqual(db.notes)
})

test('removeNote takes id and remove that note if there is no id it does nothing',async()=>{
    const notes = [
    { id: 1, content: 'note 1' },
    { id: 2, content: 'note 2' },
    { id: 3, content: 'note 3' },
    ];
    
    saveDB.mockResolvedValue(notes)
    const idToRemove = 4;
    const result = await removeNote(idToRemove);
    expect(result).toBeUndefined();

})
})


