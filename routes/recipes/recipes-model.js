const db = require('../../data/db-config');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db('recipes');
}

function findById(id) {
  return db('recipes')
    .where({ id })
    .first();
}

async function add(recipe) {
  return db('recipes')
    .returning('id')
    .insert(recipe)
    .then(async ([id]) => {
      return await findById(id);
    });
}

async function update(changes, id) {
  return db('recipes')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('recipes')
    .where({ id })
    .del();
}
