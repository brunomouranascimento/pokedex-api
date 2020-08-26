const { Router } = require('express');

const pokemonController = require('../controllers/pokemonController');

const routes = Router();

routes.get('/pokemons', pokemonController.index);
routes.get('/pokemon/:id', pokemonController.show);
routes.post('/pokemon', pokemonController.store);
routes.put('/pokemon/:id', pokemonController.update);
routes.delete('/pokemon/:id', pokemonController.destroy);

module.exports = (app) => app.use('/', routes);
