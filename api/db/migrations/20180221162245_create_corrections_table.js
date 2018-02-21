const TABLE_NAME = 'corrections';

exports.up = (knex) => {
  return knex.schema
    .createTable(TABLE_NAME, (t) => {
      t.increments().primary();
      t.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
      t.integer('level').unsigned();
      t.integer('pixScore').unsigned();
      t.text('emitter').notNull();
      t.text('comment').notNull();
      t.integer('assessmentId').unsigned().references('assessments.id');
    })
    .then(() => {
      console.log(`${TABLE_NAME} table is created!`);
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTable(TABLE_NAME)
    .then(() => {
      console.log(`${TABLE_NAME} table was dropped!`);
    });
};
