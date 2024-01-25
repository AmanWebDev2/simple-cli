import http from 'node:http';

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain')
    res.end('hello there');
})

server.listen(4040,()=>{
    console.log('server is listening on 4040 http://localhost:4040')
})
