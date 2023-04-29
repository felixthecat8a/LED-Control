const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const PORT = process.env.PORT || '3000';
const { Board, Led } = require('johnny-five');

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

const board = new Board({
    port: 'COM3',
    repl: false,
    debug: false,
    timeout: 1e5,
    useFirmata: true,
});

board.on('ready', function() {
    console.log('Board is ready!');

    const led = new Led(5);

    io.on('connection', (socket) => {
        console.log('connected');
        socket.on('switchOnOff', function(data) {
            console.log(data);
            const { isOn } = data;
            if (isOn) {
                led.on();
            } else {
                led.off();
            }
        })
        socket.on('disconnect', () => {
            console.log('disconnected');
        });
    });
});

server.listen(PORT, () => {
    console.log('Server started at http://localhost:' + PORT)
});
