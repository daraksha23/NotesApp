const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js')

yargs.version("1.0.1")

//Add command
yargs.command({
    command : 'add',
    describe : 'Adds an Item',
    builder : {
        title : {
            describe : 'Note Title',
            demandOption : true,
            type : 'string'
        },
        body : { 
            describe : 'Display Note Body',
            demandOption : true,
            type : 'string'
        },
        itemList : {
            describe : 'List of Items',
            default : [],
            type : 'array'
        }
    },
    handler(arg) {
        notes.addNotes(arg.title, arg.body, arg.itemList);
    }
})

//Insert Item
yargs.command({
    command : 'insertItems',
    describe : 'inserts multiple items',
    builder : {
        title : {
            describe : 'Note Title',
            demandOption : true,
            type : 'string'
        },
        itemList : {
            describe : 'List of Items',
            demandOption : true,
            type : 'array'
        }
    },
    handler(arg){
        notes.insertItems(arg.title, arg.itemList);
    }
})

//Remove command
yargs.command({
    command : 'remove',
    describe : 'Removes an Item',
    builder : {
        title : {
            describe : 'Note Title',
            demandOption : true,
            type : 'string'
        }
    },
    handler(arg) {
        notes.removeNote(arg.title)
    }
})

//Read command
yargs.command({
    command : 'read',
    describe : 'Read the List',
    builder : {
        title : {
            describe : 'Read a note',
            demandOption : true,
            type : 'string'
        }
    },
    handler(arg) {
        notes.getNote(arg.title)
    }
})

//List command
yargs.command({
    command : 'list',
    describe : 'Lists the Notes',
    handler() {
        notes.listNotes();
    }
})

yargs.parse();