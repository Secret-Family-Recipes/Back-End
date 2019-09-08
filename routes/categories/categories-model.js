const db = require("../../data/db-config");

module.exports = {
  find,
  add,
  findById,
  update,
  remove
};

function find() {
  return db("categories");
}

async function add(category) {
  return db("categories")
    .insert(category)
    .then(async ([id]) => {
      return await findById(id);
    });
}

function findById(id) {
  return db("categories")
    .where({ id })
    .first();
}

function update(name, id) {
  return db("categories")
    .where({ id })
    .update(name);
}

function remove(id) {
  return db("categories")
    .where({ id })
    .del();
}
