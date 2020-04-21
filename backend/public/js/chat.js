$(document).ready(() => {
    const socket = io.connect(window.location.origin);

    const chatForm = document.getElementById('chat-form');
    const chatMessages = document.querySelector('.chat-list-container');

    const username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const room = document.cookie.replace(/(?:(?:^|.*;\s*)roomId\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    // Join chatroom
    socket.emit('joinRoom', { username, room });

    socket.on('disconnect', function () {
        console.log('server disconnected');
    });

    // Message from server
    socket.on('message', message => {
        outputMessage(message);

        // Scroll down
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    // Message from server - Join
    socket.on('messageJoinLeft', message => {
        outputMessageJoinLeft(message);

        // Scroll down
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    // Message submit
    chatForm.addEventListener('submit', e => {
        e.preventDefault();

        // Get message text
        const data = {
            user: username,
            room: room,
            message: e.target.elements.msg.value,
            date: new Date()
        }

        // Emit message to server
        socket.emit('chatMessage', data);

        // Clear input
        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();
    });

    // Output message to DOM
    function outputMessage(message) {
        const avatar = `https://avatars.dicebear.com/v2/gridy/${message.username}.svg?options[width][]=500&options[height][]=500`

        const div = document.createElement('div');
        div.classList.add('chat-msg');

        div.innerHTML = `
        <img src="${avatar}" alt="Avatar">
        <div class="username-msg-wrapper">
            <span class="username-msg">${message.username}</span>
            <span class="msg">${message.text}</span>
        </div>
        <div class="timestamp-msg">
            <span>${message.time1}</span>
            <span>${message.time2}</span>
        </div>`;

        document.querySelector('.chat-list-container').appendChild(div);
    }

    // Output message Join to DOM
    function outputMessageJoinLeft(message) {
        const span = document.createElement('span');
        span.classList.add('user-join-left');

        span.innerHTML = `${message.username} ${message.text}`;

        document.querySelector('.chat-list-container').appendChild(span);
    }
});