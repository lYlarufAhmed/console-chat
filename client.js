const io = require("socket.io-client");
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let nickname = ''
let unsent_messages = []
rl.question('What is your name? ', (username) => {
    const socket = io('http://localhost:3000/');
    nickname = username
    socket.on('connect', () =>{
        socket.emit('send-nickname', nickname)
        // while (unsent_messages.length) socket.emit('chat', unsent_messages.shift())

        // console.log()
        console.log('successfully connected to server')
        rl.setPrompt('>')
        rl.prompt()
        socket.on('new message', (msg)=> {
            console.log('going to pring message. got new message')
            console.log(msg)
            // rl.emit('line')
            rl.setPrompt('>')
            rl.prompt()
        })
        socket.on('disconnect', ()=>{
            console.log('connection lost')
            rl.setPrompt('>')
            rl.prompt()
        })
        rl.on('line', (msg)=>{
            if (msg.toLowerCase() === 'bye') {
                rl.close()
                socket.disconnect()
            }
            else{
                console.log(`sending message: "${msg}"`)
                if (socket.connected) socket.emit('chat', msg)
                else unsent_messages.push(msg)
                rl.setPrompt('>')
                rl.prompt()
            }
        })
    })``

});
