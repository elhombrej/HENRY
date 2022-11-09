const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/', async(req,res)=>{
    try{
        const{code,name,hp,mana,age,race,date_added} = req.body;
        if(!code || !name || !hp || !mana)
            return res.status(404).send('Falta enviar datos obligatorios');
        const newCharacter = await Character.create(req.body);
        res.status(201).send(newCharacter);
    } catch(error){
        return res.status(404).send('Error en alguno de los datos provistos');
    }
});

router.get('/',async(req,res) =>{
    const {race} = req.query;
    try{
        if (race){
            const characters = await Character.findAll({where:{race}});
            return res.status(200).send(characters);
        }else{
            const characters = await Character.findAll();
            return res.status(200).send(characters);
        }
    }catch(error){
        console.log(error)
    }
});

router.get('/:code',async(req,res)=>{
    const {code} = req.params;
    try{
        const character = await Character.findByPk(code);
        if(!character){
            throw new Error(`El código ${code} no corresponde a un personaje existente`);    
        }
        return res.status(200).send(character);
    }catch(error){
        res.status(404).send(error.message);
    }
});

module.exports = router;