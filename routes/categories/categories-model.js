const db = require('../../data/db-config');

module.exports = {
  find,
  add,
  findById,
  update,
  remove
};

function find() {
  return db('categories');
}

async function add(category) {
  return db('categories')
    .returning('id')
    .insert(category)
    .then(async ([id]) => {
      return await findById(id);
    });
}

function findById(id) {
  return db('categories')
    .where({ id })
    .first();
}

function update(name, id) {
  return db('categories')
    .returning('id')
    .where({ id })
    .update(name)
    .then(async ([id]) => {
      return await findById(id);
    });
}

function remove(id) {
  return db('categories')
    .where({ id })
    .del();
}
