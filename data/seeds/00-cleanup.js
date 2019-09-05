exports.seed = function(knex) {
  try {
    await knex.truncate('users');
  } catch (err) {
    console.error(err);
  }
};
