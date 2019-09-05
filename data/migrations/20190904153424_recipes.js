// TODO onDelete(), onUpdate()
exports.up = function(knex) {
  return knex.schema
    .createTable("users", u => {
      u.increments();
      u.string("family_name", 255).notNullable();
      u.string("first_name", 255).notNullable();
      u.string("last_name", 255).notNullable();
      u.string("email", 255)
        .notNullable()
        .unique();
      u.string("password", 255).notNullable();
    })
    .createTable("measurement", m => {
      m.increments();
      m.string("name", 255).notNullable();
    })
    .createTable("categories", c => {
      c.increments();
      c.string("name", 255)
        .notNullable()
        .unique();
    })
    .createTable("recipes", r => {
      r.increments();
      r.string("title", 255).notNullable();
      r.integer("created_by")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      r.integer("category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("categories");
      r.string("source", 255).notNullable();
    })
    .createTable("steps", s => {
      s.increments();
      s.string("description", 255).notNullable();
      s.integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipes");
    })
    .createTable("ingredients", i => {
      i.increments();
      i.integer("recipe_id")
        .notNullable()
        .unique()
        .references("id")
        .inTable("recipes");
      i.string("name", 255)
        .notNullable()
        .unique();
      i.decimal("quantity").notNullable();
      i.integer("measurement_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("measurement");
      i.string("preparation").nullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("ingredients")
    .dropTableIfExists("steps")
    .dropTableIfExists("recipes")
    .dropTableIfExists("categories")
    .dropTableIfExists("measurement")
    .dropTableIfExists("users");
};
