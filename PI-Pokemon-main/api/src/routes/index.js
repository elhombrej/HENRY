const { Router } = require('express');
const router = Router();
const bodyparse = require('body-parser');

router.use(bodyparse.json());
router.use(bodyparse.urlencoded({extended:true}));


const axios = require ('axios');
const {Type, Pokemon} = require ('../db');

let reqInstance = axios.create({
    headers: {
        "Accept-Encoding": "null"
      }
    }
)

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
            img: pokemon.data.sprites.other.dream_world.front_default,
            createdInDb: false,
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

const getAllPokemons = async() => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allPokemon = apiInfo.concat(dbInfo);
    return allPokemon;
}

//ruta para obtener los primeros 40 pokemones de la api y base de datos

router.get('/pokemons', async (req,res) =>{
    const {name} = req.query;
    let pokemonsTotal = await getAllPokemons();
    if (name){
        let pokemonName = await pokemonsTotal.filter(element => element.name.toLowerCase() === name.toLowerCase());
        pokemonName.length ?
        res.status(200).send(pokemonName) : 
        res.status(404).send('Pokemon no encontrado');
    }else{
        res.status(200).send(pokemonsTotal)
    };
})

//Busco el pokemon por ID proveniente por parametro

router.get('/pokemon/:id', async(req,res)=>{
    const{id} = req.params;
    const allPokemonsId = await getAllPokemons();
    if(id){
        let pokemonById = allPokemonsId.filter(element => element.id == id);
        pokemonById.length ?
        res.status(200).send(pokemonById) :
        res.status(400).send('ERROR: No existe pokemon con dicho ID')
    }
})

//Creo un Pokemon

router.post('/pokemon', async (req,res)=> {

    const{
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        img
    }=req.body;

    console.log(name,hp,attack,defense,speed,height,weight,img)

    try{
        // if (name) {
        //     const allPokemons = await getAllPokemons();
        //     const isPokemon = allPokemons.find(element => element.name.toLowerCase() === name.toLowerCase());
        //     if(!isPokemon){

                const pokemonCreated = await Pokemon.create({
                    name,
                    hp,
                    attack,
                    defense,
                    speed,
                    height,
                    weight,
                    img
                });
    
                const typeDb = await Type.findAll({
                    where: {
                        name: types
                    }
                });
                await pokemonCreated.addType(typeDb);
                return res.status(201).send(pokemonCreated);
            // }
            // return res.status(404).send('ERROR: Este Pokemon ya existe!');
        // }
    }catch(error){
        // !name ? 
        res.status(404).send("ERROR: El necesario que escriba el nombre") //:
        // res.status(404).send(error);
    }
    });

    /*
    "id":6
"name":"pazoozoo"
"hp":78
"attack":84
"defense":78
"speed":100
"height":17
"weight":905
"types":["name": "fire"]
"img":"pokemon.data.sprites.other.dream_world.front_default"
    */

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
 