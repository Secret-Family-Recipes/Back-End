exports.seed = async function(knex) {
  try {
    await knex.truncate('measurements');
    await knex.truncate('categories');
  } catch (err) {
    console.error(err);
  }
};
