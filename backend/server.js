const express = require('express');
const cors = require('cors');
const path = require('path');
const { db, initDb } = require('./db');

initDb();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/api/products', (req, res) => {
  const products = db.prepare('SELECT id, name, price, image_url, category FROM products ORDER BY id').all();
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = db.prepare('SELECT id, name, price, image_url, category FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.listen(PORT, () => {
  console.log(`4PF Shop running at http://localhost:${PORT}`);
});
