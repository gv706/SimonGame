var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clickedPattern=[];
var notstarted=true;
var level=0;
$("#start").on("click",function(event){
  if(notstarted){
   $("#start").hide(); 
   
      notstarted=false;
  nextSequence();
  $(".btn").on("click",function(){
  var userChosenColor=$(this).attr("id");
  clickedPattern.push(userChosenColor);
  makeSound(userChosenColor);   
  animatePress(userChosenColor);
  checkAnswer(clickedPattern.length-1);
  });
  
 
 }
});
function nextSequence() {
  level=level+1;
  $("#level-title").text("Level "+level); 
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   makeSound(randomChosenColour);
}
function makeSound(colour){
   var audio = new Audio("sounds/" + colour + ".mp3");
     audio.play();
}
function animatePress(currentColor){
   $("."+currentColor).addClass("pressed");
   setTimeout(function(){
      $("."+currentColor).removeClass("pressed");
   },100);
}
function checkAnswer(index){
   if(gamePattern[index]===clickedPattern[index])
    {
      if(gamePattern.length===clickedPattern.length)
      {
        clickedPattern=[];
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else{
        makeSound("wrong");
        $("#start").show();  
      $("body").addClass("game-over");
      gamePattern=[];
      clickedPattern=[];
      level=0;
      $(".btn").off("click");
      $("#level-title").text("Game Over, Press Start Button to Restart");
      notstarted=true;
      setTimeout(function(){
          $("body").css("background-color","#011F3F");
      },200)
    }
}