$(document).ready(() => {
    const socket = io.connect(window.location.origin);

    const username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    $('#change-username').on('click', () => {
        socket.emit('disconnected', { username });
    });

    // TODO Delete token when change room
    // https://stackoverflow.com/questions/2144386/how-to-delete-a-cookie
    // https://www.npmjs.com/package/react-cookie
});