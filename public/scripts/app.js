//Cross site scripting safe
const escape = (str) => {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

//Converts milliseconds to appropriate time for user readability
const convertTime = (milsec) => {
    const sec = (Date.now() - milsec ) / 1000;
    const min = sec / 60;
    const hour = min / 60;
    const day = hour / 24;

    if ( min < 60 ) {
        return `${Math.floor(min)} minutes ago`;
    }
    else if ( min > 60 ) {
        return `${Math.floor(hour)} hour ago`;
    }
    else if ( hour > 24 ) {
        return `${Math.floor(day)} days ago`;
    }
}

//dynamic styling of a created tweet
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
                ${convertTime(tweet.created_at)}
                <i class="fa fa-heart"></i>
                <i class="fa fa-retweet"></i>
                <i class="fa fa-flag"></i>
            </footer>
        </article>`
    return $tweet;
}

//tweet will be prepended based on posted time.
const renderTweets = tweets => {
    $('#tweets-container').empty();
    tweets.forEach( tweet => {
        $('#tweets-container').prepend(createTweetElement(tweet));
    });
}

// posts tweet from form and shows user prompts if tweet is too short or too long
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

//Fetches tweets from mongo db to display on page.
const loadTweets = () => {
    $.ajax({
        url: '/tweets',
        method: 'GET',
        success: renderTweets,
    });
}

$(document).ready( () => {
    loadTweets();
    postTweets();
});