function showTweets( data ) {
  var tweets = "";
  var i;

  for ( i in data ) {
    tweets += "<p class=\"tweet\">" + data[i].text + "</p>";
  }
  $( ".enhanced-twitter" ).html( tweets );
}

$(function() {
  if ( document.width >= 800 ) {
    $( "body" ).append( "<script src='http://api.twitter.com/1/statuses/user_timeline.json?screen_name=robtarr&callback=showTweets'/>");
  }
});

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");