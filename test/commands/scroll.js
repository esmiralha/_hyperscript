describe("the scroll command", function () {
  beforeEach(function () {
    clearWorkArea();
  });
  afterEach(function () {
    clearWorkArea();
  });

  it("scrolls an element to bottom", function () {
    var template = `
    <div id="container" style="max-height: 10em;overflow-y: scroll;" _='on click scroll me to bottom'>
      <div id="firstChild" style="min-height: 5em;">hey</div>
      <div style="min-height: 5em;">hey</div>
      <div style="min-height: 5em;">hey</div>
      <div id="lastChild" style="min-height: 5em;">hey</div>
    </div>`;

    var d1 = make(template);
    var parentBounding = d1.getBoundingClientRect();
    var firstChildBounding = byId("firstChild").getBoundingClientRect();
    firstChildBounding.top.should.be.at.least(parentBounding.top);
    var lastChildBounding = byId("lastChild").getBoundingClientRect();
    lastChildBounding.top.should.be.above(parentBounding.bottom);
    d1.click();
    lastChildBounding = byId("lastChild").getBoundingClientRect();
    lastChildBounding.top.should.be.at.most(parentBounding.bottom);

  });

  it("scrolls an element smoothly to bottom", function (done) {
    var template = `
    <div id="container" style="max-height: 10em;overflow-y: scroll;" _='on click scroll me smoothly to bottom'>
      <div id="firstChild" style="min-height: 5em;">hey</div>
      <div style="min-height: 5em;">hey</div>
      <div style="min-height: 5em;">hey</div>
      <div id="lastChild" style="min-height: 5em;">hey</div>
    </div>`;

    var d1 = make(template);
    var parentBounding = d1.getBoundingClientRect();
    var firstChildBounding = byId("firstChild").getBoundingClientRect();
    firstChildBounding.top.should.be.at.least(parentBounding.top);
    var lastChildBounding = byId("lastChild").getBoundingClientRect();
    lastChildBounding.top.should.be.above(parentBounding.bottom);
    d1.click();
    setTimeout(function () {
      try {
        lastChildBounding = byId("lastChild").getBoundingClientRect();
        lastChildBounding.top.should.be.at.most(parentBounding.bottom);
        done();
      } catch (err) {
        done(err);
      }
    }, 500);
  });

  it("scrolls an element to top", function () {
    var template = `
    <div id="container" style="max-height: 10em;overflow-y: scroll;" _='on click scroll me to top'>
      <div id="firstChild" style="min-height: 5em;">hey</div>
      <div style="min-height: 5em;">hey</div>
      <div style="min-height: 5em;">hey</div>
      <div id="lastChild" style="min-height: 5em;">hey</div>
    </div>`;

    var d1 = make(template);
    d1.scroll({ top: d1.scrollHeight, left: 0, behavior: "auto" });
    var parentBounding = d1.getBoundingClientRect();
    var firstChildBounding = byId("firstChild").getBoundingClientRect();
    firstChildBounding.top.should.be.below(parentBounding.top);
    var lastChildBounding = byId("lastChild").getBoundingClientRect();
    lastChildBounding.top.should.at.most(parentBounding.bottom);
    d1.click();
    lastChildBounding = byId("lastChild").getBoundingClientRect();
    lastChildBounding.top.should.be.above(parentBounding.bottom);

  });

  it("scrolls an element smoothly to top", function (done) {
    var template = `
    <div id="container" style="max-height: 10em;overflow-y: scroll;" _='on click scroll me smoothly to top'>
      <div id="firstChild" style="min-height: 5em;">hey</div>
      <div style="min-height: 5em;">hey</div>
      <div style="min-height: 5em;">hey</div>
      <div id="lastChild" style="min-height: 5em;">hey</div>
    </div>`;

    var d1 = make(template);
    d1.scroll({ top: d1.scrollHeight, left: 0, behavior: "auto" });
    var parentBounding = d1.getBoundingClientRect();
    var firstChildBounding = byId("firstChild").getBoundingClientRect();
    firstChildBounding.top.should.be.below(parentBounding.top);
    var lastChildBounding = byId("lastChild").getBoundingClientRect();
    lastChildBounding.top.should.at.most(parentBounding.bottom);
    d1.click();
    setTimeout(function () {
      try {
        lastChildBounding = byId("firstChild").getBoundingClientRect();
        lastChildBounding.top.should.be.equal(parentBounding.top);
        done();
      } catch (err) {
        done(err);
      }
    }, 500);
  });
});
