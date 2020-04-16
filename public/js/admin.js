$(document).ready(() => {

    $('#username').on('keyup', () => {
        const username = $('#username').val();
        const avatarAPI = `https://avatars.dicebear.com/v2/gridy/${username}.svg?options[width][]=500&options[height][]=500`;
        $('#avatarImg').attr('src', avatarAPI);
    });

    $('#User-list, #Room-list').on('change', () => {
        const user = $('#User-list').find(":selected").attr('value');
        const roomId = $('#Room-list').find(":selected").attr('id');

        $.get("/admin/partialHistory",
            { user: user, roomId: roomId },
            (data) => {
                $('#history-container').html(data);
            })
            .fail(() => {
                alert("error");
            });
    });
})