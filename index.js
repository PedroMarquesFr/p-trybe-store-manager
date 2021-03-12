require('dotenv').config();

const express = require('express');
const productContro = require('./controllers/productContro');
const saleContro = require('./controllers/saleContro');

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

app.post('/products', productContro.add);
app.get('/products', productContro.getAll);
app.get('/products/:id', productContro.getById);
app.put('/products/:id', productContro.edit);
app.delete('/products/:id', productContro.del);

app.post('/sales', saleContro.add);
// app.get('/sales', getAll);
// app.get('/sales/:id', getById);
// app.put('/sales/:id', edit);
// app.delete('/sales/:id', del);

app.use((err, req, res, next) => {
  res.status(500).send({ error: `${err} ou algum erro interno` });
});

app.listen(PORT, () => console.log(`listen port: ${PORT}`));
