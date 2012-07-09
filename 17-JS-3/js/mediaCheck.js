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
  
  /**
    If the browser has matchMedia support then create a listener
  */
  if ( window.matchMedia !== undefined ) {
    /**
      Create a MediaQueryList object from the media option passed in to mediaCheck.
    */
    var mq = window.matchMedia( options.media );
    
    /**
      Add a listener to trigger mqChange when the specified media query is triggered.
    */
    mq.addListener( function() {
      mqChange( mq, options );
    });

    /**
      Trigger mqChange to fire any code that needs to run based on the initial mediaquery state.
    */
    mqChange( mq, options );
    
  } else {
    /**
     If the browser does not have matchMedia support then create a test to see
     if the mediaquery has been triggered, and then attach a listener to the
     resize event
    */
    var addEvent = window.addEventListener ? window.addEventListener : window.attachEvent;
    var mmListener = function() {
      /**
        Pull out the parts of the media query passed in to mediaCheck
      */
      var parts = options.media.match( /\((.*)-.*:\s*(.*)\)/ );
      
      /**
        This is the constraint portion of the mediaquery (i.e. min-width, max-width, etc.)
      */
      var constraint = parts[ 1 ];
      
      /**
        This is the value portion of the mediaquery (i.e. 510px, 23em, etc.)
      */
      var value = parseInt( parts[ 2 ], 10 );
      
      /**
        This is used to simulate the matchMedia.matches result in the call to mqChange
      */
      var fakeMatchMedia = {};

      /**
        This is currently only checking against width
        TODO: Make this better
      */
      fakeMatchMedia.matches = constraint === "max" && value > window.outerWidth ||
                               constraint === "min" && value < window.outerWidth;
      
      /**
        Pass the faked matchMedia results to mqChange
      */
      mqChange( fakeMatchMedia, options );
    };

    /**
      Since this browser does not support mediaquery-based events, we're going
      to check on resize to see if our mediaqueries have been triggered.
    */
    window.addEvent( "resize", mmListener);
    mmListener();
  }
};