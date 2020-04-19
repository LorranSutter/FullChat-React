$(document).ready(() => {    

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

    // TODO Delete token when logout
    // https://stackoverflow.com/questions/2144386/how-to-delete-a-cookie
    // https://www.npmjs.com/package/react-cookie
})