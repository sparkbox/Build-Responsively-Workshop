var DR = {
  
  /** 
  ## getState
  Determine the current context, based on mediaqueries,
  that the application is currently running in
   
  @return string
  */
  getState: function() {
    return window.getComputedStyle( document.getElementById( "sizeTest" ), ":after" ).getPropertyValue( "content" ) || "small";
  },

  home: {
    init: function() { 
      $(".site-challenge").fitText(2.2);
    }
  }
};

$(document).ready(UTIL.loadEvents);