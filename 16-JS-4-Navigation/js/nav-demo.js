/**
 The NAV object houses all of the functionality for the main navigation
*/
var NAV = {
  
  /**
   ## clear
   Remove any styles left over from JavaScript based animations
  */
  clear: function() {
    // NAV.$mainNav.add( NAV.$mainNav.find( "ul" ) ).removeAttr( "style" );
  },

  /**
   ## slideSubNav
   Toggle the subNav menus open and closed states

   @param e - event that triggered this method
  */
  slideSubNav: function( e ) {
    // e.preventDefault();

    // if ( DR.getState() === "small" ) {
    //   $( this ).siblings( "ul" ).stop().slideToggle( "fast" );
    // }
  },

  /**
   ## toggleNav
   Toggle the display of the main nav. This is used at smaller sizes
   because the nav is hidden by default for this context.
  */
  toggleNav: function() {
    // NAV.$mainNav.toggle();
  },
  
  /**
   ## init
   Setup the appropriate event handlers for the navigation
  */  
  init: function() {
    /**
     Cache this for later use
    */
    // NAV.$mainNav = $( "#mainNav" );

    /**
     Show/Hide the main menu for smaller screens
    */
    // $( "#navToggle" ).on( "click", NAV.toggleNav );
    
    /**
     Click handler for first level nav
    */
    // NAV.$mainNav.find( ".subMenu" ).siblings( "a" ).on( "click", NAV.slideSubNav );

    /**
     When the window changes to greater than 410px, we need to clear out any
     inline styles applied via JavaScript animations.
    */
    // mediaCheck({
    //   media: '(min-width: 450px)',
    //   entry: NAV.clear
    // });
  }
};

/**
 ## on DOM Ready
 Run the NAV init method
*/
$(function() {
  NAV.init();
});