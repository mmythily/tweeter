const escape = (str) => {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

const createTweetElement = tweet => {
    let $tweet = 
        `<article class='tweet'>
            <header>
                <img class='user' src='${tweet.user.avatars.small}'>
                ${tweet.user.name}
                <h6 class='handle'> ${tweet.user.handle} </h6>
            </header>
            <p>${escape(tweet.content.text)}</p>
            <footer>
                ${Date.now()} days ago
                <i class="fas fa-heart"></i>
                <span class='glyphicon glyphicon-retweet'></span> 
                <span class='glyphicon glyphicon-flag'></span> 
            </footer>
        </article>`
    return $tweet;
}

const renderTweets = tweets => {
    $('#tweets-container').empty();
    tweets.forEach( tweet => {
        $('#tweets-container').prepend(createTweetElement(tweet));
    });
}


const postTweets = () => {
    $('.new-tweet form').submit( event => {
        event.preventDefault();
        if ($('.new-tweet textarea').val().length < 1) {
            $('#error').text('Say something').show();
        }
        else if ($('.new-tweet textarea').val().length > 140) {
            $('#error').text('Character length too long!').show();
        } 
        else {
            $.ajax({
                url:'/tweets',
                type:'POST',
                data: {
                    text: $('#tweet-message').val()
                },
                success: () => {
                    loadTweets();
                }
            });
        }
    });
}

const loadTweets = () => {
    $.ajax({
        url: '/tweets',
        method: 'GET',
        success: renderTweets,
    });
}

$(document).ready( () => {
    postTweets();
    loadTweets();
});