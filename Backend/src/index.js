const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application\json' });
    res.write(JSON.stringify({ Name: 'Sandesh Khadka', email: 'khadkasandesh696@gmail.com' }));

}).listen(5000);