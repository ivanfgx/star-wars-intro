(function () {

  var animation_frame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var run_again = document.getElementById("run-again");
  var lastime = 0;
  var paths = document.querySelectorAll(".star-wars-paths path");
  var stars = document.querySelectorAll("#starry-sky-svg circle");
  var audio = new Audio("assets/star-wars.mp3");

  audio.load();
  on_animation_start(paths[0], function (event) {
    audio.play();
  });

  run_again.addEventListener("click", function (event) {
    location.reload();
  });

  function frame (currentime) {
    if (currentime >= lastime + 20)  {
      lastime = currentime;
      var random_star = stars[Math.floor(Math.random()*stars.length)];
      random_star.classList.remove("blink");
      random_star.getBBox();
      random_star.classList.add("blink");
    }
    animation_frame(frame);
  }

  animation_frame(frame);

  _(paths).each(function (path) {
    on_animation_end(path, function (event) {
      path.classList.add("reset");
    });
  });

  function on_animation_end (element, callback) {
    var animationend = ["webkitAnimationEnd", "animationend", "oanimationend"];
    _(animationend).each(function (event) {
      once(element, event, callback);
    });
  }

  function on_animation_start (element, callback) {
    var animationend = ["webkitAnimationStart", "animationstart", "oanimationstart"];
    _(animationend).each(function (event) {
      once(element, event, callback);
    });
  }

  function once (element, event, callback) {
    element.addEventListener(event, function (event) {
      element.removeEventListener(event.type, arguments.callee);
      return callback(event);
    }, false);
  }

})();