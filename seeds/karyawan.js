/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('karyawan').del()
  await knex('karyawan').insert([
    { nama: 'Sabrina', jabatan :'CFO'},
    { nama: 'Mas gun', jabatan :'CEO'},
    { nama: 'Zainal', jabatan :'CTO'}
  ]);
};
