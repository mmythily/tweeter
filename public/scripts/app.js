// Fake data taken from tweets.json
const data = [
    {
    "user": {
        "name": "Newton",
        "avatars": {
            "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
    },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
    },
    {
        "user": {
        "name": "Descartes",
        "avatars": {
            "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
            "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
            "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" 
    },
        "content": {
        "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
    },
    {
    "user": {
        "name": "Johann von Goethe",
        "avatars": {
            "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
            "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
            "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
    },
    "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
        },
        "created_at": 1461113796368
    }
];



function renderTweets(tweets) {
    tweets.forEach(tweet => {
        $('#tweets-container').prepend(createTweetElement(tweet));
    });
}

function createTweetElement(tweet) {
    //$('#tweets-container').append($tweet);

    let $tweet = 
        `<article class='tweet'>
            <header>
                <img class='user' src='${tweet.user.avatars.small}'>
                ${tweet.user.name}
                <h6 class='handle'> ${tweet.user.handle} </h6>
            </header>
            <p>${tweet.content.text}</p>
            <footer>
                ${tweet.created_at} days ago
                <i class="fas fa-heart"></i>
                <span class='glyphicon glyphicon-retweet'></span> 
                <span class='glyphicon glyphicon-flag'></span> 
            </footer>
        </article>`
    return $tweet;
}


$(document).ready(function() {

    renderTweets(data);

    const loadTweets = () => {
        $.ajax({
            url: '/tweets',
            method: 'GET',
            success: renderTweets,
        });
    }

    $('form').submit(function( event ) {
        event.preventDefault();
        console.log($(this).serialize())
        console.log($('#tweet-message').val());

        $.ajax({
            url:'/tweets',
            type:'POST',
            data: {
                text: $('#tweet-message').val()
            },
            success: () => loadTweets()
        });
    });
});