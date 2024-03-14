# Synergy Connect

Synergy Connect es una aplicación web construida con Vue.js y TypeScript, diseñada para mejorar la colaboración y comunicación dentro de equipos de trabajo. La aplicación utiliza WebSockets para permitir una comunicación en tiempo real entre los usuarios conectados.
En el backend (que está en otro repositorio) contaremos con los servicios para utilizar las funciones propias de un CRUD de notas que se gestionarán con la base de datos de Mongo DB. También existirán las funciones para gestionar información acerca de los usuarios conectados. 
El lado del cliente por su parte contará con 3 secciones en la web:
1ª Información y explicación de la web, donde se podrán consultar las personas conectadas al dominio
2ª Tablero de notas con las tareas por hacer
3ª Foro donde cualquier persona pueda escribir un mensaje para todas las personas conectadas.

## Características principales

- **Información y explicación:** Proporciona información sobre la aplicación y permite consultar las personas conectadas al dominio.
- **Tablero de notas:** Permite a los usuarios crear y gestionar tareas por hacer en un tablero colaborativo.
- **Foro:** Facilita la comunicación entre todos los usuarios conectados a través de un sistema de mensajes en tiempo real.

## Estructura del proyecto

El proyecto sigue una estructura modular, con la lógica del WebSocket y la conexión al servidor almacenada en la carpeta `services`.

- **`/services`:** Contiene la lógica del WebSocket y la conexión con el servidor.

## Instalación

1. Clona el repositorio desde GitHub:

```
git clone https://github.com/danielbzg/synergy-connect-client.git
```

2. Instala las dependencias:

```
cd synergy-connect
npm install
```

## Uso

1. Inicia el servidor de desarrollo:

```
npm run start
```

2. Accede a la aplicación en tu navegador:

```
http://localhost:5173
```

Obviamente para utilizar las funcionalidades tendrás que levantar docker y el servidor que contiene toda la lógica:



## Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir a Synergy Connect, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/feature-name`).
3. Realiza tus cambios y haz commits (`git commit -am 'Add new feature'`).
4. Haz push de tus cambios a la rama (`git push origin feature/feature-name`).
5. Abre un Pull Request.


