//Initialize Phaser Engine. Create a 400x490px game.

var game= new Phase.Game(400,490,Phaser.AUTO, "gameDiv");

//Create our 'main' state that will contain the game
//This is the body of the game itself. It contains all relevant code

var mainState= {
  
  preload: function () {
    // This function will execute at the beginning of the game
    //Will load all of our assets (art, music, etc) 
    
    game.stage.backgroundColor= "#71c5cf";
    
    game.load.image('bird', 'assets/bird.png');
    
    game.load.image('pipe', 'assets/pipe.png');
    
     
  },
  
  create: function () {
    //The creat function is called right after the preload f(x)
    //This is where we'll set up the game assets from scratch
    
    //Start our Physics Engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    
    this.bird=this.game.add.sprite(100, 250, 'bird');
    
    game.physics.arcade.enable(this.bird);
    
    
    this.bird.body.gravity.y= 1000;
    
    //add Pipes to the game
    this.pipes = game.add.group();
    
    //Add the body to the group
    this.pipes.enableBody = true
    
    //Create 20 pipes to hold in the group
    this.pipes.createMultiple(20, 'pipe');
    
    //Add in pipes over 1.5 seconds to the screen
    this.timer = game.time.events.loop(1500, this.addRowOfPipes,this)
    
    //When Spacebar is pressed, make the bird jump!
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
    
  },
  
  update: function () {
    //This function is called 60 times a second
    //It contains the games logic and all time related actions 
    
    if (this.bird.inWorld == false)
      this.restartGame();
  }
  },
  
//Add a pipe to the game with this function
  addOnePipe: function (x,y){
  var pipe=this.pipes.getFirstDead();
  
  //Set the new postion of the pipe
  pipe.reset(x,y);
  
  //Add velocity to the pipe to make it move to the left
  pipe.body.velocity.x= -200
  
  //Kill the pipe when it's no longer visible
  pipe.checkWorldBounds = true;
  pipe.outOfBoundsKill = true;
  },
  
  //This function uses the pipe function to add a row of pipes
  addRowOfPipes: function (){
  //Let's pick where the hole is going to be
  var hole= Math.floor(Math.random()* 5) + 1;
  
  //Add the 6 pipes in a column
  for(var i= 0; i<8; i++)
   if(i !=hole&&i!=hole+1){
   
   this.addOnePipe(400,i*60+10);
   
   }
   
   this.score+=1
   this.labelScore.text=this.score;
   },
   
   };