import uuid from 'uuid/v4'
import moment from 'moment'

let notes = []
const getData = function(){
    const notesJSON = localStorage.getItem('notes') 
        try {
            return  notesJSON ? JSON.parse(notesJSON) : []
        } catch (e) {
            return []
        }
            
}

// Save the notes to localStorage
const saveData = ()=>{
    localStorage.setItem('notes',JSON.stringify(notes))
}

//expose notes
const getNotes = ()=> notes

const createNote = ()=>{
    const id = uuid()
    console.log(`id : ${id}`)
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt:timestamp
    })
    saveData()
    return id
    
}

const removeNotes = function(id){
    const notesID = notes.findIndex(function(note){
        return note.id === id 
    })
    if(notesID >-1){
        notes.splice(notesID,1)
        saveData()
    }   
    else{
        console.log('silinemedi')
    }
}

const sortNotes = function(sortBy){
    if(sortBy === 'byEdited'){
        return notes.sort(function(a,b){
            if(a.updatedAt > b.updatedAt){
                return -1
            }
            else if(b.updatedAt > a.updatedAt){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else if(sortBy === 'byCreated'){
        return notes.sort(function(a,b){
            if(a.createdAt > b.createdAt){
                return -1
            }
            else if(a.createdAt < b.createdAt){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else if(sortBy === 'alphabetical'){
        return notes.sort(function(a,b){
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }
            else if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else{
        return notes
    }

}


const updatedNote = (id,updates) =>{
    const note = notes.find((note)=> note.id ===id )
    if(!note){
        return
    }
    if(typeof updates.title === 'string'){
        note.title = updates.title
        Node.updatedAt = moment().valueOf()
    }
    if(typeof updates.body === 'string'){
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }
    saveData()
    return note
}
notes = getData()

export {getNotes, createNote, removeNotes,sortNotes,updatedNote}