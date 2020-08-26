const repository = require('../repositories/pokemonRepository');

module.exports = {
  async index(request, response) {
    try {
      const page = request.query.page || 1;
      const pokemons = await repository.index(page);
      const {
        data,
        totalCount,
        hasNextPage,
        hasPreviousPage,
        lastPage,
        message,
      } = pokemons;
      return response.status(200).send({
        data,
        totalCount,
        hasNextPage,
        hasPreviousPage,
        lastPage,
        message,
      });
    } catch (error) {
      return response.status(400).send({
        message: 'Error on finding pokemons.',
      });
    }
  },

  async show(request, response) {
    try {
      const pokemon = await repository.show(request.params.id);
      return response.status(200).send({
        data: pokemon,
        message: pokemon !== null ? 'Pokemon founded.' : 'Pokemon not founded',
      });
    } catch (error) {
      return response.status(400).send({
        message: 'Error on finding pokemon.',
      });
    }
  },

  async store(request, response) {
    try {
      const pokemons = await repository.store(request.body);

      return response.status(201).send({
        data: pokemons,
        message:
          pokemons.length === 1
            ? 'Pokemon inserted.'
            : `${pokemons.length} Pokemons inserted`,
      });
    } catch (error) {
      return response.status(400).send({
        message: 'Error on inserting pokemon.',
      });
    }
  },

  async update(request, response) {
    try {
      const { name, theme } = request.body;
      const { userId } = request;

      const pokemon = await repository.update(
        request.params.id,
        name,
        theme,
        userId
      );

      return response.status(200).send({
        data: pokemon,
        message: 'Pokemon updated.',
      });
    } catch (error) {
      return response.status(400).send({
        message: 'Error on updating pokemon.',
      });
    }
  },

  async destroy(request, response) {
    try {
      await repository.destroy(request.params.id);
      return response.status(200).send({
        message: 'Pokemon removed.',
      });
    } catch (error) {
      return response.status(400).send({
        message: 'Error on removing pokemon.',
      });
    }
  },
};
