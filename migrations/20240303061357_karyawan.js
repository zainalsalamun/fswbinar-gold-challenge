exports.up = function(knex) {
    return knex.schema.createTable('karyawan', table => {
      table.increments();
      table.string('nama');
      table.string('jabatan');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('karyawan');
  };