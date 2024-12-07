const express = require('express'); // Import Express
const mongoose = require('mongoose'); // Import Mongoose for database
const http = require('http'); // HTTP module for server
const { Server } = require('socket.io'); // Import Socket.IO

const app = express(); // Initialize Express app
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server); // Initialize Socket.IO with the server

// Middleware
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Basic Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Healthcare App Server!');
});

app.post('/symptoms', (req, res) => {
    const { symptoms } = req.body;
    res.json({ message: `You submitted symptoms: ${symptoms}` });
});

// WebSocket (Socket.IO) for real-time communication
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle message sending for chat
    socket.on('chatMessage', (message) => {
        console.log('Chat Message:', message);
        io.emit('chatMessage', message); // Broadcast message to all connected clients
    });

    // Handle video call setup
    socket.on('videoCall', (data) => {
        console.log('Video Call Data:', data);
        io.emit('videoCall', data); // Broadcast video call initiation
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// MongoDB Connection (replace YOUR_MONGO_URI with your actual URI)
mongoose.connect('mongodb://localhost:27017/healthcare', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

