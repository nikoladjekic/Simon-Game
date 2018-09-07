//for the colors
const RED = "RED";
const BLUE = "BLUE";
const YELLOW = "YELLOW";
const GREEN = "GREEN";

//for the sounds
const red = new Audio();
const blue = new Audio();
const yellow = new Audio();
const green = new Audio();
red.src = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
blue.src = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
yellow.src = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
green.src = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
var strict = false;
$("#count").html("--");
$("#winAlert").hide();

//checkbox to choose if the game is strict or not
$("input:checkbox").click(function(){
  var ischecked = $(this).is(":checked");
  if(ischecked){
    strict = true;
  } else { 
    strict = false;
  }
});

//click the start button
$("#start").click(function(){
  simon.sequence = [];
  simon.nextSequence();
  $("#start").html("Restart");  
});

//play the sound matching the color
function playSound(color) {
  color.play();
}

//after the player has won 20 rounds, click to play again
$("#alertBtn").click(function(){
  simon.sequence = [];
  simon.nextSequence();
  $("#start").html("Restart");
  $("#winAlert").addClass("animated bounceOut");
  $("#winAlert").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function(){ $("#winAlert").removeClass("animated bounceOut").hide(); });//remove the animation
});//click function

//Welcome box - click to play
$("#welcomeBtn").click(function(){
  $("#welcomeBox").addClass("animated bounceOut");
  $("#welcomeBox").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function(){ $("#welcomeBox").removeClass("animated bounceOut").hide(); });//remove the animation and hide afterwards
});//click function

function doSetTimeout(i) {
  (function(ind) {
    setTimeout(function() {
      if (simon.sequence[i] == "RED") {        
        $("#red").css("background-color", "#ff4d4d");
        setTimeout(function(){ $("#red").css("background-color", "red"); }, 500);
        playSound(red);
        
      } else if (simon.sequence[i] == "BLUE") {
        $("#blue").css("background-color", "#4d4dff");
        setTimeout(function(){ $("#blue").css("background-color", "blue"); }, 500);
        playSound(blue);
        
      } else if (simon.sequence[i] == "YELLOW") {
        $("#yellow").css("background-color", "#ffff80");
        setTimeout(function(){ $("#yellow").css("background-color", "#FFEA00"); }, 500);
        playSound(yellow);      
        
      } else if (simon.sequence[i] == "GREEN") {
        $("#green").css("background-color", "#00cc00");
        setTimeout(function(){ $("#green").css("background-color", "green"); }, 500);
        playSound(green);
      }
    }, 1000 + 1000*ind);
  })(i);
}

var simon = {
  colors: ["RED", "BLUE", "YELLOW", "GREEN"],
  step: 0,
  sendColor: function(color) {
    //check if sequence is empty and if so - start new game
    if (simon.sequence.length === 0) {
      simon.nextSequence();
    } else {
      if (color === simon.sequence[simon.step]) {
        //proceed to next step if true
        if (simon.step === simon.sequence.length - 1) {
          if (simon.sequence.length == 20) {
            simon.step = 0;
            simon.sequence = [];
            simon.nextSequence();
            $("#winAlert").show().addClass("animated bounceIn");
            $("#winAlert").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function(){ $("#winAlert").removeClass("animated bounceIn"); });//remove the animation            
          } 
          else if (simon.sequence.length < 20) {
            simon.step = 0;
            simon.nextSequence();
          }
        }
        else {
          simon.step++;
        }
      } 
      // !!lose condition, in case player fails the right sequence
      else {
        // if strict is not turned OFF, try again
        if (strict==false) {
          $("#count").text("!!");
          alert("Wrong! Try again");
          for(var i = 0; i<simon.sequence.length; i++){
            doSetTimeout(i);
            $("#count").text(simon.sequence.length);            
          }
          simon.step = 0;
        }
        else {
          //if strict is turned ON, start a new game
          $("#count").text("!!");
          alert("Wrong! Please start over.");
          $("#count").text("--");
          $("#start").html("New game");
          simon.sequence = [];
          simon.step = 0;
        }
      }
    }
    console.log("NEW COLOR: " + color);
  },
  sequence: [],
  nextSequence: function() {
    var nextColor = simon.colors[Math.floor(Math.random() * simon.colors.length)];
    simon.sequence.push(nextColor);
    for(var i=0; i<simon.sequence.length; i++) {
      doSetTimeout(i);
      $("#count").text(simon.sequence.length);
    }
    console.log("The sequence: " + simon.sequence);
  }
}; //end of simon object


//create the light-up function with a sound effect for every color
$(document).ready(function() {
  
  $("#red").click(function() {
    $("#red").css("background-color","#ff4d4d");
    setTimeout(function(){ $("#red").css("background-color","red"); }, 500);
    setTimeout(function(){ simon.sendColor(RED); }, 500);
    playSound(red);
  });
  
  $("#blue").click(function() {
    $("#blue").css("background-color","#4d4dff");
    setTimeout(function(){ $("#blue").css("background-color","blue"); }, 500);
    setTimeout(function(){ simon.sendColor(BLUE); }, 500);
    playSound(blue);
  });
  
  $("#yellow").click(function() {
    $("#yellow").css("background-color","#ffff80");
    setTimeout(function(){ $("#yellow").css("background-color","#FFEA00"); }, 500);
    setTimeout(function(){ simon.sendColor(YELLOW); }, 500);
    playSound(yellow);
  });
  
  $("#green").click(function() {
    $("#green").css("background-color","#00cc00");
    setTimeout(function(){ $("#green").css("background-color","green"); }, 500);
    setTimeout(function(){ simon.sendColor(GREEN); }, 500);
    playSound(green);
  });
  
}); //end of document ready function
