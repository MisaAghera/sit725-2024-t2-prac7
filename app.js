const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const appRoutes = require('./routes/carRoutes');

const app = express();
// Create HTTP server
const server = http.createServer(app);
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', appRoutes);

// Initialize Socket.IO
const io = socketIo(server);

// Socket.IO integration
io.on('connection', (socket) => {
    socket.emit('time', new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString('en-AU'));

    setInterval(() => {
        const pass = generateRandomString(5);
        socket.emit('password', pass);
        console.log(pass);
    }, 1000);

    setInterval(() => {
        socket.emit('status', 'Server is running smoothly');
        console.log("Server is running smoothly");
    }, 5000);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}




// Start Server and Connect to MongoDB
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});