const { Router } = require('express');
const router = Router();

router.use(Router.json());
//const dogRoutes = require('./dogs.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {Temperament, Dog} = require ('../db')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//router.use('/', dogRoutes )

// router.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type,Accept");
//     next();
// });

const getApiInfo = async() => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=live_pGePDKv8mIietEzLzSNz60au5uLbLtDVElb4QkyiOJF1wTL6sNTl299q7gP5ijTJ');
    const apiInfo = await apiUrl.data.map(element => {
        return{
            // weight: element.weight,
            // heigth: element.height,
            // id: element.id,
            // name: element.name,
            // bred_for: element.bred_for,
            // breed_group: element.breed_group,
            // life_span: element.life_span,
            // temperament: element.temperament,
            // origin: element.origin,
            // image: element.image,
            id: element.id,
            name: element.name,
            min_height: element.height.metric.split("-")[0].trim(),
            max_height: element.height.metric.split("-").reverse()[0].trim(),
            min_weight: element.weight.metric.split("-")[0].trim(),
            max_weight: element.weight.metric.split("-").reverse()[0].trim(),
            life_span: element.life_span,
            image: element.image.url,
            temperament: element.temperament,
            reference_image_id: element.reference_image_id   
        };
    });
    return apiInfo;
}

//obtengo perros de la base de datos

const getDbInfo = async () => {
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllDogs = async() => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/dogs', async (req,res) =>{
    const name = req.query.name;
    let dogsTotal = await getAllDogs();
    if (name){
        let dogName = await dogsTotal.filter(element => element.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ?
        res.status(200).send(dogName) : 
        res.status(404).send('Perro no encontrado');
    }else{
        res.status(200).send(dogsTotal)
    };
})

// router.get('/temperaments', async (req,res)=>{
//     const temperamentsApi = await axios.get("https://api.thedogapi.com/v1/breeds");
//     const temperaments = temperamentsApi.map((element) => element.temperament);
//     const temEach = temperaments.map(element => {
//         for (let i=0;i < element.length; i++){
//             return element[i];
//         }
//     })
//     console.log(temEach)
//     temEach.forEach(element => {
//         Temperament.findOrCreate({
//             where: {name:element}
//         })
//     })
//     const allTemperaments = await Temperament.findAll();
//     res.send(allTemperaments);
// });

router.get("/temperaments", async function (req, res) {    
    let traertemperamentos = await Temperament.findAll()
    traertemperamentos = JSON.stringify(traertemperamentos, null, 2) 
    traertemperamentos = JSON.parse(traertemperamentos)
    if(traertemperamentos.length !== 0) {
        res.send(traertemperamentos) 
    } else {
     axios.get("https://api.thedogapi.com/v1/breeds") 
     .then(async respuesta => {
         let temperamentosfinal = []
         let temperamentos = respuesta.data.map((el) => el.temperament) 
         let nuevostemperamentos = temperamentos.map((el) => el && el.split(",")).flat()
         nuevostemperamentos.forEach((el) => {
             if(temperamentosfinal.indexOf(el) < 0) temperamentosfinal.push(el)
         })
         for (let i = 0; i < 5; i++) {
             await Temperament.create({
                 name: temperamentosfinal[i]
             }) 
         }
         res.send(temperamentosfinal.slice(9, 19))
     }) 
     .catch(error => {
         console.log(error)
     })           
    } 
})

// router.post('/dog', async (req,res)=>{//no anda el post, arreglar!
//     let{
//         name,
//         height,
//         weight,
//         life_span,
//         createdInDb,
//         image, 
//         temperament
//     } = req.body;

//     let dogCreated = await Dog.create({
//         name,
//         height,
//         weight,
//         life_span,
//         createdInDb,
//         image,
//     })

//     let temperamentDb = await Temperament.findAll({
//         where:{name:temperament}
//     })
//     dogCreated.addTemperament(temperamentDb);
//     res.send('Perro creado!')
// });

router.post("/dog", async (req, res) => {
    const {
      name,
      min_height,
      max_height,
      min_weight,
      max_weight,
      life_span,
      image,
      temperament,
      createdInDb,
    } = req.body;
    try {
      const dogCreated = await Dog.create({
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        image,
        createdInDb, //le paso los mismos atributos del modelo porque lo voy a agregar a la base de datos
      });
  
      const temperamentDb = await Temperament.findAll({
        where: {
          name: temperament,
        },
      });
      
      await dogCreated.addTemperament(temperamentDb);
      res.status(201).json({ success: "Dog succesfully created!" });
    } catch (error) {
      res.status(400).json({ error:"Dog cant be created"});
    }
});

// {   "id":6456456456,   
//     "name":"pepe",
// "min_height":{"metric":'11 -11'},
//       "max_height":{"metric":'22 - 22'},
//       "min_weight":{"metric": '33 - 33'},
//       "max_weight":{"metric":'44 - 44'},
//       "life_span":"10 - 10 years",
//       "image":{"id":"BJa4kxc4X","width":1600,"height":1199,"url":"https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"},
//       "temperament":"Stubborn, Curious, Playful, Adventurous, Active",
//       "createdInDb" : true
// }

  

router.get('/dogs/:id', async (req,res)=>{
    const id = req.params.id;
    const dogsTotal = await getAllDogs();
    if (id){
        let dogId = await dogsTotal.filter(element=>element.id == id);
        dogId.length ?
        res.status(200).json(dogId) :
        res.status(404).send('No se encontro el perro!')
    };
});

module.exports = router;
 