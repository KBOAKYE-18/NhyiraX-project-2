const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/html');

    let path = './views/';

    if(req.url == '/'){
      path += 'index.html';
      res.statusCode = 200;
    }else{
      path += 'error.html';
      res.statusCode = 404;
    }

    fs.readFile(path,(error,data)=>{
        
        if(error){
          console.log(error);
          res.statusCode = 500;
          res.end(`<h1>Server Error</h1>`);
        }else{
          res.write(data);
          res.end();
        }
    });
})

server.listen(3000,'localhost',()=>{
  console.log('Server is running on port 3000');
})