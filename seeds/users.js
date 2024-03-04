/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, username: 'zainal', password : 'root'},
    {id: 2, username: 'qomar', password : 'root'},
    {id: 3, username: 'budi', password : 'root'},
  ]);
};
