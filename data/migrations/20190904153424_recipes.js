exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
