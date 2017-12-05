exports.up = knex => {
  return knex.schema.createTable('favorites', (table) => {
    table.increments()
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.timestamp('created_at').notNullable().defaultsTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultsTo(knex.raw('now()'));
    table.integer('book_id')
      .notNullable()
      .references('id')
      .inTable('books')
      .onDelete('CASCADE')
  })
}

exports.down = knex => {
  return knex.schema.dropTable('favorites')
}
