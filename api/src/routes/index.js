const { Router } = require("express");
// Importar todos los routers;
const { Pokemon, Type } = require("../db");
const routerPokemons = require("./routerPokemons.js");
const { getApiDetail, getAllPokemon } = require("./funtions");
const { default: axios } = require("axios");
//const routerTypes = require('./routerTypes');

const router = Router();
//router.use('/pokemons', routerPokemons);
// router.use('/types', routerTypes);
router.get("/pokemons", async (req, res) => {
  const { name } = req.query;
  const allPokesName = await getAllPokemon();
  try {
    if (name) {
      let poke = allPokesName.filter(
        (e) => e.name.toLowerCase() === name.toLowerCase()
      );
      poke.length
        ? res.status(200).send(poke)
        : res.status(404).send("Pokemon not found");
    } else {
      let pokemons = await getAllPokemon();
      return res.status(200).send(pokemons);
    }
  } catch (e) {
    console.log(e);
  }
});
router.get("/pokemons/:id", async (req, res) => {
  const { id } = req.params;
  const allPokesName = await getAllPokemon();
  try {
    const poke = allPokesName.filter((e) => e.id == id);
    if (poke.length) {
      res.status(200).send(poke);
    } else {
      res.status(404).send("Pokemon not found");
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/types", async (req, res) => {
  let resTypes = [];
  const allPokesName = await getAllPokemon();
  try {
    // for (let i =0 ;i< allPokesName.length; i++){
    //      let arrayTypes=allPokesName[i].types;
    // console.log(arrayTypes);
    // for (let i = 0; i < arrayTypes.length; i++) {
    //     if(resTypes.indexOf(arrayTypes[i].name)==-1){
    //         resTypes.push(arrayTypes[i].name);
    //     }
    // }
    // arrayTypes.map(e=>{
    //     if(resTypes.indexOf(e.name)==-1){
    //         resTypes.push(e.name);
    //     }
    // })
    // }
    allPokesName.map((e) => {
      e.types.map((element) => {
        if (resTypes.indexOf(element.name) == -1) {
          resTypes.push(element.name);
        }
      });
    });
    console.log(resTypes);
    res.status(200).send(resTypes);
  } catch (error) {
    console.log(error);
  }
});
router.post("/types", async (req, res) => {
  const { types } = req.body;
  try {
    const res1 = types.map(async (e) => {
      const typeDb = await Type.findAll({
        where: {
          name: e,
        },
      });
      if (typeDb.length===0) {
        const newType = await Type.create({
          name: e,
        });
      }
    });
    return res.status(201).send(types);
  } catch (error) {
    console.log(error);
  }
});
router.post("/pokemons", async (req, res) => {
  const {
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    img,
    types,
    createdInDb,
  } = req.body;
  try {
    console.log(createdInDb, "aquiiiiiiiiiiiiiiii<");
    if (name) {
      const allPoke = await getAllPokemon();
      const isPoke = allPoke.find((e) => e.name === name.toLowerCase());
      if (!isPoke) {
        //let createdInBd="true";
        const pokemon = await Pokemon.create({
          name,
          hp,
          attack,
          defense,
          speed,
          height,
          weight,
          img,
          createdInDb: "true",
        });
        const typeDb = await Type.findAll({
          where: {
            name: types,
          },
        });
        pokemon.addType(typeDb);
        return res.status(201).send(pokemon);
      }
      return res.status(404).send("Pokemon name already exist");
    }
    if (!name) return res.status(404).send("Pokemon name is obligatory");
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
