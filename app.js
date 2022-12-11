import express from 'express';
import ProductManager from "./src/ProductManager.js";

const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager();


app.get('/', (req, res) => {
  res.send('<p><a href="/api/products">Lista de Productos</a></p>');
});

app.get('/api/products', (req, res) => {
  const responseObject = {};

  const allProducts = productManager.getProducts();

  const { offset, limit } = req.query;

  const offsetNumber = Number(offset ?? 0);

 
  if (isNaN(offsetNumber)) {
    responseObject.status = 'error';
    responseObject.error = `Error: '${offset}' is not a valid offset value.`;

    res.status(400).json(responseObject).end();

    return;
  }


  if (offsetNumber < 0 || offsetNumber % 1 !== 0) {
    responseObject.status = 'error';
    responseObject.error = `Error: offset parameter must be a non-negative integer.`;

    res.status(400).json(responseObject).end();

    return;
  }

  const limitNumber = Number(limit ?? 0);

 
  if (isNaN(limitNumber)) {
    responseObject.status = 'error';
    responseObject.error = `Error: '${limit}' is not a valid limit value.`;

    res.status(400).json(responseObject).end();

    return;
  }

 
  if (limitNumber < 0 || limitNumber % 1 !== 0) {
    responseObject.status = 'error';
    responseObject.error = 'Error: limit parameter must be a non-negative integer.';

    res.status(400).json(responseObject).end();

    return;
  }

  
  if (offsetNumber < allProducts.length) {
    const lastIndex = limitNumber === 0 ? allProducts.length : Math.min(allProducts.length, (offsetNumber + limitNumber));

    const filteredProducts = allProducts.slice(offsetNumber, lastIndex);

    responseObject.status = 'success';
    responseObject.products = filteredProducts;
  } else {
    responseObject.status = 'error';
    responseObject.error = 'Error: offset value out of bounds.';
  }

  res.json(responseObject);
});


app.get('/api/products/:id', (req, res) => {
  const responseObject = {};

  const productId = Number(req.params.id);


  if (isNaN(productId)) {
    responseObject.status = 'error';
    responseObject.error = `Error: '${req.params.id}' is not a valid product id.`;

    res.status(400).json(responseObject).end();

    return;
  }

  try {
    const product = productManager.getProductById(productId);

    responseObject.status = 'success';
    responseObject.product = product;
  } catch (err) {
    responseObject.status = 'error';
    responseObject.error = `${err}`;
  }

  res.json(responseObject).end();
});


app.put('/api/products', (req, res) => {
  console.log('req.body', req.body);

  res.status(201).end();
});

app.listen(PORT, () => console.log(`[ listening on port ${PORT}: http://localhost:${PORT}/ ]> 🤖`));