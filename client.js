const socket = io('http://192.168.97.224:8000');

const form = document.getElementById('form-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.msgContainer');


function scrollToBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
const appendMessage = (message, position,name) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    
    if (position === 'float-none') {

        messageElement.classList.add('message', 'text-gray-800', 'rounded-xl', 'p-2', 'm-2','text-center', position, 'clear-both');
    }
    else {
        messageElement.classList.add('message', 'bg-gray-800','text-white', 'rounded-xl', 'p-2', 'm-2', position, 'clear-both');
    }
    
    messageContainer.append(messageElement);
    scrollToBottom();

};

const username = prompt("Enter your name");
if(username){
socket.emit('new-user-joined', username);

socket.on('user-joined', name => {
    if(name)
    appendMessage(`${name} joined the chat`, 'float-none',name);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`, 'float-right',name);
    socket.emit('send', message);
    messageInput.value = '';
});

socket.on('receive', data => {
    if(data.name)
    appendMessage(`${data.name}: ${data.message}`, 'float-left',name);

});

socket.on('user-left', name => {
    if(name)
    appendMessage(`${name} left the chat`, 'float-none',name);
});
}
else{
    alert('reload the page and enter your name first');
}
