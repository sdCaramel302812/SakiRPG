const express = require('express');
const http = require('http');
const app = express();

var port = 80;

app.get('/', (request, response) => {
    response.sendFile('/d/saki-RPG/client/index.html');
});
app.get('/123', (request, response) => {
	response.send('hello world 123');
});
app.get('/456', (request, response) => {
	response.send('hello world 456');
});
app.use(express.static('../client'));
//	res.json()		send json response
//	res.sendFile()	send file



http.createServer(app).listen(port, () => {
	console.log(`listening on port ${port}`);
});