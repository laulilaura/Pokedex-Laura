app.component('liste', {
    template:
    /*html*/
    `
    <form class="mySearch"> 
          <input id="searchPokéData" class="searchPokéData" onkeyup="search_pokemon()" type="text"
            name="search" placeholder="Recherchez un Pokémon par son nom ou en utilisant son numéro Pokédex national.">
        </form>
    <div class="bodycenter">
        <ul class="myPokemon">

          <li class="pokemon" v-for="index in dataPoké" :key="index">
            <div class="chaquePoke">
              
              <img :src="index.sprites.front_default" :alt="index.name">
              <p>#{{ index.id }}</p>
              <h2>{{ index.name }}</h2>

              <button class="buttonAffiche" v-on:click="capaciteAffiche()">Afficher les caracteristiques</button>

              <div id ="capacite" class="capacite" ref="capaciteref">
                <li v-for="abilities in index.abilities" :key="abilities">
                    {{ abilities.ability.name}}
                </li>
                <button class="buttonCache"  v-on:click="capaciteAffiche()">Cacher les caracteristiques</button>
              </div>

            </div>
          </li>

        </ul>
      </div>
      <script>
        function search_pokemon() {
          let input = document.getElementById('searchPokéData').value
          input=input.toLowerCase();
          let x = document.getElementsByClassName('pokemon');
          
          for (i = 0; i < x.length; i++) {
              if (!x[i].innerHTML.toLowerCase().includes(input)) {
                  x[i].style.display="none";
              }
              else {
                  x[i].style.display="inline-block";
              }
          }
           console.log("recherche script")
        }
        function capaciteAffiche(hiddenElm){
          maDesc = document.getElementById('capacite');
          maDesc.style.visibility = hiddenElm;
        }
      </script>
    `,
  data(){
    return {
      dataPoké: []
    }
  },
  beforeMount() {
      this.getListPokemon()
  },
  methods: {
    async getListPokemon() {

      // Recupere le nombre de Pokemon a recuperer
      try {
          let repTaille = await fetch("https://pokeapi.co/api/v2/pokemon")
          if (repTaille.ok) {
              let buffer = await repTaille.json()
              nbPokemon = buffer.count
              //nbPokemon = 200 // Limitation artificielle
          } 
          else {
              console.log("Erreur du serveur")
              alert("Le chargement des donnés n'a pas pu être fait")
          }
      }
      catch (err) {
          console.log(err)
      }

      // Permet de recuperer la liste du nombre de Pokemon definis par la variable nbPokemon
      // Afin d'avoir acces au tableau results
      try {
          let repAllPokemon = await fetch("https://pokeapi.co/api/v2/pokemon?limit=" + nbPokemon)
          if (repAllPokemon.ok) {
              let listPoke = await repAllPokemon.json()
              dataListe = listPoke
          } 
          else {
              console.log("Erreur du serveur")
              alert("Le chargement des donnés n'a pas pu être fait")
          }
      } 
      catch (err) {
          console.log(err)
      }

      // ##########################################################################################


      // Boucle qui récupère pour chaque url de Pokemon les donnees de chaque Pokemon (id, name, abilities, types,...)
      // En parcourant le tableau results obtenu juste avant
      for (let i = 0; i < dataListe.results.length; i++) {                
      
          try {
              let repUrl = await fetch(dataListe.results[i].url)
              if (repUrl.ok) {
                  let data = await repUrl.json()
                  this.dataPoké[i] = data
              }
              else {
                  console.log("Erreur du serveur")
                  alert("Le chargement des donnés n'a pas pu être fait")
              }
          } 
          catch (err) {
              console.log(err)
          }
      }
    },capaciteAffiche: function() {
      maDesc = this.$refs.capaciteref;
      console.log(maDesc);
      maDesc.style.visibility = maDesc.style.visibility == "visible" ? "hidden" : "visible";
    }
  }
  
})