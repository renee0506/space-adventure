//business-logic
var User = function(inputName){
  this.userName = inputName;
  this.inventory = []
  this.hp = 100;
  this.level = 0;
  this.str = 8;
};


var randomNumberGenerator = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var combat = function(newUser, enemy) {
  var newUserDamage;

  if (newUser.inventory[0] === "carrots"){
    newUserDamage = randomNumberGenerator(5, 20);
  } else {
    newUserDamage = randomNumberGenerator(5, 10);
  }
  var enemyDamage = randomNumberGenerator(5, 10);

  enemy.hp -= newUserDamage;
  newUser.hp -= enemyDamage;

  if (enemy.hp > 0 && newUser.hp > 0) {
    return "<p>You have done " + newUserDamage +" damage to the " + enemy.enemyName + ". He has " + enemy.hp + " health left. <br> The " + enemy.enemyName + " has done " + enemyDamage + " damage to you.</p>";
  } else if (newUser.hp <= 0) {
    gameOver();
    return "Game over!"
  } else {
    newUser.level += 1;
    return displayLevel(newUser);

  }

};


var command = function(actionSelect, typedObject, newUser){
  try {
    var inputCheck = eval(typedObject + '.' + actionSelect);
    if (inputCheck === "fight1") {
        return combat(newUser, enemy1)
    } else if (inputCheck === "fight2") {
        return combat(newUser, enemy2)
    } else if (inputCheck === "fight3") {
        return combat(newUser, enemy3)
    } else if (inputCheck === "level-up") {
      newUser.level += 1;
      return displayLevel(newUser);
    } else if (inputCheck === "double-level-up"){
      newUser.level += 2;
      return displayLevel(newUser);
    } else if(inputCheck === "game-end"){
      newUser.level += 1;
      gameEnd();
      return "<p>You have won the game!</p>"
    } else if (inputCheck === "add-to-inventory"){
      newUser.inventory.push(typedObject)
      newUser.str += 7;
      carrotPowerUp(newUser);
      return "<p>You ate your " + typedObject + ". You feel powerful now.</p>"
    }else{
      return inputCheck;
    }
  } catch(e) {
    return "<p>That is not an available choice.</p>"
  }
}




var displayLevel = function(newUser) {
  return levelArray[newUser.level].info;
  // console.log(levelArray[newUser.level].info);
  // $("#in-game-text").append(append);
}


// input name to variable name
var userInputConversion = function(userObjectInput) {
  if (userObjectInput === "planet"){
    return "planet";
  } else if (userObjectInput === "space radio") {
    return "radio";
  } else if (userObjectInput === "north") {
    return "north";
  } else if (userObjectInput === "south") {
    return "south";
  } else if (userObjectInput === "switch") {
    return "levelThreeButton";
  } else if (userObjectInput === "bunk") {
    return "bunk";
  } else if (userObjectInput === "button") {
    return "levelFourButton";
  } else if (userObjectInput === "carrots") {
    return "carrots";
  } else if (userObjectInput === "turnip") {
    return "turnip";
  } else if (userObjectInput === "foxes") {
    return "foxes";
  } else if (userObjectInput === "fox") {
    return "fox";
  } else if (userObjectInput === "forest") {
    return "forest";
  } else if (userObjectInput === "quietly") {
    return "quietly";
  } else if (userObjectInput === "tree") {
    return "tree";
  } else if (userObjectInput === "large rock") {
    return "levelEightRock";
  } else if (userObjectInput === "stick") {
    return "stick";
  } else if (userObjectInput === "laser gun") {
    return "levelNineLaserGun";
  } else if (userObjectInput === "sharp rocks") {
    return "levelTenRock";
  } else if (userObjectInput === "rope") {
    return "rope";
  } else if (userObjectInput === "microphone") {
    return "microphone";
  } else if (userObjectInput === "boiling water") {
    return "boilingWater";
  } else if (userObjectInput === "leader") {
    return "leader";
  } else if (userObjectInput === "zipper") {
    return "zipper";
  } else if (userObjectInput === "outside") {
    return "outside";
  } else if (userObjectInput === "fox jail") {
    return "foxJail";
  } else if (userObjectInput === "pot") {
    return "pot";
  } else if (userObjectInput === "ship") {
    return "ship";
  } else{
    return "<p>I don't understand what you mean.</p>"
  }
  return userObjectInput;
};



//front-end

function fightMode(newUser) {
  $(".game-chat-box").hide();
  $(".user-hp").hide();
  $(".game-chat-box").fadeIn();
  $(".user-hp").fadeIn();
  $(".user-hp").text(newUser.hp);
};

function carrotPowerUp(newUser){
  $(".strength").hide();
  $(".strength").fadeIn();
  $(".strength").text(newUser.str);
}
function gameEnd(){
  $(".game-end").slideDown();
}

function gameOver(){
  $(".game-over").slideDown();
}

var imageGen = function(newUser) {
  if (newUser.level === 1) {
    $("#statement").fadeIn();
  } else if (newUser.level === 4) {
     $("#statement").hide();
     $("#img1").fadeIn();
  } else if (newUser.level === 14) {
    $("#img1").hide();
    $("#img2").fadeIn();
  } else {

  }
};


$(document).ready(function() {

  // name and character selection
  $("#user-input").click(function(){

    var inputName = "";
    var newUser = new User(inputName);

    $("#in-game-text").append(displayLevel(newUser));
    $(".user-info").slideUp();
    $(".game, .main-character-panel, .game-row").slideDown();

    imageGen(newUser);

    // actual gameplay with user input and game dialogue
    $("#user-input-text").submit(function(event) {
      event.preventDefault();

      var userObjectInput = $("#user-object-input").val().toLowerCase();
      var userActionSelect = $("#user-action-select option:selected").val();
      var convertInput = userInputConversion(userObjectInput);
      try {
        var testVariable = eval(convertInput + ".level");

        if (testVariable === newUser.level) {
          if (userActionSelect === "fight" && (convertInput === "leader" || convertInput === "fox")) {
            fightMode(newUser);
          };
          var append = command(userActionSelect, convertInput, newUser);

          $("#in-game-text").append("<p><br>" + append + "</p>");
          $("#user-object-input").val("");

          $('.game-chat-box').scrollTop($('.game-chat-box').height());
          imageGen(newUser);


        } else {
          $("#in-game-text").append("<p><br>That is not an available selection at this time.</p>");
        }
      } catch(e) {
        $("#in-game-text").append("<p>That is not an available choice.</p>");
      }
    });
  });

  $(".end-btn").click(function(){
    location.reload();
  });


});
