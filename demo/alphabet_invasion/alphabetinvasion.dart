#import('dart:html');
#import('../../lib/reactive_lib.dart');
#resource('main.css');

class AlphabetInvasion {
  // DOM element references
  Element modalBox, message, score, playfield, level, remainingEnemies, highScore;
  
  // Observable subscribers that will need to be disposed of at different
  // points in the game cycle
  IDisposable windowHeight, keyboard, generator, matcher, gameloop;
  
  // A common observable for keyboard events
  // that will be subscribed to by several observers
  IObservable keyboardObservable;
  
  int currentLevel = 1;
  GameState gameState;
  
  final int CURRENT_SPEED = 0;
  final int LAUNCH_RATE = 1;
  final String HIGH_SCORE_STORAGE_KEY = '_alphabet_attack_high_score_';
  final Queue<Element> enemies;
  
  static ElementRect playfieldDimensions;
  static num playfieldheight = 0;
  
  static final String lookup = "abcdefghijklmnopqrstuvwxyz";
  static final Map levels = 
                      const {
                        "Level 1 - Rookies": const [60, 1300],
                        "Level 2 - Tenderfoots": const [55, 1200],
                        "Level 3 - Militia": const [50, 1100],
                        "Level 4 - Privates": const [50, 1000],
                        "Level 5 - Corporals": const [45, 800],
                        "Level 6 - Sergeants": const [40, 650],
                        "Level 7 - Master Sergeants": const [35, 500],
                        "Level 8 - Lieutenants": const [30, 450],
                        "Level 9 - Captains": const [25, 400],
                        "Level 10 - Majors": const [20, 400],
                        "Level 11 - Colonels": const [15, 350],
                        "Level 12 - Generals": const [11, 350],
                        "Level 13 - Special Forces": const [9, 350],
                        "Level 14 - Black Ops": const [7, 350],
                        "Level 15 - Ninjas": const [5, 350]    
                      };

                      
                      
  AlphabetInvasion()
  :enemies = new Queue()
  {
    // get references to our needed DOM elements
    modalBox = document.query('#modalmessages');
    message = document.query('#message');
    score = document.query('#score');
    playfield = document.query('#playfield');
    level = document.query("#level");
    remainingEnemies = document.query("#remaining");
    highScore = document.query("#highscore");
    
  }
 
  
  run(){
    resetGame();
    
    // monitor keyboard events
    // this observable will be used in two different places:
    // first to monitor an 'any key' mode when the game is paused
    // and second to read user input during actual game play
    keyboardObservable = Observable.fromEvent(window.on.keyPress);
    
    // if the game is 'paused', any key will cause the game
    // to start.
    keyboardObservable.subscribe((e){
      if (gameState == GameState.Paused){
        hideMessage();
        playLevel();
      }
    });
        
    // retreive the high score if one exists
    String hs = window.localStorage.getItem(this.HIGH_SCORE_STORAGE_KEY);
    if (!hs.isEmpty()) highScore.text = hs;
  }  
  
  
  void playLevel(){
   
   if (generator != null) generator.dispose();
   
   String title = levels.getKeys().filter((k) => k.contains(currentLevel.toString())).iterator().next();
   List config = levels[title];
            
   gameState = GameState.Playing;

   level.text = currentLevel.toString();
   
   showMessage(title);
   
   // nested method to handle the actual gameplay loop
   void play(){
     hideMessage();

     int enemiesThisLevel = ((currentLevel * 2) + 13);
     
     remainingEnemies.text = enemiesThisLevel.toString();
     
     num capitalLetterProbability = 1 - ((currentLevel * 2.5) / 100);
     
     int killed = 0;
     
     bool allEnemiesLaunched = false;
     
     // Start the game loop, which updates the enemies.
     gameloop = Observable
       .timer(config[CURRENT_SPEED])
       .subscribe((__) => updatePlayfield());


     // set another subscriber to the keyboardObservable
     // which handles play input during each level
     keyboard = keyboardObservable.subscribe((e){
       if (enemies.isEmpty()) return;
       
       // we are only concerned about the enemy closest to the ground...
       if (e.charCode == enemies.first().text.charCodeAt(0)){
        
        // enemy killed, so remove from tracking queue and 
        // update visuals
        Element enemy = enemies.removeFirst();
        killEnemy(enemy);
        remainingEnemies.text = (enemiesThisLevel - ++killed).toString();
        
        // all enemies cleared, move on to the next level
        if (enemies.isEmpty() && allEnemiesLaunched){
          nextLevel();
        }
       }
     });
     
     // Generate enemies for this Level.
     // 10% chance for uppercase enemy
     generator = Observable
                 .randomInt(0, 25, intervalLow:config[LAUNCH_RATE], intervalHigh:config[LAUNCH_RATE], howMany: enemiesThisLevel)
                 .apply((v) => Math.random() <= capitalLetterProbability ? lookup[v - 1] : lookup[v - 1].toUpperCase())
                 .subscribe((v) => launchNewEnemy(v), () => allEnemiesLaunched = true);
   }
   
   // This observable sets a delay for showing the level title,
   // after which we call the nested play() method to start
   // the level.
   Observable
    .timer(2500, 1)
    .subscribe((_) => play());
    

  }
  
  void nextLevel(){
    if (currentLevel == 15) youWin();
    
    gameState = GameState.Stopped;
    gameloop.dispose();
    generator.dispose();
    keyboard.dispose();
    
    showMessage("Level $currentLevel Complete");
    
    currentLevel++;
    
    Observable
    .timer(4000, 1)
    .subscribe((_) => playLevel());
  }
  
  void youWin(){
    if (gameState == GameState.Stopped) return;
    
    // change game state and dispose of our
    // game loop observables
    gameState = GameState.Stopped;
    gameloop.dispose();
    generator.dispose();
    keyboard.dispose();
    
    showMessage("You win this time Earthling!  We'll be back!");
    
    // reset the game after 5.5 seconds
    Observable
    .timer(5500, 1)
    .subscribe((_) => resetGame());    
  }
  
  void youLose(){
    //return if late to the party
    if (gameState == GameState.Stopped) return;
    
    // change game state and dispose of our
    // game loop observables
    gameState = GameState.Stopped;
    gameloop.dispose();
    generator.dispose();
    keyboard.dispose();
    
    // adjust all enemies except the one that landed
    // to look like :P
    enemies.forEach((enemy) {
      if (enemy != enemies.first()){
        enemy.text = ":P";
        enemy.classes.add("rotate"); // applies a 90 deg rotation to the text
        enemy.style.fontSize = 72;   // css3 transition
      }
    });
    
    showMessage("You Lose Earthling.  Prepare to be alphabetized!");
    
    // reset the game after 4.5 seconds
    Observable
    .timer(4500, 1)
    .subscribe((_) => resetGame());
  }
  
  
  void killEnemy(Element enemy){    
    // adjust the enemy visual
    enemy.style.color = "Red";
    enemy.text = "@";
    enemy.style.fontSize = 48; //triggers css3 transition
    
    // calculate a score
    int v = getTopValue(enemy);
    addToScore((playfieldDimensions.bounding.height - v) * currentLevel);   
    
    // remove the enemy from the DOM after 750ms
    Observable
      .timer(750, 1)
      .subscribe((_) => enemy.remove());
  }
  
  // Updates positions of all enemies and calculates if an enemy has landed.
  void updatePlayfield(){
    
    // adjusting enemy speed based on playfield height
    num factor = playfieldheight / 200;
    
    // iterate the enemy list and make adjustments...
    Observable
        .fromList(enemies.dynamic)
        .subscribe((Element enemy){
          int newPos = (getTopValue(enemy) + factor);
          enemy.style.top = newPos;
          
          if (newPos >= playfieldheight + 44) youLose();
          
        });
  }
  
  // helper to retrieve the numeric equivalent of Element.style.top
  int getTopValue(Element e) => Math.parseInt(e.style.top.toString().replaceAll('px',''));
  
  // 
  void launchNewEnemy(String v){
    //randomize a color, not too dark
    int r = (Math.random() * 100 + 155).toInt();
    int g = (Math.random() * 100 + 155).toInt();
    int b = (Math.random() * 100 + 155).toInt();
    
    // build the enemy and set it's initial position
    Element l = new Element.tag("div");
    
    l.classes.add('enemy');
    l.style.color = 'rgb($r,$g,$b)';
    l.text = v;
    l.style.top = playfieldDimensions.bounding.top;
    l.style.left = Math.random() * (playfieldDimensions.client.width - 25);

    // update the tracking queue and add the enemy to the DOM
    enemies.add(l);
    playfield.elements.add(l);
  }
  
  void addToScore(int amount){
    int newScore = (Math.parseInt(score.text) + amount);
    score.text = newScore.toString();
    
    if (newScore > Math.parseInt(highScore.text)){
      highScore.text = newScore.toString();
      window.localStorage.setItem(HIGH_SCORE_STORAGE_KEY, newScore.toString());
    }
  }
 
    
  void resetGame(){
    gameState = GameState.Paused;
    
    showMessage("");
    
    currentLevel = 1;
    
    score.text = "0";
    level.text = "1";
    remainingEnemies.text = "";
    
    
    clearPlayfield();    
    
    updatePlayfieldHeight();
    
    if (windowHeight != null) windowHeight.dispose();
    if (generator != null) generator.dispose();
    if (matcher != null) matcher.dispose();
    if (gameloop != null) gameloop.dispose();
    if (keyboard != null) keyboard.dispose();
    
    // monitor the browser for size changes and adjust the playfield height accordingly
    windowHeight = Observable
                    .fromEvent(window.on.resize)
                    .subscribe((_) => updatePlayfieldHeight());
    
    showMessage("PRESS ANY KEY TO START");
    
  }
  
  // Update the measurement of the playfield, usually in response to a browser size change.
  void updatePlayfieldHeight() { playfield.rect.then((ElementRect r) 
                                                          {
                                                            playfieldDimensions = r;
                                                            
                                                            playfieldheight = r.client.top + r.client.height;    
                                                          });
  }
  
  void clearPlayfield() {
    enemies.forEach((e) => e.remove());
    enemies.clear();
  }
  
  // Displays a model message one letter at a time.
  void showMessage(String msg){

    if (msg.length == 0) {
      message.text = "";
      return;
    }
    
    modalBox.style.opacity = "1";
   
    // since the Observable.timer() returns a tick count for each tick, we'll 
    // use that to update the element each time until the entire message
    // is shown.
    Observable
      .timer(30, msg.length)
      .subscribe((v) => message.text = msg.substring(0, v));

  }
  
  void hideMessage() {
    modalBox.style.opacity = "0";
  }
  
}

// The 'Nystrom enum'...
class GameState{
  final String _str;
  const GameState(this._str);
  
  static final Playing = const GameState('playing');
  static final Paused = const GameState('paused');
  static final Stopped = const GameState('stopped');
  
}

void main() {
  new AlphabetInvasion().run();
}
