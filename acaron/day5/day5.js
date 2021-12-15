//Import expressJS module
const express = require('express');

// Create an epxress application object
const app = express()

app.set("view engine", "ejs");

class GameMatch {
  constructor() {
    this.id = gameList.length + 1000;
    this.turn = 0;//this is the index of this.players whose turn it is
    this.players = [];
    this.round = 0;
  }
}


class Character {
  constructor(name, race, profession) {
  this.id = characterList.length + 1000;
  this.name = name
  this.race = race
  this.profession = profession
  this.equipment = {
    head: {},
    chest: {},
    legs: {},
    arm_p: {},
    arm_s: {}
  }
  this.inventory = []
  this.abilities = []
  this.stats = {
    attack: 5,
    defense: 5,
    speed: 5,
    hp_current: 20,
    hp_max: 20
  }
  //This method searches for an item in the itme list with this name
  //And adds it to this character's inventory
  this.pickupItem= function(searchName) {
    console.log(this);
    for (var item of item_list) {
      console.log(item.name);
      if (item.name == searchName) {
        console.log("Found a match!");
        this.inventory.push(item);
        break;
      }
    }
  }
  //This method searches for a given slot and overwrites
  //it with an empty object
  this.unequipItem= function(slot) {
    for (var slotName in this.equipment) {
      console.log(slotName);
      if (slotName == slot) {
        console.log("Found item slot. Removing.");
        this.equipment.slotName = {};
        break;
      }
    }
  }
}
}

// This holds all possible items
var item_list = [
  {
    name: 'Sword',
    slot: 'arm_p',
    bonuses: {
      attack: 5
    }
  },
  {
    name: 'Shield',
    slot: 'arm_s',
    bonuses: {
      defense: 5
    }
  }
];

// create character list with two default characters

var gameList = [];
var characterList = []
characterList.push(new Character('A pet named Steve', 'goldfish', 'bubbles'))
characterList.push(new Character('That pet named Steve', 'lizard', 'salesmen'))

for (var character of characterList) {
  character.pickupItem('Sword');
}

app.get('/game', (req, res) => {
  // search for the game in the game list
  var foundGame = gameList.find(game => game.id == req.query.gameid);
  // if a game was found, we can manipulate it
  if (foundGame) {
    //check to see if the user sent the addcharacter query param (&addcharacter=xxxx)
    if (req.query.addcharacter) {
      //check to see if there is room in this game's player list to add a character
      if (foundGame.players.length < 2) {
        //find the character with the given addcharacter id
        var foundProfile = characterList.find(character => character.id == req.query.addcharacter);
        //if the character exists, add id to this game's character list
        if (foundProfile) {
          foundGame.players.push(foundProfile.id)
        }
      }
    }
    //render a template called 'game' from 'views' folder
    //and send it a variable called 'sendData'
    res.render('game', {
      sendData: foundGame })
  } else {
    res.redirect('/newgame');
  }
});
app.get('/newgame', (req, res) => {
  gameList.push(new GameMatch());
  res.redirect('/game/?gameid=' + gameList[gameList.length - 1].id)
});
// Create a GET endpoint
app.get('/profile', (req, res) => {
  var foundProfile = characterList.find(character => character.id == req.query.characterid);
  if (foundProfile) {
    //render a template called 'profile' from views folder
    //and send it a variable called 'sendData'
    res.render('profile', {
      sendData: foundProfile })
  } else {
    res.redirect('/newprofile');
  }
});

//this endpoint creates a new character
app.get('/newprofile', (req, res) => {
  characterList.push(new Character('some pet named Steve', 'lizard', 'salesmen'))
  res.redirect('/profile/?characterid=' + characterList[characterList.length - 1].id)
});

//Start an http listen server
app.listen(3000);
