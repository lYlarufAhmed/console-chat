const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('send-nickname', (name) => {
        // console.log('nickname found', name)
        socket.nickname = name
        // socket.broadcast.emit('user join', `${name} connected`)
    })
    socket.on('chat', (msg)=>{
        console.log(`message: ${socket.nickname} says "${msg}"`)
        setTimeout(() => socket.broadcast.emit('new message',`${socket.nickname} says "${msg}"`),
                    1500)
    })
    socket.on('disconnect', () => {
        console.log(socket.nickname,' disconnected');
    });
    // let eventName = 'simple chat message';
    // let broadcast = (msg) => socket.broadcast.emit(eventName, msg);
    // socket.on(eventName, (msg, ackFn) => {
    //     console.log('message: ' + msg);
    //     // broadcast to other clients after 1.5 seconds
    //     setTimeout(broadcast, 1500, msg);
    // });
});


http.listen(3000, () => {
    console.log('listening on *:3000');
});