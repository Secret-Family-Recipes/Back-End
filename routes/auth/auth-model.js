const db = require('../../data/db-config');

module.exports = {
  add,
  findBy,
  findById
};

function add(user) {
  return db('users')
    .insert(user)
    .then(async ([id]) => {
      return await findById(id);
    });
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
