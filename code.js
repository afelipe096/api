
let btnSiguiente = document.querySelector("#boton_siguiente")
let btnAnterior = document.querySelector("#boton_anterior")

btnSiguiente.setAttribute('data-url-poke', 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20')
btnAnterior.setAttribute('data-url-poke', '')

btnSiguiente.addEventListener('click', function (pasar) {
    let url = pasar.target.dataset.urlPoke
    if (url != 'null') {
        pokemonConsumoApi(pasar.target.dataset.urlPoke)
    }
})

btnAnterior.addEventListener('click', function (devolver) {
    let url = devolver.target.dataset.urlPoke
    if (url != 'null') {
        pokemonConsumoApi(devolver.target.dataset.urlPoke)
    }
})


pokemonConsumoApi()

function pokemonConsumoApi(url_api = 'https://pokeapi.co/api/v2/pokemon') {
    let divPokemons = document.querySelector("#grilla-pokemons")
    let dataPokeapi = fetch(url_api)

    divPokemons.innerHTML = ''
    dataPokeapi.then(entrarObjetos => entrarObjetos.json())
        .then(infojson => {
            infojson.results.forEach(element => {
                let pokemonUrl = element.url
                let consumoPokeapi = fetch(pokemonUrl)
                consumoPokeapi.then(contenidoPoke => contenidoPoke.json())
                    .then(contenidojson => {

                        let estadisticasPoke = ''
                        contenidojson.stats.forEach(datosStats => {
                            if (datosStats.stat.name == 'hp') {
                                estadisticasPoke += `<div class="text-start fw-normal fs-6 text-white">Vida</div>
                                <div class="progress mb-1" role="progressbar" aria-label="info example" aria-valuenow="${datosStats.base_stat}" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar bg-info text-dark" style="width: ${datosStats.base_stat}%">${datosStats.base_stat}%</div>
                                </div>`
                            } else if (datosStats.stat.name == 'defense') {
                                estadisticasPoke += `<div class="text-start fw-normal fs-6 text-white">Defensa</div>
                                <div class="progress mb-1" role="progressbar" aria-label="warning example" aria-valuenow="${datosStats.base_stat}" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar bg-warning text-dark" style="width: ${datosStats.base_stat}%">${datosStats.base_stat}%</div>
                                </div>`
                            } else if (datosStats.stat.name == 'attack') {
                                estadisticasPoke += `<div class="text-start fw-normal fs-6 text-white">Ataque</div>
                                <div class="progress mb-1" role="progressbar" aria-label="danger example" aria-valuenow="${datosStats.base_stat}" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar bg-danger text-dark" style="width: ${datosStats.base_stat}%">${datosStats.base_stat}%</div>
                                </div>`
                            }

                        })





                        divPokemons.innerHTML += `
                    <div class="card m-3 btn carta_poke" style="width: 18rem; ">
                        <img src="${contenidojson.sprites.other["official-artwork"].front_default}" class="card-img-top h-50 p-3" alt="...">
                        <div class="card-body">
                            <h3 class="card-title text-white">${contenidojson.name}</h3>
                            <div class="card-body d-flex justify-content-between mb-0 pb-1">
                                <p class="card-text text-white  fw-medium mb-0">Altura: ${contenidojson.height} Ft</p>
                                <p class="card-text text-white  fw-medium mb-0">Peso: ${contenidojson.weight} Kg</p>
                            </div>
                            <div class="d-flex justify-content-between mt-0 pt-0">
                                <p class="card-text text-white  fw-medium ms-3 mt-0 pt-0">Tipo: ${contenidojson.types[0].type.name}</p>                                                         
                        </div> 
                            </div>
                                ${estadisticasPoke}
                            <div>                        
                    </div>
                    `}
                    )

                btnAnterior.setAttribute('data-url-poke', infojson.previous)
                btnSiguiente.setAttribute('data-url-poke', infojson.next)

            });

        })
}


let formBusqueda = document.querySelector("#formulario_buscar")
formBusqueda.addEventListener('submit', function (evento) {
    evento.preventDefault()
    let pokeBusqueda = evento.target.buscador_pokemons.value
    buscarPokemons(pokeBusqueda)
})

function buscarPokemons(busqueda) {

    let divBusqueda = document.querySelector("#grilla-pokemons")
    divBusqueda.innerHTML = ''
    let urlBusqueda = `https://pokeapi.co/api/v2/pokemon/${busqueda}/`
    let fetchPoke = fetch(urlBusqueda)
    fetchPoke.then(contenidoBusqueda => contenidoBusqueda.json())
        .then(pokemon => {

            let estadisticasPoke = ''
            pokemon.stats.forEach(datosStats => {
                if (datosStats.stat.name == 'hp') {
                    estadisticasPoke += `<div class="text-start fw-normal fs-6 text-white">Vida</div>
                                <div class="progress mb-1" role="progressbar" aria-label="info example" aria-valuenow="${datosStats.base_stat}" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar bg-info text-dark" style="width: ${datosStats.base_stat}%">${datosStats.base_stat}%</div>
                                </div>`
                } else if (datosStats.stat.name == 'defense') {
                    estadisticasPoke += `<div class="text-start fw-normal fs-6 text-white">Defensa</div>
                                <div class="progress mb-1" role="progressbar" aria-label="warning example" aria-valuenow="${datosStats.base_stat}" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar bg-warning text-dark" style="width: ${datosStats.base_stat}%">${datosStats.base_stat}%</div>
                                </div>`
                } else if (datosStats.stat.name == 'attack') {
                    estadisticasPoke += `<div class="text-start fw-normal fs-6 text-white">Ataque</div>
                                <div class="progress mb-1" role="progressbar" aria-label="danger example" aria-valuenow="${datosStats.base_stat}" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar bg-danger text-dark" style="width: ${datosStats.base_stat}%">${datosStats.base_stat}%</div>
                                </div>`
                }

            })

            divBusqueda.innerHTML += `
                    <div class="card m-3 btn carta_poke" style="width: 18rem; ">
                        <img src="${pokemon.sprites.other["official-artwork"].front_default}" class="card-img-top h-50 p-3" alt="...">
                        <div class="card-body">
                            <h3 class="card-title text-white">${pokemon.name}</h3>
                            <div class="card-body d-flex justify-content-between">
                                <p class="card-text text-white fw-medium mb-0 ">Altura: ${pokemon.height} Ft</p>
                                <p class="card-text text-white fw-medium mb-0">Peso: ${pokemon.weight} Kg</p>
                            </div>          
                            <div class="d-flex justify-content-between mt-0 pt-0">
                            <p class="card-text text-white  fw-medium ms-3 mt-0 pt-0">Tipo: ${pokemon.types[0].type.name}</p>                                                         
                    </div> 
                        </div>
                            ${estadisticasPoke}
                        <div>                        
                </div>
                    </div>`
        })

}