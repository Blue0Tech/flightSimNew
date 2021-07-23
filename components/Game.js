AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#ring1" },    
  },
  update: function () {
    this.isCollided(this.data.elementId);
  },

  init: function () {
    var duration = 120;
    const timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;
    const timer = document.querySelector('#timerentity');
    setInterval(() => {
      if (duration >= 0) {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        timerEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });

        duration -= 1;
      } 
      else {
        this.gameOver();
        clearInterval(timer);
        timer.setAttribute('visible',false);
      }
    }, 1000);
  },
  isCollided: function (elemntId) {
    const element = document.querySelector(elemntId);
    const timer = document.querySelector('#timerentity');
    element.addEventListener("collide", (e) => {
      if (elemntId.includes("#ring")) {
        element.setAttribute('visible',false);
        this.updateScore();
        this.updateTargets();
      } else {
        this.gameOver();
        timer.setAttribute('visible',false);
      }
    });
  },
  updateScore: function() {
    const element = document.querySelector('#score');
    var count = element.getAttribute('text').value;
    var currentScore = parseInt(count)+50;
    element.setAttribute('text',{value:currentScore});
  },
  updateTargets: function() {
    const element = document.querySelector('#targets');
    var count = element.getAttribute('text').value;
    var targets = parseInt(count)-1;
    element.setAttribute('text',{value:targets});
  },
  gameOver: function() {
    const plane = document.querySelector('#plane_model');
    const gameovertext = document.querySelector('#gameovertext');
    gameovertext.setAttribute('visible',true);
    plane.setAttribute('dynamic-body',{mass:1});
  }
  
});
