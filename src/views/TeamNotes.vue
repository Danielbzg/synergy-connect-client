<template>
  <div class="mainNotes">
    <div class="writeBlock">
        <div class="designBlock">
        <form id="noteForm">
          <h3 class="animate__animated animate__pulse">Añadir nota</h3>
          <div class="orderInputs">
            <input type="text" id="title" name="title" placeholder="Escribe un título" />
            <input name="description" id="description" rows="2" placeholder="Escribe una descripción"></input>
          </div>
          <button @click="addNoteButton">Añade una nota</button>
        </form>
      </div>
  </div>
    <div class="sectionAllNotes">
      <h1 class="animate__animated animate__zoomInDown">Notas</h1>
      <div id="notesPublished"></div>
    </div>
    
  </div>
</template>

<style scoped>

input{
  font-family: Raleway;
  margin: 5px 0;
}

.mainNotes{
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.writeBlock{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}
.designBlock {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(99, 57, 138);
  color: #ffffff;
  width: 350px;
  height: 200px;
  border-radius: 10px;
  border: 1px;
  border-style: double;
  border-color: #181818;
  margin: 2px;
}

#noteForm {
  height: 200px;
}

.orderInputs{
  display: flex;
  flex-direction: column;
}

#noteForm>button{
  color: #ffffff;
  background-color: rgb(31, 133, 119);
  font-size: medium;
  border-radius: 10px;
  border: 1px;
  border-style: double;
  border-color: #181818;
  margin: 20px;
  padding: 1px 8px;
}

.sectionAllNotes{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#notesPublished {
  width: 90vw;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;

}


</style>

<script lang="ts">
import 'animate.css';
import NoteItem from '@/components/NoteItem.vue'
import { Main } from '@/main'
import { Socket } from 'socket.io-client'
import { createApp, defineComponent } from 'vue'

let isMounted: boolean = false
const notas: Map<string, { id: string; title: string; description: string }> = new Map<
  string,
  { id: string; title: string; description: string }
>()

export default defineComponent({
    mounted() {
    isMounted = true
    notas.forEach((note) => {
      addNoteInDOM(note)
    })
    },
    unmounted() {
      isMounted = false
    },
    methods: {
      addNoteButton() {
        event?.preventDefault();
        const socket: Socket = Main.getInstance().getSocketClient().getSocket()
        const title = document.querySelector('#title') as HTMLInputElement
        const description = document.querySelector('#description') as HTMLInputElement
        socket.emit('createNote', {
          id: 0,
          title: title.value,
          description: description.value
        })
      }
    }
  });

export const addNote = (note: { id: string; title: string; description: string }) => {
  notas.set(note.id, note)
  if (isMounted) {
    addNoteInDOM(note)
  }
}

//Añadir componente al DOM
const addNoteInDOM = (note: { id: string; title: string; description: string }) => {
    const notesPublished = document.querySelector('#notesPublished')!
    const noteItemComponent = createApp(NoteItem, { note: note }).mount(document.createElement('div'));
    notesPublished.appendChild(noteItemComponent.$el);
}

export const updateNote = (note: { id: string; title: string; description: string }) => {
  const cacheNote = notas.get(note.id)
  if (cacheNote != null) {
    cacheNote.title = note.title
    cacheNote.description = note.description
    if (isMounted) {
      console.log('nota updated to: ' + JSON.stringify(note));
      const divNote = document.querySelector(`#note-${note.id}`)!
      const titleDiv = divNote.querySelector('.title')!
      titleDiv.innerHTML = `<strong>${note.title}</strong>`
      const descDiv = divNote.querySelector('.desc')!
      descDiv.innerHTML = `${note.description}`
    }
  }
}

export const removeNote = (noteID: string) => {
  notas.delete(noteID)
  if (isMounted) {
    const divNote = document.querySelector(`#note-${noteID}`)!
    console.log(divNote)
    divNote.remove()
  }
}

</script>

