<template>
  <main class="bodyForum">
    <h1 class="animate__animated animate__lightSpeedInRight">Foro</h1>
    <div class="principal">
      <div id="divChat"></div>
      <input id="input" placeholder="Escribe tu mensaje" />
    </div>
  </main>
</template>

<style scoped>
.bodyForum {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 30vh;
}

.principal {
  width: 80vw;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 5px;
  border: 1px;
  border-style: double;
  padding: 10px;
}

#input {
  font-size: 1rem;
  border-radius: 5px;
  border: 1px;
  border-style: double;
  text-align: center;
  background-color: beige;
}

#divChat {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
</style>

<script lang="ts">
import Swal from 'sweetalert2'
import { Socket } from 'socket.io-client'
import { Main } from '@/main'

let isMounted: boolean = false
const messages: { name: string, message: string }[] = [];
let name: string = ""

export default {
  beforeUnmount() {
    isMounted = false
  },
  mounted() {
    //Si no tiene nombre definido alert preguntando cómo quiere llamarse
    if (name.length == 0) {
      console.log("me abro maquina")
      Swal.fire({
        title: "Introduce tu nombre",
        input: "text",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
      }).then(function (res) {
        if (res.isDismissed) {
          name = "Anónimo"
          Swal.fire({
            title: "Nombre definido",
            text: "¡Hablarás de forma anónima!",
            icon: "success"
          });
        } else {
          socket.emit('defineName', res.value)
          name = res.value
          Swal.fire({
            title: "Nombre definido",
            text: "¡Hablarás como " + res.value + "!",
            icon: "success"
          });
        }
      });
    }
    isMounted = true
    messages.forEach(message => {
      addMessageInDOM(message);
    })
    const inputMessage = document.querySelector('#input') as HTMLInputElement
    const socket: Socket = Main.getInstance().getSocketClient().getSocket()
    inputMessage.addEventListener('keyup', (event) => {
      if (event.key == 'Enter') {
        const message = inputMessage.value
        socket.emit('sendMessage', message)
        inputMessage.value = ''
      }
    })
  }
}

//Carga de mensajes al DOM
const addMessageInDOM = (message: { name: string, message: string }) => {
  const divChat = document.querySelector('#divChat')!
  const div = document.createElement('div')
  div.innerHTML = `
          <div>
          <div class="title"><strong>${message.name}</strong></div> 
          <div class="desc">${message.message}</div>
          </div>`
  divChat.append(div)
}

//Recibir mensaje y añadirlos al DOM
export const receiveMessage = (message: { name: string; message: string }) => {
  messages.push(message);
  if (isMounted) {
    addMessageInDOM(message)
  }
}
</script>