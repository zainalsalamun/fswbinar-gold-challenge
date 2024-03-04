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


app.post('/save', (req, res) => {
    const { id, nama, jabatan } = req.body;

    res.redirect('/');
});


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

app.get('/api/users', async (req, res) => {
    const users = await db('users').select('*');

    return res.json({
        data:users
    });

})


app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username dan password harus diisi' });
    }

    await db('users').insert({
      username,
      password,
    }).returning(['id']).then((result) => {
      const userId = result[0].id;

      return res.status(201).json({
        message: 'Registrasi berhasil',
        userId,
      });
    });



  });
  
  // Endpoint untuk login
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await db('users').where({ username }).first();
  
      if (user) {
        const passwordMatch = user.password === password;
  
        if (passwordMatch) {
          res.status(200).json({ message: 'Login berhasil', userId: user.id });
        } else {
          res.status(401).json({ error: 'Login gagal. Periksa kembali username dan password Anda.' });
        }
      } else {
        res.status(401).json({ error: 'Login gagal. Periksa kembali username dan password Anda.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Gagal melakukan login. Silakan coba lagi.' });
    }

  });

app.listen(3000, () => {
    console.log('listening on port 3000');
});