const http = require('http');
const app = require('./app')

const port = process.env.port || 3000;
const server = http.createServer(app);

server.listen(port,function() {
    console.log('RWS restful api successfully started on port ' + port);
});