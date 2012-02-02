#import('dart:html');
#import('../../lib/reactive_lib.dart');
#resource('testfile.html');
#resource('main.css');

class zipdemo {
  Element modalBox, message, score, playfield, level, remainingEnemies, highScore;
  IDisposable windowHeight, keyboard, generator, matcher, gameloop;
  
  IObservable keyboardObservable;
  
  GameState gameState;
  final Queue<Element> enemies;
  final int CURRENT_SPEED = 0;
  final int LAUNCH_RATE = 1;
  static ElementRect playfieldDimensions;
  static num playfieldheight = 0;
  int currentLevel = 1;
  static final String lookup = "abcdefghijklmnopqrstuvwxyz";
  static final Map levels = 
  const {
    "Level 1 - Rookies": const [33, 1900],
    "Level 2 - Tenderfoots": const [31, 1700],
    "Level 3 - Militia": const [29, 1500],
    "Level 4 - Privates": const [27, 1350],
    "Level 5 - Corporals": const [25, 1100],
    "Level 6 - Sergeants": const [23, 1000],
    "Level 7 - Master Sergeants": const [20, 950],
    "Level 8 - Lieutenants": const [18, 900],
    "Level 9 - Captains": const [15, 850],
    "Level 10 - Majors": const [11, 800],
    "Level 11 - Colonels": const [9, 700],
    "Level 12 - Generals": const [7, 650],
    "Level 13 - Special Forces": const [5, 600],
    "Level 14 - Black Ops": const [3, 550],
    "Level 15 - Ninjas": const [1, 500]    
  };
  
  zipdemo()
  :enemies = new Queue()
  {
    modalBox = document.query('#modalmessages');
    message = document.query('#message');
    score = document.query('#score');
    playfield = document.query('#playfield');
    level = document.query("#level");
    remainingEnemies = document.query("#remaining");
    highScore = document.query("#highscore");
    highScore.text = "0";
  }
 
  
  run(){
    resetGame();
    
    // monitor keyboard events
    keyboardObservable = Observable.fromEvent(window.on.keyPress);
                  
    keyboardObservable.subscribe((e) => handleKeypress(e));
    
   
  }  

  void handleKeypress(e){
    
    if (gameState == GameState.Paused){
//      showMessage('${e.charCode} ${charCodeToChar(e.charCode)}');
      hideMessage();
      playLevel();
    }
  }
  
  
  void playLevel(){
   
   if (generator != null) generator.dispose();
   
   String title = levels.getKeys().filter((k) => k.contains(currentLevel.toString())).iterator().next();
   List config = levels[title];
   int enemiesThisLevel = ((currentLevel * 2) + 8);
   int killed = 0;
   gameState = GameState.Playing;
   
   showMessage(title);
   level.text = currentLevel.toString();
   remainingEnemies.text = enemiesThisLevel.toString();
   
   Observable
    .timer(2500, 1)
    .subscribe((_){
      hideMessage();

      bool allEnemiesLaunched = false;
      
      // Start the game loop, which updates the enemies.
      gameloop = Observable
        .timer(config[CURRENT_SPEED])
        .subscribe((__) => updatePlayfield());


      keyboard = keyboardObservable.subscribe((e){
        if (enemies.isEmpty()) return;
        
        if (e.charCode == enemies.first().text.charCodeAt(0)){
         
         Element enemy = enemies.removeFirst();
         killEnemy(enemy);
         remainingEnemies.text = (enemiesThisLevel - ++killed).toString();
         
         if (enemies.isEmpty() && allEnemiesLaunched){
           nextLevel();
         }
        }
      });
      
      // Generate enemies for this Level.
      generator = Observable
                  .randomInt(0, 25, intervalLow:config[LAUNCH_RATE], intervalHigh:config[LAUNCH_RATE], howMany: enemiesThisLevel)
                  .apply((v) => Math.random() < .5 ? lookup[v - 1] : lookup[v - 1].toUpperCase())
                  .subscribe((v) => launchNewEnemy(v), () => allEnemiesLaunched = true);
    });
    

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
    .timer(5000, 1)
    .subscribe((_) => playLevel());
  }
  
  void youWin(){
    
  }
  
  void youLose(){
    //return if late to the party
    if (gameState == GameState.Stopped) return;
    
    gameState = GameState.Stopped;
    gameloop.dispose();
    generator.dispose();
    
    
    enemies.forEach((enemy) {
      if (enemy != enemies.first()){
        enemy.text = ":P";
        enemy.classes.add("rotate");
        enemy.style.fontSize = 72;
      }
    });
    
    showMessage("You Lose Earthling.  Prepare to be alphabetized!");
    
    Observable
    .timer(5000, 1)
    .subscribe((_) => resetGame());
  }
  
  
  void killEnemy(Element enemy){    
    enemy.style.color = "Red";
    enemy.text = "@";
    enemy.style.fontSize = 48;
    int v = getTopValue(enemy);
    
    addToScore((playfieldDimensions.bounding.height - v) * currentLevel);   
    
    Observable
      .timer(750, 1)
      .subscribe((_) => enemy.remove());
  }
  
  void updatePlayfield(){
    num factor = playfieldheight / 200;
    
    Observable
        .fromList(enemies.dynamic)
        .subscribe((Element enemy){
          int newPos = (getTopValue(enemy) + factor);
          enemy.style.top = newPos;
          
          if (newPos >= playfieldheight + 44) youLose();
          
        });
  }
  
  
  int getTopValue(Element e) => Math.parseInt(e.style.top.toString().replaceAll('px',''));
  
  void launchNewEnemy(String v){
    int r = (Math.random() * 100 + 155).toInt();
    int g = (Math.random() * 100 + 155).toInt();
    int b = (Math.random() * 100 + 155).toInt();
    Element l = new Element.tag("div");
    l.classes.add('enemy');
    l.style.color = 'rgb($r,$g,$b)';
    l.text = v;
    l.style.top = playfieldDimensions.bounding.top;
    l.style.left = Math.random() * (playfieldDimensions.client.width - 25);

    enemies.add(l);
    
    playfield.elements.add(l);
  }
  
  void addToScore(int amount){
    int newScore = (Math.parseInt(score.text) + amount);
    score.text = newScore.toString();
    
    if (newScore > Math.parseInt(highScore.text)){
      highScore.text = newScore.toString();
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
  
  
  void updatePlayfieldHeight() => playfield.rect.then((ElementRect r) 
                                                          {
                                                            playfieldDimensions = r;
                                                            playfieldheight = r.client.top + r.client.height;    
                                                          });
  
  void clearPlayfield() {
    enemies.forEach((e) => e.remove());
    enemies.clear();
  }
  
  void showMessage(String msg){
    if (msg.length == 0) {
      message.text = "";
      return;
    }
    
    modalBox.style.opacity = "1";
    int i = 1;
        
    Observable
    .timer(30, msg.length)
    .subscribe((v) {
      message.text = msg.substring(0, i++);
    
    });

  }
  
  void hideMessage(){
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
  new zipdemo().run();
}
