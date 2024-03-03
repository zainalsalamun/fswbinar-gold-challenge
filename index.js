const express = require('express');
const app = express();

const db = require('./db');

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/karyawan', async (req, res) => {
    const karyawan = await db('karyawan').select('*');
    return res.json({
        data:karyawan
    });
});

app.get('/', async (req, res) => {
    const karyawan = await db('karyawan').select('*');
    res.render('index', { data: karyawan });
});

// Add or Update Data
app.post('/save', (req, res) => {
    const { id, nama, jabatan } = req.body;

    res.redirect('/');
});

// Delete Data
app.post('/delete', (req, res) => {
    const { id } = req.body;
    res.redirect('/');
});

app.get('/karyawan/:id', async (req, res) => {
    const {id} = req.params;
    const karyawan = await db('karyawan').select('*').where({
        id: id
    }).first();
    return res.json({
        data:karyawan
    });
});

app.post('/karyawan', async (req, res) => {
    const {nama, jabatan} = req.body;
    const karyawan = await db('karyawan').insert({
        nama: nama,
        jabatan: jabatan
    }).returning(['id']);
    return res.json({
      message :'Data berhasil ditambahkan',
      data: {
        id : karyawan[0].id, nama, jabatan:jabatan
      },
    });
});

app.put('/karyawan/:id', async (req, res) => {
    const {id} = req.params;
    const {nama, jabatan} = req.body;
     await db('karyawan').where({
       id:id,
    }).update({
        nama: nama,
        jabatan: jabatan
    });
    return res.json({
      message :'Data berhasil diubah',
      data: {
        id : id, nama :nama, jabatan:jabatan
      },
    });


});

app.delete('/karyawan/:id', async (req, res) => {
    const {id} = req.params;
    await db('karyawan').where({
       id:id,
    }).del();
    return res.json({
      message :'Data berhasil di hapus',
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});