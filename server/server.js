const express = require('express');
const SocketServer = require('ws').Server;

const port = 2188;

const server = express().listen(
    port, () => {
        console.log(`listening on ${port}`);
    }
);

const wss = new SocketServer({server});

wss.on('connection', ws => {
    console.log('client connected');
    console.log(ws);

    ws.on('message', data => {
        ws.send(data);
    });

    ws.on('close', () => {
        console.log('close connected');
    });
});