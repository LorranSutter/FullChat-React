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
})