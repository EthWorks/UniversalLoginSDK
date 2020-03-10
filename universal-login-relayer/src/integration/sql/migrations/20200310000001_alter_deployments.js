/*
  THIS IS A MIGRATION
  This file SHOULD NOT be RENAMED or CHANGED in ANY WAY!
  If you need to change the database schema create a new migration.
*/

exports.up = async(knex) => {
  await knex.schema.table('deployments', (table) => {
    table.string('contractAddress', 42).notNullable().defaultTo('0x000000000000000000000000000000');
  });
}


exports.down = async(knex) => {
  await knex.schema.table('deployments', (table) => {
    table.dropColumn('contractAddress');
  });
}