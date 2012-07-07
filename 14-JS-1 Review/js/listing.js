/**
  shortcut for the jQuery onDOMready event
*/
$( function() {
  /** 
    The bigger the number passed to fitText is used to compress
    the text - so the larger the number, the smaller the text will be.
  */
  $( "section" ).find( "h1" ).fitText( 0.71 );
});