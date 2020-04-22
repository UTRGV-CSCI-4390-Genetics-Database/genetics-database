const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const fsPromises = require('fs').promises;
const Client = require('pg').Client;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//app.use(express.json());
app.use(express.urlencoded({extended: true})) 
app.use(express.static(path.join(__dirname, 'public')));
var util = require('util');
async function saveFile(obj) {
    try {
        await fsPromises.writeFile(`${__dirname }/public/data.js`, 'var data = ' + util.inspect(obj, {maxArrayLength: null}));
        console.log('File saved');
    }
    catch(e) {
        console.error(`Failed to save a file ${e}`);
    }
}
const client = new Client({
    user: 'genetics_user',
    password: '***REMOVED***',
    host: '***REMOVED***',
    database: 'genetics'
});
async function connect() {
    try {
        await client.connect();
        console.log('Connected to Data Base');
    }
    catch(e) {
        console.error(`Failed to connect ${e}`);
    }
}
async function read(text){
    try {
    const results = await client.query(text);
    return results.rows;
    }
    catch(e){
        console.error(`Problem - ${e}`);
    }
}
app.get('/home', function(req, res){
    res.sendFile(`${__dirname }/public/index.html`);})
app.get('/about', function(req, res){
    res.sendFile(`${__dirname }/public/about.html`);})
app.get('/search', function(req, res){
    res.sendFile(`${__dirname }/public/search.html`);})
app.get('/post', function(req, res){
    res.sendFile(`${__dirname }/public/post.html`);})
app.get('/update', function(req, res){
    res.sendFile(`${__dirname }/public/update.html`);})
app.get('/delete', function(req, res){
    res.sendFile(`${__dirname }/public/delete.html`);})
app.post('/results', async function(req, res){
    console.log(req.body.obj.request);
    var table = await read(req.body.obj.request);
    console.log(table);
    res.send(table);});
app.post('/schema', async function(req, res){
    var obj = req.body.obj;
    newObj = {};
    for (let [key, value] of Object.entries(obj)){
       newArr = [];
       for(i=0; i <obj[key].length; i++ ){
            if(!(key == "individuals") && obj[key][i]['column_name'] == "subject_id"){}
            else{
                minObj = {}
                minObj[obj[key][i]['column_name']] = obj[key][i]['data_type'];
                newArr.push(minObj);
            }
       }
       newObj[key]=newArr;
    }
    await saveFile(newObj);
    res.send("Schema sucesfully updated");
});
connect();
app.listen(PORT, function(){
console.log(`server started on port ${PORT}`);
})