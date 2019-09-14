const db = require('../../data/db-config');

module.exports = {
  find,
  findById,
  addSteps,
  getSteps,
  update,
  remove
};

function find() {
  return db('ingredients');
}

function findById(id) {
  return db('steps')
    .where({ id })
    .first();
}

function getSteps(recipe_id) {
  return db
    .select('steps.recipe_id', 'steps.description')
    .from('steps')
    .join('recipes', 'recipes.id', 'steps.recipe_id')
    .where('steps.recipe_id', recipe_id);
}

function addSteps(stepsData) {
  return (
    db('steps')
      .insert(stepsData)
      .then(async _ => {
        return await findById(stepsData.id);
      })
      // TODO remove if everything is working
      // TODO "insert into `steps` (`description`, `recipe_id`) values ('get sauce', '2') - SQLITE_CONSTRAINT: UNIQUE constraint failed: steps.recipe_id"
      .catch(error => {
        return error.message;
      })
  );
}

async function update(changes, id) {
  return db('steps')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('steps')
    .where({ id })
    .del();
}
