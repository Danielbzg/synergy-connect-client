<template>
  <main class="main">
    <div class="orgTexts">
      <h1 class="animate__animated animate__backInDown">Bienvenido/a a Synergy connect,</h1>
      <p>El lugar donde la colaboración cobra vida. Nuestra plataforma está diseñada para
        impulsar el trabajo en equipo y cultivar la sinergia entre los miembros de tu equipo. Con tableros intuitivos y
        un foro/chat de trabajo colaborativo, facilitamos la comunicación fluida y la coordinación eficiente de
        proyectos.
        Nuestros tableros te permiten visualizar tus tareas, asignar responsabilidades y realizar un seguimiento del
        progreso, todo en un entorno virtual accesible desde cualquier lugar. Ya sea que estés trabajando en un proyecto
        pequeño o en una iniciativa a gran escala, nuestra plataforma te brinda las herramientas necesarias para
        mantener el rumbo y alcanzar tus objetivos de manera colaborativa.
      </p>
      <p>Además, nuestro foro/chat de trabajo colaborativo proporciona un espacio interactivo donde los miembros del
        equipo pueden intercambiar ideas, compartir recursos y resolver problemas en tiempo real. Con funciones de
        mensajería instantánea y la capacidad de crear hilos de discusión temáticos, nunca ha sido tan fácil colaborar
        de manera efectiva con tus colegas.
      </p>
      <p>Únete a Synergy connect hoy y experimenta el poder de trabajar juntos en armonía. ¡Empieza a potenciar la
        productividad y la creatividad de tu equipo hoy mismo!</p>
    </div>

    <div class="orderCards">
      <div>
      <custom-card frontTitle="" frontImage="./src/assets/Notas.png" frontAlt="" frontName="Notas de equipo"
        backTitle=""
        backContent="El tablero de notas es un lugar donde colocar notas de tareas en las que el equipo podrá ver qué queda por hacer o qué está ejecutándose." />
    </div>

    <div>
      <custom-card frontTitle="" frontImage="./src/assets/Foro.png" frontAlt="" frontName="Foro"
        backTitle=""
        backContent="El foro o chat es un espacio digital donde los miembros del equipo pueden compartir actualizaciones de tareas y coordinar esfuerzos." />
    </div>
    </div>

    <div class="footer">
      <div class="ordStatusServer">
        <h2>Status Web: </h2>
        <div class="orgDotWithText">
          <p id="dot-server"></p>
          <p id="server-status"></p>
        </div>
      </div>
      <div class="tittleUsers">
        <h2>Connected users</h2>
        <div id="clients-ul-home">Connected users: </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 75vh;
    padding: 0 20px 10px 20px;
    overflow-x: hidden;
  }

  .orderCards{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .ordStatusServer {
    width: 25vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }

  .footer{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100vw;
  }

  .green {
    margin: 0 5px 0 20px;
    padding: 0;
    width: 15px;
    height: 15px;
    color: green;
    background-color: green;
    border: 1px;
    border-style: double;
    border-radius: 100%;
    animation: flickerDot infinite 3s forwards;
  }

  .red{
    margin: 0 5px 0 20px;
    padding: 0;
    width: 15px;
    height: 15px;
    color: brown;
    background-color: brown;
    border-radius: 5px;
    border: 1px;
    border-style: double;
    border-radius: 100%;
  }

  @keyframes flickerDot {
    0% {
        filter: opacity(0);
    }

    50% {
        filter: opacity(1);
    }

    100% {
        filter: opacity(0);
    }
}

.orgDotWithText{
  display: flex;
  flex-direction: row;
   align-items: center;
}

.tittleUsers{
  display: flex;
  flex-direction: row;
}

  #clients-ul-home{
    width: 60vw;
    max-height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: center;  
    flex-wrap: wrap;
  } 

</style>


<script lang="ts">
import { Main } from '@/main'
import { Socket } from 'socket.io-client'
import 'animate.css';

let isMounted: boolean = false
let clients: string[] = [];

export default {
    mounted() {
    isMounted = true
      reloadStatus();
      loadClients();
    },
    unmounted() {
      isMounted = false
    },
    methods: {
    }
  };

export const reloadStatus = () => {
  if(isMounted){
    const socket: Socket = Main.getInstance().getSocketClient().getSocket()
    //Identificar elementos
    const serverStatusLabel = document.querySelector('#server-status')!
    serverStatusLabel.innerHTML = socket.connected ? 'Active' : 'Offline'
    const dogServerStatusColor = document.querySelector('#dot-server')!
    dogServerStatusColor.className = socket.connected ? 'green' : 'red'  
  }
}

export const clientConnectedForHome = (clientsResult: string[]) => {
  clients = clientsResult;
  if (isMounted) {
    loadClients();
  }
}


const loadClients = () => {
  const clientsUL = document.querySelector('#clients-ul-home')!
  let clientsHtml = ''

  clients.forEach((clientId) => {
    console.log(clientId)
    clientsHtml += `
    <div style="margin: 10px;">
  <img src="./src/assets/userImage.png" alt="User's image" width="15" height="15"> ${clientId}
  </div>`
  })
  clientsUL.innerHTML = clientsHtml
  console.log(clientsUL)
}
</script>