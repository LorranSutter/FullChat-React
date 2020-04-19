$(document).ready(() => {

    $('#cancel').on('click', (event) => {
        event.preventDefault();
        window.location = window.location.origin + '/';
    });
})