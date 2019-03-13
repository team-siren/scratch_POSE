const http = require('http');
const path = require('path');
const fs = require('fs');

function handleRequest(req, res, next) {
  let pathname = req.url; // what was the request?

  if (pathname === '/') {
    // send the basic html by default
    pathname = '/camera.html';
  }

  let ext = path.extname(pathname); // what's the file extension?
  
  const extTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css'
  }
  
  let contentType = extTypes[ext] || 'text/plain'
  
  //read/write back the file w/ appropriate content type
  fs.readFile(__dirname + pathname,
    (err,data)=>{
      if (err){
        res.writeHead(500)
        return res.end('Error loading '+pathname)
      }
      res.writeHead(200, {'Content-Type': contentType})
      res.end(data)
    })
}

const server = http.createServer(handleRequest)
server.listen(8080)

// ////EXPRESS ATTEMPT///////
// const path = require('path');
// const morgan = require('morgan');
// const express = require('express');
// const app = express();
// const homePage = require('./public/view.js');

// app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res, next) => {
//   try {
//     res.send(homePage());
//   } catch (error) {
//     next(err);
//   }
// });


// app.listen(8080, () => {
//   console.log(`I'm listening on port 8080!`);
// });
