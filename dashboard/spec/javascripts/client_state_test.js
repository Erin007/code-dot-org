/* global dashboard */

//= require client_state
//= require jquery.cookie

describe("clientState#trackProgress", function() {
  beforeEach(function() {
    dashboard.clientState.reset();
  });

  it("records level progress and line counts when level is completed", function() {
    var state = dashboard.clientState;
    state.levelProgress(1).should.equal(0);
    state.levelProgress(2).should.equal(0);
    state.lines().should.equal(0);

    //User has passed a level with optimal solution
    state.trackProgress(true, 5, 100, 1);
    state.levelProgress(1).should.equal(100);
    state.levelProgress(2).should.equal(0);
    state.lines().should.equal(5);

    //User has passed another level but with suboptimal solution
    state.trackProgress(true, 10, 20, 2);
    state.levelProgress(1).should.equal(100);
    state.levelProgress(2).should.equal(20);
    state.lines().should.equal(15);

    //User passes the the same level but with a better solution
    state.trackProgress(true, 5, 100, 2);
    state.levelProgress(1).should.equal(100);
    state.levelProgress(2).should.equal(100);
    state.lines().should.equal(20);
  });

  it("records level progress but not line counts when level is failed", function() {
    var state = dashboard.clientState;
    state.levelProgress(1).should.equal(0);
    state.levelProgress(2).should.equal(0);
    state.lines().should.equal(0);

    //User has failed a level
    state.trackProgress(false, 5, 3, 1);
    state.levelProgress(1).should.equal(3);
    state.levelProgress(2).should.equal(0);
    state.lines().should.equal(0);

    //User failed a different level
    state.trackProgress(false, 5, 3, 2);
    state.levelProgress(1).should.equal(3);
    state.levelProgress(2).should.equal(3);
    state.lines().should.equal(0);
  });
});

