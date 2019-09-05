// TODO onDelete(), onUpdate()
exports.up = function(knex) {
  return (
    knex.schema
      /********************************************************
       *                       RECIPES                        *
       ********************************************************/
      .createTable('recipes', r => {
        r.increments();
        r.string('title', 255).notNullable();
        r.integer('created_by')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users');
        r.integer('category_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('categories');
        r.string('source', 255).notNullable();
      })
      /********************************************************
       *                        USERS                         *
       ********************************************************/
      .createTable('users', u => {
        u.increments();
        u.string('family_name', 255).notNullable();
        u.string('first_name', 255).notNullable();
        u.string('last_name', 255).notNullable();
        u.string('email', 255)
          .unique()
          .notNullable();

        u.string('password', 255).notNullable();
      })
      /********************************************************
       *                      CATEGORIES                      *
       ********************************************************/
      .createTable('categories', c => {
        c.increments();
        c.string('name', 255)
          .notNullable()
          .unique();
      })
      /********************************************************
       *                        STEPS                         *
       ********************************************************/
      .createTable('steps', s => {
        s.increments();
        s.string('description', 255).notNullable();
        s.integer('recipe_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('recipes');
      })
      /********************************************************
       *                     INGREDIENTS                      *
       ********************************************************/
      .createTable('ingredients', i => {
        i.increments();
        i.integer('recipe_id')
          .unsigned()
          .notNullable()
          .unique()
          .references('id')
          .inTable('recipes');
        i.string('name', 255)
          .notNullable()
          .unique();
        i.decimal('quantity').notNullable();
        i.integer('measurements_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('measurements');
        i.string('preparation').nullable();
      })
      /********************************************************
       *                     MEASUREMENTS                     *
       ********************************************************/
      .createTable('measurements', m => {
        m.increments();
        m.string('name', 255).notNullable();
      })
  );
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('measurements')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('categories')
    .dropTableIfExists('users')
    .dropTableIfExists('recipes');
};
