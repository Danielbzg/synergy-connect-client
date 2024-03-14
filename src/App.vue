<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import 'animate.css';
</script>

<template>
  <header>
    <div class="logo_name">
      <img alt="Vue logo" class="logo" src="@/assets/logo_colaborativo.png"/>  
    </div>

    <h1 class="animate__animated animate__backInDown titleMain">Synergy Connect</h1>
    
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/teamnotes">Notas de equipo</RouterLink>
        <RouterLink to="/forum">Foro</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

header {
  width: 100vw;
  max-height: 25vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background: linear-gradient(225deg, rgb(65, 155, 240), transparent);
}

.logo {
  width: 125px;
  height: 125px;
}

.logo_name{
  background-color: rgb(99, 57, 138);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  border-radius: 10px;
  border: 2px;
  border-style:groove;
  border-radius: 10px;
  border-color: #181818;
  padding: 10px;
  margin: 2rem;
}

.titleMain{
  font-size: 3rem;
  color: rgb(99, 57, 138);
  text-align: center;
  display: flex;
  animation: changeColor 20s infinite;
  -webkit-box-reflect: below -25px linear-gradient(transparent, transparent, rgba(100,100,100,0.35));
  font-family: MadimiOne;
}

nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
  text-align: center;
}

nav a {
  font-size: 1.5rem;
}

nav a.router-link-exact-active {
  color: rgb(255, 255, 255);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 0 1rem;
  border-left: 1px solid rgb(99, 57, 138);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
  }

  nav {
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    font-size: 1.5rem;
    text-align: center;
    padding: 1rem 0;
    
  }
}

@media (max-width: 750px) {
  header {
    flex-direction: column;
  }
}
</style>
