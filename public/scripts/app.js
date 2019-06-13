
const renderTweets = (tweets) => {
    tweets.forEach( tweet => {
        $('#tweets-container').prepend(createTweetElement(tweet));
    });
}

const createTweetElement = (tweet) =>{
    
    const escape = (str) => {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
    
    let $tweet = 
        `<article class='tweet'>
            <header>
                <img class='user' src='${tweet.user.avatars.small}'>
                ${tweet.user.name}
                <h6 class='handle'> ${tweet.user.handle} </h6>
            </header>
            <p>${escape(tweet.content.text)}</p>
            <footer>
                ${tweet.created_at} days ago
                <i class="fas fa-heart"></i>
                <span class='glyphicon glyphicon-retweet'></span> 
                <span class='glyphicon glyphicon-flag'></span> 
            </footer>
        </article>`
        
    return $tweet;
}

const postTweets = () => {
    $('form').submit( event => {
        event.preventDefault();
        $.ajax({
            url:'/tweets',
            type:'POST',
            data: {
                text: $('#tweet-message').val()
            },
            success: () => loadTweets()
        });
    });
}

const loadTweets = () => {
    $.ajax({
        url: '/tweets',
        method: 'GET',
        success: renderTweets,
    });
}

const toggle = () => {
    $('#compose').on('click', () => {
        $('.new-tweet').slideToggle('slow', () => {
        $('#tweet-message').select();
        });
    });
}

const handleErrors = () => {
    //$('#tweet-btn').
    if ($('#tweet-message').val() === ''){
        $('#error1').slideDown();
    }
    else if ($('#tweet-message').val().length > 140) {
        $('#error2').slideDown();
    }
    else {
        $('#error1').hidden()
        $('#error2').hidden()
    }
}

$(document).ready( () => {
    toggle();
    postTweets();
    loadTweets();
    handleErrors();
});