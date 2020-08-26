const Pokemon = require('../models/pokemonModel');

const POKEMONS_PER_PAGE = 20;

module.exports = {
  async index(page) {
    try {
      const totalPokemons = await Pokemon.find().countDocuments();
      const pokemons = await Pokemon.find()
        .skip((page - 1) * POKEMONS_PER_PAGE)
        .limit(POKEMONS_PER_PAGE);
      return {
        data: pokemons,
        totalCount: totalPokemons,
        hasNextPage: POKEMONS_PER_PAGE * page < totalPokemons,
        hasPreviousPage: page > 1,
        lastPage: Math.ceil(totalPokemons / POKEMONS_PER_PAGE),
        message: pokemons.length ? 'Pokemons loaded.' : 'Pokemons not found.',
      };
    } catch (error) {
      return error;
    }
  },

  async show(id) {
    try {
      const pokemon = await Pokemon.findById(id);
      return pokemon;
    } catch (error) {
      return error;
    }
  },

  async store(pokemonData) {
    try {
      let insertedPokemon = [];
      await Promise.all(
        pokemonData.map(async (pokemon) => {
          const {
            name,
            speciesId,
            height,
            weight,
            baseExperience,
            order,
            isDefault,
          } = pokemon;
          const newPokemon = new Pokemon({
            name,
            speciesId,
            height,
            weight,
            baseExperience,
            order,
            isDefault,
          });
          insertedPokemon.push(newPokemon);
          await newPokemon.save();
        })
      );
      return insertedPokemon;
    } catch (error) {
      return error;
    }
  },

  async update(id, name) {
    try {
      const pokemon = await Pokemon.findByIdAndUpdate(
        id,
        {
          name,
        },
        { new: true }
      );

      await pokemon.save();

      return pokemon;
    } catch (error) {
      return error;
    }
  },

  async destroy(id) {
    try {
      await Pokemon.findByIdAndRemove(id);
      return true;
    } catch (error) {
      return error;
    }
  },
};
