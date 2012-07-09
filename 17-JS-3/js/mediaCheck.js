/**
  mediacheck will take a hash and execute the specified methods based on the current mediaquery status.

  ex.
  
  mediaCheck({  
    media: '(min-width: 500px)',  
    entry: function() { ... },  
    exit: function() { ... }  
  });
  
  @param Object - options
*/
var mediaCheck = function( options ) {
  var mq;
    
  /**
   ## mqChange
   Call the entry and exit functions if the media query matches the correct state.

   @param MediaQueryList - mq
   @params Object - options
  */
  mqChange = function( mq, options ) {
    if ( mq.matches ) {
      if ( typeof options.entry === "function" ) {
        options.entry();
      }
    } else if ( typeof options.exit === "function" ) {
      options.exit();
    }
  };
  
  if ( window.matchMedia !== undefined ) {
    /**
     If the browser has matchMedia support then create a listener
    */
    createListener = function() {

      mq = window.matchMedia( options.media );
      mq.addListener( function() {
        mqChange( mq, options );
      });
      mqChange( mq, options );
    };
    createListener();
    
  } else {
    /**
     If the browser does not have matchMedia support then create a test to see
     if the mediaquery has been triggered, and then attach a listener to the
     resize event
    */
    var addEvent = window.addEventListener ? window.addEventListener : window.attachEvent;
    var mmListener = function() {
      var parts = options.media.match( /\((.*)-.*:\s*(.*)\)/ ),
          constraint = parts[ 1 ],
          value = parseInt( parts[ 2 ], 10 ),
          fakeMatchMedia = {};

      fakeMatchMedia.matches = constraint === "max" && value > window.outerWidth ||
                               constraint === "min" && value < window.outerWidth;
      mqChange( fakeMatchMedia, options );
    };


    window.addEvent( "resize", mmListener);
    mmListener();
  }
};