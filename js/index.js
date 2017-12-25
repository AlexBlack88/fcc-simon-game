$(document).ready(function() {
  //Global vars
  const NUM_OF_LEVELS = 20;
  var userSeq = [];
  var simonSeq = [];
  var strict = false;
  var error = false;
  var gameOn = false
  var id,
    color,
    level = 0;
  var boardSound = [
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  ];
//-----------
  $(".display").text("");
  
  $(".start").click(function() {
    strict = false;
    error = false;
    level = 0;
    level++;
    simonSeq = []
    userSeq = [];
    simonSequence();
  });
  
  //user pad listener
  $(".board-pad").click(function() {
    id = $(this).attr("id");
    color = $(this).attr("class").split(" ")[1];
    userSequence();
    });
  
  //strict mode listener
  $(".strict").click(function() {
    level = 0;
    level++;
    simonSeq = []
    userSeq = [];
    strict = true;    
    simonSequence();
  });
  
  //listener for switch button
  $(".switch").click(function() {    
    gameOn = (gameOn == false) ? true : false;
    console.log(gameOn);
    if(gameOn) {
      $(".switch-inner").addClass("inner-inactive");
      $(".switch").addClass("outer-active");
      $(".display").text("00")
    }
    else {
      $(".switch-inner").removeClass("inner-inactive");
      $(".switch").removeClass("outer-active");
      $(".display").text("");
    }    
  });
  
  //user sequence
function userSequence() {
  userSeq.push(id);
    console.log(id+" "+color);
    addClassSound(id, color);
    //check user sequence
    if(!checkUserSeq()) {
      //if playing strict mode reset everything lol
      if(strict) {
        console.log("strict");
        simonSeq = [];
        level = 1;
      }   
      error = true;   
      displayError();
      userSeq = [];      
      simonSequence();
    }
    //checking end of sequence
    else if(userSeq.length == simonSeq.length && userSeq.length < NUM_OF_LEVELS) {
      level++;
      userSeq = [];
      error = false;
      console.log("start simon")
      simonSequence();
    }
    //checking for winners
    if(userSeq.length == NUM_OF_LEVELS) {
      displayWinner();
      resetGame();
    }     
  
}
// simon sequence 
function simonSequence() {
  console.log("level "+level);
  $(".display").text(level);
  if(!error) {
    randomNum();
  }
  if(error && strict) {
    randomNum();
  }  
  var i = 0;
  var myInterval = setInterval(function() {
    id = simonSeq[i];
    color = $("#"+id).attr("class");
    color = color.split(" ")[1];
    console.log(id+" "+color);
    addClassSound(id, color);
    i++;
    if(i == simonSeq.length) {
      clearInterval(myInterval);
    } 
  }, 1000);  
}
//gen random number
function randomNum() {
  var random = Math.floor(Math.random() * 4);
  simonSeq.push(random);
}
//add  class and sound 
function addClassSound(id, color) {
  $("#"+id).addClass(color+"-active");
  playSound(id)
  setTimeout(function(){
    $("#"+id).removeClass(color+"-active");
  }, 500);
}
// checking user seq 
function checkUserSeq() {
  for(var i = 0; i < userSeq.length; i++) {
    if(userSeq[i] != simonSeq[i]) {      
      return false;
    }
  }
  return true;
}
  
// display err 
function displayError() {
  var counter = 0;
  var myError = setInterval(function() {
    $(".display").text("Err");
    counter++;
    if(counter == 3) {
      $(".display").text(level);
      clearInterval(myError);
      userSeq = [];
      counter = 0;
    }
  }, 500);
}
//display winner 
function displayWinner() {
  var count = 0;
  var winInterval = setInterval(function() { 
    count++;
    $(".display").text("Win");
    if(count == 5) {
      clearInterval(winInterval);
      $(".display").text("00");
      count = 0;
    }
  }, 500);
}
//play sound 
function playSound(id) {
  var snd = new Audio(boardSound[id]);
  snd.play();
}
// reset 
function resetGame() {
  userSeq = [];
  simonSeq = [];
  level = 0;
  $(".display").text("00");
}  
  
  
});