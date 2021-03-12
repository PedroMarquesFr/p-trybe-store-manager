require('dotenv').config();

const express = require('express');
const { add, getAll, getById, edit, del } = require('./controllers/productContro');

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use(function (req, res, next) {
  console.log(`- ${req.method} ${req.path}`);
  /* Termina a operação no middleware e chama o próximo middleware ou rota */
  next();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', add);
app.get('/products', getAll);
app.get('/products/:id', getById);
app.put('/products/:id', edit);
app.delete('/products/:id', del);

app.use((err, req, res, next) => {
  res.status(500).send({ error: `${err} ou algum erro interno` });
});

app.listen(PORT, () => console.log(`listen port: ${PORT}`));
