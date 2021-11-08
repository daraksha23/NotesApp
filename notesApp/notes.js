const fs = require('fs');
const chalk = require('chalk');

const addNotes  = (title, body, itemList) => {
    const note = loadNotes()

    const titlePresent = note.find(notes => notes.title === title)
    if(!titlePresent){
        note.push({
            title: title,
            body: body,
            itemList: itemList
        })
        saveNotes(note)
        console.log(chalk.bgHex('#79ff4b').black(title+" Note Added"))
    }
    else{
        console.log(chalk.bgHex('#ff4b4b').black(title+" Already Exists")+chalk.bgGray.black(`\nTry a New Title or\nInsert Items Into Items Array of The Above Title Using --insertItems="" Command With --title=""`))
    }
}

const insertItems = (title, itemList) => {
    const note = loadNotes()
    const edit = note.filter(notes => notes.title === title)
    if(edit.length == 0){
        console.log(chalk.bgHex('#ff4b4b').black("Error 404 - Note With Title - \""+title+"\" Does Not Exist"))
    }
    else{
        itemList.forEach(element => edit[0].itemList.push(element))
        for(let i = 0; i < note.length; i++) {
            if(note[i].title === title){
                note[i] = edit[0]
            }
        }
        saveNotes(note)
        console.log(chalk.bgHex('#79ff4b').black("Items Inserted into "+title))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    var newNotes = notes.filter(note => note.title !== title)
    if(newNotes.length < notes.length){
        saveNotes(newNotes)
        const success = chalk.bgHex('#79ff4b').black(title+" Note Removed Successfully")
        console.log(success)
    }
    else{
        console.log(chalk.bgHex('#ff4b4b').black("Error 404 - Note With Title - "+title+" Does Not Exist"))
    }
}

const listNotes = () => {
    console.log(chalk.bold.hex('00DEAD')('Notes Present -'))
    const notes = loadNotes()
    notes.forEach(note => console.log("  "+note.title))
}

const getNote = (title) => {
    const note = loadNotes()
    const myNote = note.find(note => note.title === title)
    if(myNote)
    {
        console.log(chalk.bold.hex('00DEAD')("Your Requested Note Details -\n"))
        console.log(chalk.bold(myNote.title)+"\n"+myNote.body+"\n"+"Items -")
        myNote.itemList.forEach(ele => console.log(ele))
        console.log()
    }
    else{
        console.log(chalk.bgHex('#ff4b4b').black("Error 404 - Note With Title - "+title+" Does Not Exist"))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const strData = dataBuffer.toString()
        const dataJson = JSON.parse(strData)
        return dataJson
    }
    catch (err) {
        return []
    }

}

const saveNotes = (notes) => {
    const strObj = JSON.stringify(notes)
    fs.writeFileSync('notes.json', strObj)
}


module.exports = {
    getNote : getNote,
    addNotes : addNotes,
    insertItems: insertItems,
    removeNote : removeNote,
    listNotes : listNotes
}