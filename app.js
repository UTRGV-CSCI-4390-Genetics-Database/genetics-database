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

async function getTableSchema(client, table) {
  const arr = [];
  for (let i = 0; i < table.length; i += 1) {
    const columnInfo = await executeQuery(client, `SELECT column_name, data_type FROM information_schema.columns WHERE TABLE_NAME = '${table[i].tablename}';`);
    arr.push(columnInfo);
  }
  return arr;
}

async function arrSchema(tableN, tableC) {
  const newObj = {};
  for (let i = 0; i < tableN.length; i += 1) {
    const arr = [];
    for (let j = 0; j < tableC[i].length; j += 1) {
      const obj = {};
      obj[tableC[i][j].column_name] = tableC[i][j].data_type;
      arr.push(obj);
    }
    newObj[tableN[i].tablename] = arr;
  }
  return newObj;
}

async function refreshSchema(client) {
  const table = await executeQuery(client, "SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';");
  const sch = await getTableSchema(client, table);
  const arr = await arrSchema(table, sch);
  await saveSchema(arr);
  return arr;
}

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let client;

app.get('/home', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
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
  const arr = await refreshSchema(client);
  res.send(arr);
});


(async () => {
  client = await connectToDatabase();
  await refreshSchema(client);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})();
