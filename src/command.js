import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { findNotes, getAllNotes, newNote, removeAllNotes, removeNote } from './notes.js';
import { start } from './server.js';

const listNotes = (notes) =>{ 
    notes.forEach(({id,tags,content})=>{
        console.log("id:",id);
        console.log("tags",tags);
        console.log("content:",content);
        console.log('\n');
    })
}

yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', (yargs) => {
      yargs.positional('note',{
        type: 'string',
        description: 'The content of the note to create',
      })
  }, async(argv) => {
    const tags = argv.tags ? argv.tags.split(',') : [];
    const note = await newNote(argv.note,tags);
    console.log('Note added !',note)
  })
  .option('tags',{
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'
  })
  .command('all','get all notes',()=>{},async(argv)=>{
    const notes = await getAllNotes();
    listNotes(notes);
  })
  .command('find <filter>','get matching notes',(yargs)=>{
    return yargs.positional('filter',{
    type: 'string',
    })
  }, async(argv)=>{
        const matches = await findNotes(argv.filter);
        console.log(argv)
        listNotes(matches);
  }) 
  .command('remove <id>','The id of the note you want to remove',()=>{},
    async(argv) => {
        return await removeNote(argv.id);    
    }
  )
  .command('clean','remove all notes',()=>{},
    async()=>{
        await removeAllNotes();
        console.log('DB reseted');
    }
  )
  .command('web [port]','launch website to see notes',yargs=>{
    return yargs.positional('port',{
      describe:'port bind on',
      default: 5000,
      type: 'number'
    })
  },
    async (argv)=>{
      const notes = await getAllNotes();
      start(notes,argv.port)
    }
  )
  .demandCommand(1)
  .parse()


/*
    * process.argv return array having 2 element in it, first element represent the node path and second element represent the current file path
    * hideBin() : it remove 2 default path in argv array 
    * demandCommand(1): it make sure that out cli have certain no of argument, if we do not pass that no. of args it shows error
    * <note> : it means it is necessary
    * [port] : it means it is optional
 */
