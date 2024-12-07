// app.js
const socket = io();

// Chat system
document.getElementById('sendMessage').addEventListener('click', () => {
  const message = document.getElementById('chatMessage').value;
  socket.emit('chatMessage', message);  // Send message to the server
});

socket.on('chatMessage', (message) => {
  const li = document.createElement('li');
  li.textContent = message;
  document.getElementById('messages').appendChild(li);
});

// Video Call System (WebRTC)
document.getElementById('startCall').addEventListener('click', () => {
  socket.emit('videoCall', { from: 'patient', to: 'doctor' });  // Start video call
});

socket.on('videoCall', (data) => {
  console.log('Video call from', data.from);
  // Implement WebRTC logic here for peer-to-peer connection
});
