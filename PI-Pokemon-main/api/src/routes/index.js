const { Router } = require('express');
const axios = require ('axios');
const {Type, Pokemon} = require ('../db');

let reqInstance = axios.create({
    headers: {
        "Accept-Encoding": "null"
      }
    }
)

const router = Router();

const getApiInfo = async ()=>{
    let apiUrl = "https://pokeapi.co/api/v2/pokemon"
    let pokemons = [];
    do{
        let info = await reqInstance.get(apiUrl)
        let pokemonsApi = info.data;
        let auxPokemons = pokemonsApi.results?.map(element =>{
            return{
                name: element.name,
                url: element.url
            }
        })
        pokemons.push(...auxPokemons);
        apiUrl = pokemonsApi.next;
    }while(apiUrl != null && pokemons.length < 40);

    console.log(pokemons);

    let pokemonsData = await Promise.all(pokemons.map(async element =>{
        let pokemon = await reqInstance.get(element.url);

        return{
            id: pokemon.data.id,
            name: pokemon.data.name,
            hp: pokemon.data.stats[0].base_stat,
            attack: pokemon.data.stats[1].base_stat,
            defense: pokemon.data.stats[2].base_stat,
            speed: pokemon.data.stats[5].base_stat,
            height: pokemon.data.height,
            weight: pokemon.data.weight,
            types: pokemon.data.types.map(element=>{
                return ({
                    name: element.type.name
                })
            }),
            img: pokemon.data.sprites.other.home.front_default,
        }
    }));
    return pokemonsData;
};

//obtengo pokemons de la base de datos

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include:{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

//obtentgo pokemons de la api y la base de datos para concatenarlos

const getAllPokemon = async() => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allPokemon = apiInfo.concat(dbInfo);
    return allPokemon;
}

//ruta para obtener los primeros 40 pokemones de la api y base de datos

router.get('/pokemons', async (req,res) =>{
    const {name} = req.query;
    let pokemonsTotal = await getAllPokemon();
    if (name){
        let pokemonName = await pokemonsTotal.filter(element => element.name.toLowerCase() === name.toLowerCase());
        pokemonName.length ?
        res.status(200).send(pokemonName) : 
        res.status(404).send('Pokemon no encontrado');
    }else{
        res.status(200).send(pokemonsTotal)
    };
})

// router.get("/temperaments", async function (req, res) {    
//     let traertemperamentos = await Temperament.findAll()
//     traertemperamentos = JSON.stringify(traertemperamentos, null, 2) 
//     traertemperamentos = JSON.parse(traertemperamentos)
//     if(traertemperamentos.length !== 0) {
//         res.send(traertemperamentos) 
//     } else {
//      axios.get("https://api.thedogapi.com/v1/breeds") 
//      .then(async respuesta => {
//          let temperamentosfinal = []
//          let temperamentos = respuesta.data.map((el) => el.temperament) 
//          let nuevostemperamentos = temperamentos.map((el) => el && el.split(",")).flat()
//          nuevostemperamentos.forEach((el) => {
//              if(temperamentosfinal.indexOf(el) < 0) temperamentosfinal.push(el)
//          })
//          for (let i = 0; i < 5; i++) {
//              await Temperament.create({
//                  name: temperamentosfinal[i]
//              }) 
//          }
//          res.send(temperamentosfinal.slice(9, 19))
//      }) 
//      .catch(error => {
//          console.log(error)
//      })           
//     } 
// })

module.exports = router;
 