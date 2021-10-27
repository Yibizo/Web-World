const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const dateTime = new Date()
    const isDup = notes.find(note => note.title === title)

    if (!isDup) {
        let hours = dateTime.getHours()
        const antePost = (hours > 11) ? 'PM' : 'AM'
        hours = (hours > 12) ? hours-12 : hours
        hours = (antePost === 'AM' && hours === 0) ? 12 : hours
        hours = (hours.toString().length === 1) ? `0${hours.toString()}` : hours
        
        let minutes = dateTime.getMinutes()
        minutes = (minutes.toString().length === 1) ? `0${minutes.toString()}` : minutes

        let seconds = dateTime.getSeconds()
        seconds = (seconds.toString().length === 1) ? `0${seconds.toString()}` : seconds

        notes.push({
            title: title,
            body: body,
            date: `${dateTime.getFullYear()}-${dateTime.getMonth()+1}-${dateTime.getDate()}`,
            time: `${hours}:${minutes}:${seconds} ${antePost}`
        })
        saveNotes(notes)
        console.log(chalk.rgb(7,174,1).inverse(' New note added! '))
    }
    else {
        console.log(chalk.rgb(212,0,0).inverse(' Note with duplicate title... '))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.rgb(7,174,1).inverse(' Note removed! '))
        saveNotes(notesToKeep)
    }
    else {
        console.log(chalk.rgb(212,0,0).inverse(' Note doesn\'t exist... '))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    if (notes.length > 0){
        console.log(chalk.rgb(166,166,166).inverse(' All notes '))
        notes.forEach(note => {
            console.log(`\n${chalk.rgb(113,180,246)('Title')} : ${note.title}`)
            console.log(`${chalk.rgb(113,180,246)('Body')}  : ${note.body}`)
            console.log(`${chalk.rgb(113,180,246)('Date')}  : ${note.date}`)
            console.log(`${chalk.rgb(113,180,246)('Time')}  : ${note.time}`)
        })
    }
    else {
        console.log(chalk.rgb(212,0,0).inverse(' No notes to display... '))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)

    if (note) {
        console.log(`${chalk.rgb(113,180,246)('Title')} : ${note.title}`)
        console.log(`${chalk.rgb(113,180,246)('Body')}  : ${note.body}`)
        console.log(`${chalk.rgb(113,180,246)('Date')}  : ${note.date}`)
        console.log(`${chalk.rgb(113,180,246)('Time')}  : ${note.time}`)
    }
    else {
        console.log(chalk.rgb(212,0,0).inverse(' No note found... '))
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString())
    }
    catch (e) {
        return []
    }
}

module.exports = {addNote, removeNote, listNotes, readNote}