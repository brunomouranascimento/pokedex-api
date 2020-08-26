const mongoose = require('../../database/database');

const PokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  speciesId: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  baseExperience: {
    type: Number,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  isDefault: {
    type: Number,
    required: true,
  },
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;
