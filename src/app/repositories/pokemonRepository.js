const Pokemon = require('../models/pokemonModel');

const POKEMONS_PER_PAGE = 20;

module.exports = {
  async index(page) {
    try {
      const totalPokemons = await Pokemon.find().countDocuments();
      const pokemons = await Pokemon.find()
        .skip((page - 1) * POKEMONS_PER_PAGE)
        .limit(POKEMONS_PER_PAGE)
        .populate('user');
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

  async store(name, theme, userId) {
    try {
      const pokemon = await Pokemon.create({
        name,
        theme,
      });

      await pokemon.save();

      return pokemon;
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
