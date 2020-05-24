const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log(req.url);
    // if (req.url === '/'){
    //     fs.readFile(path.join(__dirname, 'public','index.html'),(err,content)=>{
    //         res.writeHead(200,{'content-type':'text/html'});
    //         // res.end('<div><h1 style="margin:auto;text-align:center">HomePage</h1><p>Hi there its my first node applicatioin</p></div>');
    //        res.end(content);
    //     })

    // }

    // if(req.url=='/about'){
    //     fs.readFile(path.join(__dirname,'public','about.html'),(err,content)=>{
    //         res.writeHead(200,{'content-type':'text.html'});
    //         res.end(content);
    //     })
    // }
    // if(req.url="api/user"){
    //      const users=[
    //          {name:'bob',age:22},
    //          {name:'john',age:20}
    //      ];
    //      res.writeHead(200,{'content-type':'application/json'});
    //      res.end(JSON.stringify(users));    
    // }

    let filePath = path.join(__dirname, 'public', req.url == '/' ? 'index.html' : req.url);
    console.log(filePath);


    //extension of File
    let extname = path.extname(filePath);

    //Initial content type
    let contentType = 'text/html';

    //check ext and set content type
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case 'png':
            contentType = 'image/png';
            break;
        case 'jpg':
            contentType = 'image/jpg';
            break;
    }
    //Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                //page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {
                        'content-Type': 'text/html'
                    });
                    res.end(content, 'utf-8');

                })
            } else {
                //some Server Error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }

        } else {
            //succesFull response
            res.writeHead(200, {
                'contentType': contentType
            });
            res.end(content, 'utf-8');
        }
    });
});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server Runnig on Port ${PORT}`));