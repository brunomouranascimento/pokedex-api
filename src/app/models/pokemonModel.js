const mongoose = require('../../database/database');

const PokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  speciesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Species',
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
  base_experience: {
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
