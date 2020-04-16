$(document).ready(() => {

    function avatarAspectRatio() {
        const h = $('.login-container .content .avatar').height();
        $('.login-container .content .avatar').css({ 'width': h + 'px' });
    }

    window.onresize = avatarAspectRatio;

    avatarAspectRatio();

    fetch('https://randomuser.me/api/?inc=login')
        .then(res => {
            res.json()
                .then(data => {
                    const username = data.results[0].login.username;

                    $('#username').val(username)
                    $('#avatarImg').attr('src', `https://avatars.dicebear.com/v2/gridy/${username}.svg?options[width][]=500&options[height][]=500`);
                });
        });

    $('#username').on('keyup', () => {
        const username = $('#username').val();
        const avatarAPI = `https://avatars.dicebear.com/v2/gridy/${username}.svg?options[width][]=500&options[height][]=500`;
        $('#avatarImg').attr('src', avatarAPI);
    })

    const socket = io.connect(window.location.origin);

    $('#getStarted').on('click', () => {
        const username = $('#username').val();
        socket.emit('connected', { username });
    });
})