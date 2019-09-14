exports.seed = async function(knex) {
  try {
    await knex.truncate('ingredients');
    await knex.truncate('measurements');
    await knex.truncate('steps');
    await knex.truncate('recipes_categories');
    await knex.truncate('recipes');
    await knex.truncate('categories');
    await knex.truncate('users');
  } catch (err) {
    console.error(err);
  }
};
