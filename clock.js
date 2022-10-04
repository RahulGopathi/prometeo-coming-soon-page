(function(){
    var WIDTH;
    var HEIGHT;
  
    var mouse = {x: 0, y: 0};
  
    function init(){
      WIDTH = window.innerWidth;
      HEIGHT = window.innerHeight;
  
      mouse.x = WIDTH/2;
      mouse.y = HEIGHT/2;
    }
  
  window.addEventListener('load', init, false);
  
  })();
  
  (function(){
  var glyphs;
  var frame;
  
  DigitCell = function(parentFrame) {
    this.frame = document.createElement('div');
    this.frame.classList.add('glyph');
    this.number = -1;
  
    this.cells = [];
    for (var i=0; i<15; i++) {
      var cell = document.createElement('span');
      cell.classList.add('cell');
      this.cells.push(cell);
      this.frame.appendChild(cell);
    }
  
    parentFrame.appendChild(this.frame);
  }
  
  DigitCell.prototype.DIGITS = [
    [1,1,1, 1,0,1, 1,0,1, 1,0,1, 1,1,1],
    [0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0],
    [1,1,1, 0,0,1, 1,1,1, 1,0,0, 1,1,1],
    [1,1,1, 0,0,1, 1,1,1, 0,0,1, 1,1,1],
    [1,0,1, 1,0,1, 1,1,1, 0,0,1, 0,0,1],
    [1,1,1, 1,0,0, 1,1,1, 0,0,1, 1,1,1],
    [1,1,1, 1,0,0, 1,1,1, 1,0,1, 1,1,1],
    [1,1,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1],
    [1,1,1, 1,0,1, 1,1,1, 1,0,1, 1,1,1],
    [1,1,1, 1,0,1, 1,1,1, 0,0,1, 1,1,1],
  ];
  
  DigitCell.prototype.update = function(number) {
    if (this.number === number) {
      return;
    }
  
    var digit = this.DIGITS[number];
    this.number = number;
  
    this.cells.shuffle();
    for (var i=0; i<this.cells.length; i++) {
      var cell = this.cells[i];
      if (digit[i]) {
        cell.classList.add('on');
      } else {
        cell.classList.remove('on');
      }
  
      cell.style.top = Math.floor(i/3) + 'em';
      cell.style.left = (i%3) + 'em';
    }
  }
  
  BlinkCell = function(parentFrame) {
    this.frame = document.createElement('div');
    this.frame.classList.add('glyph');
    this.frame.classList.add('blinker');
  
    this.cells = [];
    for (var i=0; i<5; i++) {
      var cell = document.createElement('span');
      cell.classList.add('cell');
      this.cells.push(cell);
      this.frame.appendChild(cell);
    }
  
    parentFrame.appendChild(this.frame);
  }
  
  BlinkCell.prototype.update = function(enable) {
    //this.cells.shuffle();
    for (var i=0; i<this.cells.length; i++) {
      var cell = this.cells[i];
  
      if (i%2 && enable) {
        cell.classList.add('on');
      } else {
        cell.classList.remove('on');
      }
  
      cell.style.top = i + 'em';
    }
  }
  
  
  function updateClock() {
    var dday = new Date();
    var now = new Date();
  
    // month must be 0 indexed
    dday = new Date(2023, 0, 18, 0, 0, 0, 0);
  
  
    var delta = (dday.getTime() - now.getTime()) / 1000;
  
    var date = Math.floor(delta / 60 / 60 / 24);
    var hour = Math.floor(delta / 60 / 60) % 24;
    var minute = Math.floor(delta / 60) % 60;
    var second = Math.floor(delta) % 60;
  
    glyphs[0].update(Math.floor(date/10/10));
    glyphs[1].update(Math.floor(date/10) % 10);
    glyphs[2].update(date%10);
  
    glyphs[4].update(Math.floor(hour/10));
    glyphs[5].update(hour%10);
  
    glyphs[7].update(Math.floor(minute/10));
    glyphs[8].update(minute%10);
  
    glyphs[10].update(Math.floor(second/10));
    glyphs[11].update(second%10);
  
    glyphs[3].update(second%2);
    glyphs[6].update(second%2);
    glyphs[9].update(second%2);
  
  }
  
  function init() {
    frame = document.querySelector('#clock');
    glyphs = [];
  
    for (var i=-1; i<11; i++) {
      var glyph;
      if (i % 3 == 2) {
        glyph = new BlinkCell(frame);
      } else {
        glyph = new DigitCell(frame);
      }
      glyphs.push(glyph);
    }
  
    updateClock();
    setInterval(updateClock, 1000);
  }
  
  function resizeHandler(event){
    //chrome's bug
    frame.style.fontSize = '3vw';
  }
  
  window.addEventListener('load', init, false);
  window.addEventListener('resize', resizeHandler, false);
  })();
  
  Array.prototype.shuffle = function() {
    for (var i=this.length-1; i>0; i--) {
      var rnd = Math.floor(Math.random() * (i+1));
      var tmp = this[i];
      this[i] = this[rnd];
      this[rnd] = tmp;
    }
  };
  
  