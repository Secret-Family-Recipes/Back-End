exports.seed = function(knex) {
  return knex('categories').insert([
    { name: 'Breakfast' },
    { name: 'Brunch' },
    { name: 'Elevenses' },
    { name: 'Lunch' },
    { name: 'Tea' },
    { name: 'Supper' },
    { name: 'Dinner' },
    { name: 'Desserts' }
  ]);
};
