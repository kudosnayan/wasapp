const express = require('express')
const app = express()
app.use(express.static(__dirname + '/public'))
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`listing on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// socket
const io = require('socket.io')(http)
io.on('connection', (socket) => {
    console.log('Conneced...');
    
    socket.on('message',(msg)=>{
        // console.log(msg);
        // send to the client
        socket.broadcast.emit('message',msg);
    })
})