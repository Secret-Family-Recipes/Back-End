exports.seed = function(knex) {
  return knex('measurements').insert([
    { name: 'drop' },
    { name: 'smidgen' },
    { name: 'pinch' },
    { name: 'dash' },
    { name: 'fl dr' },
    { name: 'tsp' },
    { name: 'dsp' },
    { name: 'tbsp' },
    { name: 'oz' },
    { name: 'wineglass' },
    { name: 'cup' },
    { name: 'pint' },
    { name: 'quart' },
    { name: 'gallon' }
  ]);
};
