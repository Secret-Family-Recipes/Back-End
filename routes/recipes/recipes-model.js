const db = require("../../data/db-config");

module.exports = {
  find,
  findById
  // findByCategory,
  // add
};

function find() {
  return db("recipes");
}

function findById(id) {
  return db("recipes")
    .where({ id })
    .first();
}

// TODO add
// async function add(recipe) {
//   const name = recipe.name;
//   console.log(name);
//   try {
//     const category = await findByCategory(name);
//     if (Object.keys(category).length === 0) {
//       await db("categories").insert(category);
//       return db("recipes").insert(recipe);
//     } else {
//       return db("recipes").insert(recipe);
//     }
//   } catch (error) {
//     return error;
//   }
// }

// TODO findByCategory
// function findByCategory(name) {
//   return db("categories")
//     .where({ name })
//     .first();
// }

// async function findByCategory(name) {
//   const category = await
// }
