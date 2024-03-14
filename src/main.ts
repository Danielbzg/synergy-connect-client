import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import CustomCard from '@/components/CustomCard.vue';
import { SocketClient } from '@/services/socket-client'

const socketClient: SocketClient = new SocketClient()

export class Main {
  private static instance: Main
  public static getInstance(): Main {
    if (!Main.instance) {
      Main.instance = new Main()
    }
    return Main.instance
  }
  getSocketClient(): SocketClient {
    return socketClient
  }
}

const app = createApp(App)

app.use(router)

app.component('custom-card', CustomCard);

app.mount('#app')

console.log('¡Conectando al servidor!')
socketClient.connectToServer()
