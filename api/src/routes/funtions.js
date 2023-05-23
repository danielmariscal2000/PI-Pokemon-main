const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getApiInfo = async () => {
  try {
    const dataUrl = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=20"
    );
    const results = dataUrl.data.results;
    const pokemonInfo = [];
    for (let i = 0; i < results.length; i++) {
      const pokemons = await axios.get(results[i].url);
      const dataPokemons = pokemons.data;
      pokemonInfo.push({
        id: dataPokemons.id,
        name: dataPokemons.name,
        types: dataPokemons.types.map((t) => {
          return {
            name: t.type.name,
            img: `https://storage.googleapis.com/nianticweb-media/pokemongo/types/${t.type.name}.png?cb=1`,
          };
        }),
        img: dataPokemons.sprites.other["official-artwork"].front_default,
        weight: dataPokemons.weight,
        height: dataPokemons.height,
        hp: dataPokemons.stats[0].base_stat,
        attack: dataPokemons.stats[1].base_stat,
        defense: dataPokemons.stats[2].base_stat,
        speed: dataPokemons.stats[5].base_stat,
      });
    }
    //console.log(pokemonInfo);
    return pokemonInfo;
  } catch (error) {
    console.log(error);
  }
};
const getApiDetail = async (arg) => {
  try {
    const urlInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${arg}`);
    const dataPokemons = urlInfo.data;
    const resPokemon = {
      id: dataPokemons.id,
      name: dataPokemons.name,
      types: dataPokemons.types.map((t) => {
        return {
          name: t.type.name,
          img: `https://storage.googleapis.com/nianticweb-media/pokemongo/types/${t.type.name}.png?cb=1`,
        };
      }),
      img: dataPokemons.sprites.other["official-artwork"].front_default,
      attack: dataPokemons.stats[1].base_stat,
      weight: dataPokemons.weight,
      height: dataPokemons.height,
      hp: dataPokemons.stats[0].base_stat,
    };
    //console.log(resPokemon);
    return resPokemon;
  } catch (error) {
    console.log(error);
  }
};
const getDbInfo = async () => {
  try {
    let res = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    //console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//TRAIGO TODOS LOS POKEMONES, TANTO DE LA API COMO DE LA DB.
const getAllPokemon = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allPokemon = apiInfo.concat(dbInfo);
    return allPokemon;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllPokemon,
  getApiDetail,
};
