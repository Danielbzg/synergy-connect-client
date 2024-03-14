import { Manager, Socket } from 'socket.io-client'
import { addNote, clientConnectedForNotes, removeNote, updateNote } from '@/views/TeamNotes.vue'
import { receiveMessage } from '@/views/Forum.vue'
import { clientConnectedForHome, reloadStatus } from '@/views/HomeView.vue'
export class SocketClient {
  private socket!: Socket
  connectToServer = () => {
    const manager = new Manager('localhost:3000/socket.io/socket.io.js')

    this.socket = manager.socket('/')

    this.addListeners(this.socket)
  }
  getSocket(): Socket {
    return this.socket
  }
  addListeners = (socket: Socket) => {
    //Conexión del front con el server
    socket.on('connect', () => {
      reloadStatus();
      loadIdClient();
      console.log('connected')
    })

    //Desconexión del front con el server
    socket.on('disconnect', () => {
      reloadStatus();
      loadIdClient();
      console.log('disconnected');
    })

    //Función para actualizar el id del cliente
    const loadIdClient = () => {
      socket.on('clients-updated', (clients: string[]) => {
      clientConnectedForNotes(clients)
      clientConnectedForHome(clients)
      })
    }
    
    //Añadir la nota a la vista del frontend
    socket.on('addNote', (note: { id: string; title: string; description: string }) => {
      addNote(note)
    })

    //Modificar la nota
    socket.on('updatedNote', (note: { id: string; title: string; description: string }) => {
      updateNote(note)
    })

    //Eliminar la nota
    socket.on('removedNote', (noteID: string) => {
      console.log('nota borrada: ' + noteID)
      removeNote(noteID)
    })

    // ------- LÓGICA FORO -------
    socket.on('receiveMessage', (message: { name: string; message: string }) => {
      console.log('mensaje recibido de ' + message.name + ' - ' + message.message)
      receiveMessage(message)
    })
  }
}
