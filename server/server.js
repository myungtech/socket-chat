const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http'); // http 모듈

const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('새로운 연결 !!');

    socket.on('disconnect', () => {
        console.log('disconnect !!!')
    });
});

app.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`서버가 구동중입니다. PORT번호 >> ${PORT}`));