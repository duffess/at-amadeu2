const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 5000;

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados SQLite.');

    // Criação da tabela de resenhas (corrigida)
    db.run(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        coverUrl TEXT,
        bookName TEXT,
        review TEXT,
        userName TEXT,
        userEmail TEXT
      )
    `);

    console.log('Tabela de resenhas criada no banco de dados.');
  }
});

app.use(express.json());

// Rota para adicionar uma resenha
app.post('/api/review', (req, res) => {
  const { coverUrl, bookName, review, userName, userEmail } = req.body;

  if (!bookName || !review || !userName) {
    return res.status(400).json({ error: 'Os campos bookName, review e userName são obrigatórios.' });
  }

  // Verificar se já existe uma resenha para o mesmo livro
  const checkSql = 'SELECT COUNT(*) AS count FROM reviews WHERE bookName = ?';
  db.get(checkSql, [bookName], (err, row) => {
    if (err) {
      console.error('Erro ao verificar resenha existente:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    if (row.count > 0) {
      // Já existe uma resenha para este livro
      return res.status(400).json({ error: 'Você já fez uma resenha para este livro.' });
    } else {
      // Não existe resenha, prosseguir com a inserção
      const insertSql = 'INSERT INTO reviews (coverUrl, bookName, review, userName, userEmail) VALUES (?, ?, ?, ?, ?)';
      db.run(insertSql, [coverUrl, bookName, review, userName, userEmail], function(err) {
        if (err) {
          console.error('Erro ao inserir resenha:', err);
          return res.status(500).json({ error: 'Erro ao adicionar a resenha.' });
        }
        res.json({ message: 'Resenha adicionada com sucesso!', reviewId: this.lastID });
      });
    }
  });
});


// Rota para buscar resenhas por nome do livro
app.get('/api/reviews/:bookName', (req, res) => {
  const { bookName } = req.params;
  const sql = 'SELECT * FROM reviews WHERE bookName = ?';

  db.all(sql, [bookName], (err, rows) => { // Usamos db.all para obter todas as resenhas
    if (err) {
      console.error('Erro ao buscar resenhas:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    res.json(rows); // Retorna um array de resenhas
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
