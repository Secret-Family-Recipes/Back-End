const db = require('../../data/db-config');

module.exports = {
  add,
  findBy,
  findById
};

function add(user) {
  return db('users')
    .returning('id')
    .insert(user)
    .then(async ([id]) => {
      return await findById(id);
    });
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .select('id', 'email', 'password')
    .first();
}

function findById(id) {
  return db('users')
    .where({ id })
    .select('id', 'family_name', 'first_name', 'last_name', 'email')
    .first();
}
