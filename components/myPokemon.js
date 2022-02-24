app.component('my-pokemon', {
    template:
    /*html*/
    `
    <div class="moreInfo" v-for="index in dataPoké" :id="index.id">
        <div>
            <h2>Les détails :</h2>
            <h3>
                {{ index.name }}
            </h3>
            <h4>{{ index.id }}</h4>
            <img :src="index.sprites.front_default" :alt="index.name">
            <p>Type :</p>
            <ul>
                <li v-for="types in index.types" :key="types">
                    {{ types.type.name }}
                </li>
            </ul>
            <p>Capacités :</p>
            <ul>
                <li v-for="abilities in index.abilities" :key="abilities">
                    {{ abilities.ability.name}}
                </li>
            </ul>
            <a href="#" @click="details(index.id)" class="lienDetail">Cliquez ici pour fermer la boîte</a>
        </div>
    </div>
    `
})