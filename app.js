const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(`${__dirname }/public/index.html`);
})
app.listen(PORT, function(){
    console.log(`severe started on port ${PORT}`)
})