<template>
    <div class="allNotes" :id="'note-' + note.id">
      <div>ID: <strong>{{ note.id }}</strong></div>
      <div class="title">Title: <strong>{{ note.title }}</strong></div>
      <div class="desc">{{ note.description }}</div>
      <div class="orderBtnNotes">
        <div><button class="btnDelete" @click="deleteNote">Borrar</button></div>
        <div><button class="btnUpdate" @click="updateNote">Modificar</button></div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Main } from '@/main';
import { Socket } from 'socket.io-client';
import { defineComponent } from 'vue';
  export default defineComponent({
    mounted() {
        
    },
    unmounted() {
        
    },
    props: {
      note: {
        type: Object as () => { id: number, title: string, description: string },
        required: true
      }
    },
    methods: {
      deleteNote() {
        console.log('borrado ' + this.note.id)
        const socket: Socket = Main.getInstance().getSocketClient().getSocket()
        socket.emit('removeNote', this.note.id)
      },
      updateNote() {
        const socket: Socket = Main.getInstance().getSocketClient().getSocket()
        console.log('modificado ' + this.note.id)
      const newTitle = document.querySelector('#title') as HTMLInputElement
      const newDesc = document.querySelector('#description') as HTMLInputElement
      socket.emit('updateNote', {
        id: this.note.id,
        title: newTitle.value,
        description: newDesc.value
      })
      }
    }
  });
  </script>
  
  <style scoped>
  .allNotes{
  width: 300px;
  padding: 4px;
  background-color: #B4ADEA;
  border-radius: 10px;
  border: 1px;
  border-style: double;
  text-align: center;
  margin: 5px;
}

.orderBtnNotes{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 5px 0 5px 0;
}

.btnDelete {
  background-color: rgb(145, 32, 32);
  font-size: medium;
  color: #ffffff;
  border-radius: 10px;
  border: 1px;
  border-style: double;
  border-color: #181818;
}

.btnUpdate {
  background-color: gray;
  font-size: medium;
  color: #ffffff;
  border-radius: 10px;
  border: 1px;
  border-style: double;
  border-color: #181818;
}
  </style>
  