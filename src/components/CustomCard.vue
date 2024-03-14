<template>
  <div class="cards">
    <div class="cards__body">
      <div class="flipCard">
        <div class="flipCardInner">
          <div class="flipCardFront" :class="frontClass">
            <h2 class="cards__tittle">{{ frontTitle }}</h2>
            <img class="cards__image" :src="frontImage" :alt="frontAlt">
            <h3 class="cards__name">{{ frontName }}</h3>
          </div>
          <div class="flipCardBack" :class="backClass">
            <div>
              <div>
                <h2 class="cards__tittle">{{ backTitle }}</h2>
                <p class="textosPersonajes">{{ backContent }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    frontTitle: String,
    frontImage: String,
    frontAlt: String,
    frontName: String,
    backTitle: String,
    backContent: String,
    frontClass: {
      type: String,
      default: 'fondoCartaUno'
    },
    backClass: {
      type: String,
      default: 'fondoCartaUno'
    }
  }
};
</script>

<style scoped>
.cards {
    margin: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;

}

.cards__body {
    margin: 2% 4%;
    min-width: 15rem;
    width: 15rem;
    min-height: 15rem;
    box-sizing: border-box;
}

.flipCard {
    background-color: transparent;
    height: 12rem;
    /* Es necesario una altura para que aparezca en la página */
    border: 0px;
    perspective: 100rem;
    /* Genera un efecto 3D */
}


.flipCardInner {
    /* Este contenedor nos posiciona los dos lados de la tarjeta */
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.5s;
    transform-style: preserve-3d;
}

.flipCard:hover .flipCardInner {
    /* Crea la animación para girar la tarjeta de forma horizontal cuando el ratón se pone encima*/
    transform: rotateY(180deg);
    /*transform: rotateX(180deg);*/
    /*si lo quieres con giro vertical*/
}

.flipCardFront,
.flipCardBack {
    /* Estructura básica de las dos caras */
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    /* Safari */
    backface-visibility: hidden;
    padding: 1rem;
    width: 12rem;
    height: 12rem;
    border-width: 0.5rem;
    /*background: linear-gradient(to bottom, rgba(135, 207, 235, 0.8), rgba(255, 255, 255, 0.5) 80%);*/
    display: flex;
    flex-direction: column;
    align-items: center;
}

.flipCardFront {
    border-style: inset;
    border-radius: 3rem;
    display: flex;
    justify-content: center;
}

.flipCardBack {
    /* Estructura específica de la cara trasera */
    color: black;
    transform: rotateY(180deg);
    border-style: outset;
    border-radius: 3rem;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
}

.cards__image {
    width: 50%;
    height: 50%;
}

.cards__tittle {
    color: rgb(0, 0, 0);
    font-size: 1rem;
    font-style: oblique;
}

.cards__name {
    color: rgb(0, 0, 0);
    font-size: 1rem;
    font-weight: bolder;

}

.fondoCartaUno{
  background-color: rgb(65, 155, 240);
}

.textosPersonajes{
  font-size: small;
}
</style>

