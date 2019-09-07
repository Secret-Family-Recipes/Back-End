const db = require("../../data/db-config");

module.exports = {
  find,
  add,
  findById,
  update,
  remove
};

function find() {
  return db("measurements");
}

function add(category) {
  return db("measurements").insert(category);
}

function findById(id) {
  return db("measurements")
    .where({ id })
    .first();
}

function update(name, id) {
  return db("measurements")
    .where({ id })
    .update(name);
}

function remove(id) {
  return db("measurements")
    .where({ id })
    .del();
}
