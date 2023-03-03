$(document).ready(function() {
  let interval;
  let time = 0;

  function updateTime() {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    $(".time").text(hours + ":" + minutes + ":" + seconds);
  }

  async function startTimer() {
    clearInterval(interval);
    interval = setInterval(async function() {
      time++;
      updateTime();
    }, 1000);
  }

  $(".start").click(async function() {
    await startTimer();
  });

  $(".stop").click(function() {
    clearInterval(interval);
  });

  $(".reset").click(function() {
    clearInterval(interval);
    time = 0;
    updateTime();
  });
});

  