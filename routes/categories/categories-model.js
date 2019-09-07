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

function add(category) {
  return db("categories").insert(category);
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
