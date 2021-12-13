const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// app.use('/css', express.static(path.join(__dirname, '/css')));
// app.use('/js', express.static(path.join(__dirname, '/js')));
// app.use('/images', express.static(path.join(__dirname, '/images')));
// app.use('/videos', express.static(path.join(__dirname, '/videos')));
app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(request, response){
    let url = request.url;
    if(request.url == '/'){
        url = '/main.html';
    }
    if(request.url == '/favicon.ico'){
        return response.writeHead(404);
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
});

app.listen(3000);