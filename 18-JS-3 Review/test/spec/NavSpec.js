describe( "Nav", function() {
  
  describe( "Mobile context", function() {

    var $showNav, $mainMenu;

    beforeEach( function() {
      /**
        Load in the some HTML to simulate the navigation markup
      */
      loadFixtures( "fixtures/nav.html" );
      NAV.init();

      /**
        Fake the response from APP.getState() to return small so that we can test
        the functionality for small sizes, independent of the current size of the
        browser.
      */
      spyOn( APP, "getState" ).andReturn( "small" );

      /**
        Cache some selectors that will be reused.
      */
      $showNav = $( "#showNav" );
      $mainMenu = $( "#mainMenu" );
    });

    it( "should toggle the nav when clicking on the show nav icon", function() {
      $showNav.trigger( "click" );
      expect( $mainMenu.is( ":visible" ) ).toBe( true );

      $showNav.trigger( "click" );      
      expect( $mainMenu.is( ":hidden" ) ).toBe( true );
    });

    it( "should slide the sub navs open on the first click ", function() {
      /**
        Get a hook to the nav item that the test will "click" on.
      */  
      $subMenu = $( ".subMenu:first" );

      /**
        Get a hook to the subNav that the test will b elooking for.
      */
      $menuLink = $subMenu.siblings( "a" );

      /**
        Open up the main nav
      */
      $showNav.trigger( "click" );

      /**
        Click on the submenu and wait to verify that it opens
      */
      runs(function() {
        $menuLink.trigger( "click" );
      });

      waitsFor(function() {
        return $subMenu.is( ":visible" );
      }, "the submenu to be visible", 500 );

      runs( function() {
        expect( $subMenu.is( ":visible" ) ).toBe( true );
      });

      /**
        Click on the submenu again and wait to verify that it closes
      */
      runs(function() {
        $menuLink.trigger( "click" );
      });

      waitsFor(function() {
        return $subMenu.is( ":hidden" );
      }, "the submenu to be hidden", 500 );

      runs( function() {
        expect( $subMenu.is( ":hidden" ) ).toBe( true );
      });
    });

    it( "should be able to clear all JS applied styles", function() {
      $showNav.trigger( "click" );

      NAV.clear();

      expect( $mainMenu.attr( "style" ) ).toBe( undefined );
    });

  });

});