import moment from "moment"
import { getFilters } from "./filters"
import { sortNotes,getNotes } from "./notes"
//create dom
const createDom = function(rendered){
    const newNotes = document.createElement('a')
    const notes = document.createElement('p')
    const statusEl = document.createElement('p')
    
    if (rendered.title.length > 0) {
        notes.textContent = rendered.title
    } else {
        notes.textContent = 'Unnamed note'
    }
    notes.classList.add('list-item__title')
    newNotes.appendChild(notes)

    newNotes.setAttribute('href', `/edit.html#${rendered.id}`)
    newNotes.classList.add('list-item')

    statusEl.textContent = lastEdited(rendered.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    newNotes.appendChild(statusEl)
    return newNotes
}

//filtering notes
const renderNotes = function(){
    
    const filters = getFilters()
    
    const notes = sortNotes(filters.sortBy)
    let  rendered = notes.filter(function(note){
          return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
      })
    
    document.querySelector('div#notes').innerHTML = ' '

    if(rendered.length > 0){
        rendered.forEach(function(rendered){
        document.querySelector('div#notes').appendChild(createDom(rendered))
    })
    }else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No note to show'
        emptyMessage.classList.add('empty-message')
        document.querySelector('#notes').appendChild(emptyMessage)
    }
   


}
const initializeEditPage = (noteId) =>{
        const titleElement = document.querySelector('#note-title')
        const bodyElement = document.querySelector('#note-body')
        const dateElement = document.querySelector('#updatedAt')
        const notes = getNotes()
        console.log(notes)
        const note = notes.find(function(note){
        
            return note.id === noteId
            
        })
       
        if(!note){
        location.assign('/index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = lastEdited(note.updatedAt)
}


const lastEdited = function(timestamp){
    return `last edited ${moment(timestamp).fromNow()}`
}

export {createDom,renderNotes,lastEdited,initializeEditPage}