const express = require('express');
const cors = require('cors');

const router = require('./router');
const app = express();



// const socketIO = require('socket.io');
const http = require('http'); // http 모듈
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const {
    addUser,
    getUser,
    getUsersInRoom,
    removeUser
} = require('./users');

/*  socket.emit 데이터 줄때
    socket.on 데이터 받을때
    socket.join 룸을 만든다 */

// 소켓 연결 되었을때 실행되는 로직
io.on('connection', (socket) => {

    console.log('*************** connection 되었습니다. ***************');

    socket.on('join', ({ name, room }, callback) => {

        console.log({ name, room });

        const { error, user } = addUser({ id: socket.id, name, room });
        console.log({ error, user });

        if (error) {
            return callback(error);
        }

        socket.join(user.room);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log(`sendMessage user >> ${user}`);
        // console.log(`sendMessage user >> ${socket.id}`);
        // io.to(user.room).emit('message', { user: user.name, text: message });
        // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    });
});

app.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`서버가 구동중입니다. PORT번호 >> ${PORT}`));