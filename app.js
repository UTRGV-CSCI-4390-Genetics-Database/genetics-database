const bodyParser = require('body-parser');
const express = require('express');
const fsPromises = require('fs').promises;
const path = require('path');
const { Client } = require('pg');
const util = require('util');

const PORT = process.env.PORT || 5000;

async function saveSchema(schema) {
  try {
    await fsPromises.writeFile(`${__dirname}/public/data.js`, `const data = ${util.inspect(schema, { maxArrayLength: null })};`);
    console.log('Schema saved');
  } catch (e) {
    console.error(`Failed to save the schema: ${e}`);
    throw e;
  }
}

async function connectToDatabase() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
  } catch (e) {
    console.error(`Failed to connect to database: ${e}`);
    throw e;
  }

  console.log('Connected to database');
  return client;
}

async function executeQuery(client, query) {
  const results = await client.query(query);
  return results.rows;
}

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let client;

app.get('/home', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/about', (req, res) => {
  res.sendFile(`${__dirname}/public/about.html`);
});

app.get('/search', (req, res) => {
  res.sendFile(`${__dirname}/public/search.html`);
});

app.get('/post', (req, res) => {
  res.sendFile(`${__dirname}/public/post.html`);
});

app.get('/update', (req, res) => {
  res.sendFile(`${__dirname}/public/update.html`);
});

app.get('/delete', (req, res) => {
  res.sendFile(`${__dirname}/public/delete.html`);
});

app.post('/results', async (req, res) => {
  console.log(req.body.obj.request);
  const rows = await executeQuery(client, req.body.obj.request);
  console.log(rows);
  res.send(rows);
});

app.post('/schema', async (req, res) => {
  const { obj } = req.body;
  const newSchema = {};
  for (const [key, value] of Object.entries(obj)) {
    const newArr = [];
    for (let i = 0; i < value.length; i += 1) {
      if (key === 'individuals' || key === 'blood_samples' || key === 'category_individuals' || value[i].column_name !== 'subject_id') {
        const minObj = {
          [value[i].column_name]: value[i].data_type,
        };
        newArr.push(minObj);
      }
    }
    newSchema[key] = newArr;
  }
  await saveSchema(newSchema);
  res.send('Schema successfully updated');
});

(async () => {
  client = await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})();
