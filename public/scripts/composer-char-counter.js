$(document).ready(function() {
    
    $('.new-tweet textarea').on('input', function () {
        
        const count = $(this).val().length;

        if (count < 140){
            $(this).siblings('.counter').text(140 - count);
            $(this).siblings('.counter').css('color', 'black');
        }
        else {
            $(this).siblings('.counter').text(140 - count);
            $(this).siblings('.counter').css('color', 'red');
        }
    })
});