import { initializeEditPage,lastEdited } from "./views"
import { updatedNote ,removeNotes} from "./notes"

const noteId = location.hash.substring(1)
initializeEditPage(noteId)


document.querySelector('#note-title').addEventListener('input', function(e){
    const note = updatedNote(noteId,{
        title:e.target.value
    })
    
    document.querySelector('#updatedAt').textContent = lastEdited(note.updatedAt)
})

document.querySelector('#note-body').addEventListener('input', function(e){
    const note = updatedNote(noteId,{
        body:e.target.value
    })
  
  document.querySelector('#updatedAt').textContent = lastEdited(note.updatedAt)
  })

document.querySelector('#remove-note').addEventListener('click', function(e){
  removeNotes(noteId)
  location.assign('/index.html')

})

window.addEventListener('storage', function(e){
  if(e.key === 'notes'){
    initializeEditPage(noteId)
  }
})