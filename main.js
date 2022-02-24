const app = Vue.createApp({
    data(){
        return {
            product: 'Pokédex',
            company: 'The Pokémon Company',
            endText: '©2022 Pokémon. ©1995-2022 Nintendo/Creatures Inc./GAME FREAK inc. TM,®Nintendo.',
            baseURL: 'https://pokeapi.co/api/v2/pokemon/ditto'
        }
    }
})
