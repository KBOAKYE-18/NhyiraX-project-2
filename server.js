const http = require('http');
const fs = require('fs');
const path = require ('path');

const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/html');

    let filepath = ' ';

    if(req.url == '/'){
      filepath = path.resolve(__dirname,'views','index.html');
      res.statusCode = 200;
    }else{
      filepath = path.resolve(__dirname,'views','error.html');
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
