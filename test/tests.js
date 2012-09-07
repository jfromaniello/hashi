define(["hashi", "/test/vendor/chai.js"], function(hashi, chai){
  var expect = chai.expect;

  describe("hashi", function(){
    beforeEach(function(){
      window.location.hash = "#";
    });
    afterEach(function(){
      window.location.hash = "#";
    });
    
    function fixture(){
      it("should trigger the listener", function(done){
        var called = false;
        hashi.addListener(function(){
          called = true;
        });
        
        window.location.hash = "#tito";
        
        setTimeout(function(){
          expect(called).be.true;
          done();
        }, 110); // need to use a bigger timeout here :)
      });

      it("should not trigger the listener if it was removed", function(done){
        var called = false;
        function listener(){
          called = true;
        }
        hashi.addListener(listener);
        hashi.removeListener(listener);
        
        window.location.hash = "#tito";
        
        setTimeout(function(){
          expect(called).be.false;
          done();
        }, 110); // need to use a bigger timeout here :)
      });

      it("should not trigger only the removed listener", function(done){
        var called = false,
          called2 = false;
        
        function listener(){
          called = true;
        }
        
        function listener2(){
          called2 = true;
        }

        hashi.addListener(listener2);
        hashi.addListener(listener);
        hashi.removeListener(listener);
        
        window.location.hash = "#tito";
        
        setTimeout(function(){
          expect(called).be.false;
          expect(called2).be.true;
          done();
        }, 110); // need to use a bigger timeout here :)
      });
    }


    describe("when window.onhashchange and addEventListener exists", function(){
      before(function(){
        expect(window, "window.onhashchange is needed for this test")
          .to.have.property("onhashchange");
        expect(window, "window.addEventListener is needed for this test")
          .to.have.property("addEventListener");
      });

      afterEach(function(){
        hashi.removeAllListeners();
      });

      fixture.apply(this);
    });
    
    describe("when window.onhashchange exists but no addEventListener", function(){

      before(function(){
        expect(window, "window.onhashchange is needed for this test")
          .to.have.property("onhashchange");
      });

      beforeEach(function(){
        this.windowAddEventListener = window.addEventListener;
        window.addEventListener = null;
      });
      
      afterEach(function(){
        hashi.removeAllListeners();
        window.onhashchange=null;
        window.addEventListener = this.windowAddEventListener;
      });

      fixture.apply(this);
    });

    describe("when window.onhashchange and addEventListener does not exists", function(){

      beforeEach(function(){
        this.windowAddEventListener = window.addEventListener;
        window.addEventListener = null;
        window._$onhashchange_ignore = true;
      });

      afterEach(function(){
        hashi.removeAllListeners();
        window.addEventListener = this.windowAddEventListener;
        delete window._$onhashchange_ignore;
      });
      
      fixture.apply(this);
    });
  });

});