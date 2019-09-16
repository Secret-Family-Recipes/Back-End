const db = require('../../data/db-config');

module.exports = {
  find,
  findById,
  addIngredients,
  getIngredients,
  update,
  remove
};

function find() {
  return db('ingredients');
}

function findById(id) {
  return db('ingredients')
    .where({ id })
    .first();
}

function getIngredients(recipe_id) {
  return db
    .select(
      'ingredients.recipe_id',
      'ingredients.name',
      'ingredients.quantity',
      'ingredients.measurements_id',
      'ingredients.preparation'
    )
    .from('ingredients')
    .join('recipes', 'recipes.id', 'ingredients.recipe_id')
    .where('ingredients.recipe_id', recipe_id);
}

function addIngredients(ingredientData) {
  return (
    db('ingredients')
      .returning('id')
      .insert(ingredientData)
      .then(async ([id]) => {
        return findById(id);
      })
      // TODO remove if everything is working
      .catch(error => {
        return error.message;
      })
  );
}

async function update(changes, id) {
  return db('ingredients')
    .where({ id })
    .update(changes)
    .then(async _ => {
      return await findById(id);
    });
}

function remove(id) {
  return db('ingredients')
    .where({ id })
    .del();
}
