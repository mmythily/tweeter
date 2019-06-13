const toggle = () => {
    $('.new-tweet').hide();
    $('#compose').click( () => {
        $('.new-tweet').slideToggle('slow', () => {
        $('#tweet-message').select();
        });
    });
}

$(document).ready( () => {
    toggle();
});