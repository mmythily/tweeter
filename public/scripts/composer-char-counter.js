$(document).ready(function() {
    
    $('.new-tweet textarea').on('input', function () {
        
        if ($('.new-tweet textarea').val().length < 1) {
            $('#error').text(`Say something`).show();
        }
        else if ($('.new-tweet textarea').val().length > 140) {
            $('#error').text('Character length too long!').show();
        } 
        else {
            $('#error').hide();
        }

        const count = $(this).val().length;

        if (count < 140){
            $(this).siblings('.counter').text(140 - count);
            $(this).siblings('.counter').css('color', 'black');
        }
        else {
            $(this).siblings('.counter').text(140 - count);
            $(this).siblings('.counter').css('color', 'red');
        }
    });
});