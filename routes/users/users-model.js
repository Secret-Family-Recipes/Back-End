const db = require('../../data/db-config');

module.exports = {
  find,
  findById,
  findRecipesByUserId,
  update,
  remove
};

function find() {
  return db('users').select(
    'id',
    'family_name',
    'first_name',
    'last_name',
    'email'
  );
}

function findById(id) {
  return db('users')
    .select('id', 'family_name', 'first_name', 'last_name', 'email')
    .where({ id })
    .first();
}

function findRecipesByUserId(created_by) {
  return db('recipes').where({ created_by });
}

function update(updates, id) {
  return db('users')
    .where({ id })
    .update(updates)
    .then(async () => {
      return await findById(id);
    });
}

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}
