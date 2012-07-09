/**
 The NAV object houses all of the functionality for the main navigation
*/
var NAV = {
  
  /**
   ## clear
   Remove any styles left over from JavaScript based animations
  */
  clear: function() {
    NAV.$mainMenu.add( NAV.$mainMenu.find( "ul" ) ).removeAttr( "style" );
  },

  /**
   ## slideSubNav
   Toggle the subNav menus open and closed states

   @param e - event that triggered this method
  */
  slideSubNav: function( e ) {
    e.preventDefault();

    if ( APP.getState() === "small" ) {
      $( this ).siblings( "ul" ).stop().slideToggle( "fast" );
    }
  },

  /**
   ## toggleNav
   Toggle the display of the main nav. This is used at smaller sizes
   because the nav is hidden by default for this context.
  */
  toggleNav: function() {
    NAV.$mainMenu.toggle();
  },
  
  /**
   ## init
   Setup the appropriate event handlers for the navigation
  */  
  init: function() {
    /**
     Cache this for later use
    */
    NAV.$mainMenu = $( "#mainMenu" );

    /**
     Show/Hide the main menu for smaller screens
    */
    $( "#showNav" ).on( "click", NAV.toggleNav );
    
    /**
     Click handler for first level nav
    */
    NAV.$mainMenu.find( ".subMenu" ).siblings( "a" ).on( "click", NAV.slideSubNav );

    /**
     When the window changes to greater than 410px, we need to clear out any
     inline styles applied via JavaScript animations.
    */
    mediaCheck({
      media: '(min-width: 410px)',
      entry: NAV.clear
    });
  }
};

/**
 ## on DOM Ready
 Run the NAV init method
*/
$(function() {
  NAV.init();
});