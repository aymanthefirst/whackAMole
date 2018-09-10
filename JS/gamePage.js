$(document).ready(function(){

  var score = 0;
  var count = 0;
  var missed = 0;
  var speed = 2500; // speed at which moles pop up
  var slideSpeed = 1000; // time moles stay up for
  var time = 15000; // 40 seconds
  var randomNumber = 0;
  var lastRandomNumber = 0;
  $('#topScore').html(localStorage.getItem('score'));


  // get the text
  var text = $('#score').text();

startTimer(); // stats countdown for 40 seconds
popOut(); // mole pops out

function startTimer(){
  setInterval(function(){
    if (time >= 0.1) { // set to 0.1 because needed time to react.
      time = time - 100; // every second it goes down by 1.
      $('#time').html(time/1000); // sets time attribute in HTML.
    }
  }, 100); // 1 second
}



function popOut(){
  if  (time <= 2000) { // at the end of the game
    $('.mole').stop(); // stop all animations
  }
  else {
    console.log("one just popped out");
    randomNumber = Math.floor(Math.random() * 8); // random number from 0 to 8, rounded down.
    aMole = $(".mole:eq( "+ randomNumber +" )"); // specific index in mole
    randomNumber = lastRandomNumber;
    count++;
    missed = count - score -1; // updates missed
    $('#missed').html(missed);  // prints missed to html file
    aMole.show(); // mole appearss
    aMole.animate({marginTop: -100}); // slide up

    // animation
    setTimeout(function() { //wait 2 seconds
      aMole.animate({
                 marginTop : -10 // slide down
             }, function() {
                 aMole.hide(); // disappear only after slide
             });
      }, slideSpeed); //time moles stay up for

      speed = speed - 8; // best number after testing speeds
      slideSpeed = slideSpeed -50; // best number after testing speeds
      aMole.attr('src', 'images/mole.svg');
      aMole.on('click', function(){ // when a mole is clicked
        aMole.attr('src', 'images/squished.png');
        aMole.stop(true).fadeOut(1000);
        score++;
        $('#score').html(score);// display score in html file
      });

  }
  if (time <= 2000) { // if time is up
    $('#gameOverBox').show(); // displayes game over in html page

    //set the item in localStorage
    if (localStorage.getItem('score')< score &&
        score !== localStorage.getItem('first') &&
        score !== localStorage.getItem('second') &&
        score !== localStorage.getItem('third'))
    {
      localStorage.setItem('third', localStorage.getItem('second'));
      localStorage.setItem('second', localStorage.getItem('score'));
      localStorage.setItem('score', score);
      $('#gameOver').html('<h2 "id=gameOver">Congratulations, you have a new high score!</h2>');
    }
    else if (localStorage.getItem('second') < score &&
    score !== localStorage.getItem('first') &&
    score !== localStorage.getItem('second') &&
    score !== localStorage.getItem('third'))
 {
      localStorage.setItem('third', localStorage.getItem('second'));
      localStorage.setItem('second', score);
      $('#gameOver').html('<h2 "id=gameOver">Congratulations, you have a new high score!</h2>');
    }
    else if (localStorage.getItem('third') < score &&
    score !== localStorage.getItem('first') &&
    score !== localStorage.getItem('second') &&
    score !== localStorage.getItem('third'))
 {
      localStorage.setItem('third', score);
      $('#gameOver').html('<h2 "id=gameOver">Congratulations, you have a new high score!</h2>');
    }
    $('#topScore').html(localStorage.getItem('score'));

  }
  else {
      setTimeout(popOut, speed); // invokes itself to go again at a faster speed (slideSpeed = slideSpeed -50)
  }
}





  $('#restart').on('click', function(){ // when the restart button is clicked
    location.reload();  // all is set back to the beginning
  });

  $('#leaderBoard').on('click', function(){
    // setting leaderboard
    $('#first').html(localStorage.getItem('score'));
    $('#second').html(localStorage.getItem('second'));
    $('#third').html(localStorage.getItem('third'));
    $('#leaderTable').show();
  });

}); // finish all
