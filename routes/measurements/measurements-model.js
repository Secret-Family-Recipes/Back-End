const db = require('../../data/db-config');

module.exports = {
  find,
  add,
  findById,
  update,
  remove
};

function find() {
  return db('measurements');
}

function add(category) {
  return db('measurements')
    .returning('id')
    .insert(category)
    .then(async ([id]) => {
      return await findById(id);
    });
}

function findById(id) {
  return db('measurements')
    .where({ id })
    .first();
}

function update(name, id) {
  return db('measurements')
    .returning('id')
    .where({ id })
    .update(name)
    .then(async ([id]) => {
      return await findById(id);
    });
}

function remove(id) {
  return db('measurements')
    .where({ id })
    .del();
}
