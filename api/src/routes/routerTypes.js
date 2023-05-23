const express = require('express');
const {Pokemon,Type}=require("../db");
const { getApiDetail, getAllPokemon } = require('./funtions');
const router = express.Router();

router.get("/", async (req,res)=>{
   try{
    let pokemons = await getAllPokemon();
    console.log(pokemons);
    return res.status(200).send(pokemons);
   }
   catch(error){
      console.log(error);
   }
})

