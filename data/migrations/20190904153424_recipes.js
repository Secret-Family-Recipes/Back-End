// TODO onDelete(), onUpdate()
exports.up = function(knex) {
  return (
    knex.schema
      /********************************************************
       *                       RECIPES                        *
       ********************************************************/
      .createTable('recipes', recipes => {
        recipes.increments();
        recipes.string('title', 255).notNullable();
        recipes
          .integer('created_by')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users');
        recipes
          .integer('category_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('categories');
        recipes.string('author', 255).notNullable();
      })
      /********************************************************
       *                        USERS                         *
       ********************************************************/
      .createTable('users', users => {
        users.increments();
        users.string('first_name', 255).notNullable();
        users.string('last_name', 255).notNullable();
        users.string('family_name', 255).notNullable();
        users
          .string('email', 255)
          .notNullable()
          .unique();
        users.string('password', 255).notNullable();
      })
      /********************************************************
       *                      CATEGORIES                      *
       ********************************************************/
      .createTable('categories', categories => {
        categories.increments();
        categories
          .string('name', 255)
          .notNullable()
          .unique();
      })
      /********************************************************
       *                   RECIPES_CATEGORIES                 *
       ********************************************************/
      .createTable('recipes_categories', rec_cat => {
        rec_cat.increments();
        rec_cat
          .integer('recipe_id')
          .unsigned()
          .unique()
          .notNullable()
          .references('id')
          .inTable('recipes');
        rec_cat
          .integer('category_id')
          .unsigned()
          .unique()
          .notNullable()
          .references('id')
          .inTable('categories');
      })
      /********************************************************
       *                          STEPS                       *
       ********************************************************/
      .createTable('steps', steps => {
        steps.increments();
        steps
          .integer('recipe_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('recipes')
          .unique();
        steps.string('description', 255).notNullable();
      })
      /********************************************************
       *                       INGREDIENTS                    *
       ********************************************************/
      .createTable('ingredients', ingredients => {
        ingredients.increments();
        ingredients
          .integer('recipe_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('recipes')
          .unique();
        ingredients
          .string('name', 255)
          .notNullable()
          .unique();
        ingredients.decimal('quantity').notNullable();
        ingredients
          .integer('measurements_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('measurements');
        ingredients.string('preparation').nullable();
      })
      /********************************************************
       *                     MEASUREMENTS                     *
       ********************************************************/
      .createTable('measurements', measurements => {
        measurements.increments();
        measurements.string('name', 255).notNullable();
      })
  );
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('measurements')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('users')
    .dropTableIfExists('categories')
    .dropTableIfExists('recipes_categories')
    .dropTableIfExists('recipes');
};
