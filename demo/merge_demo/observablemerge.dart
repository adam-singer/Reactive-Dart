#import('dart:html');
#import('../../reactive_client.dart');

class observablemerge {

  observablemerge() {
  }

  // Observable.randomInt()
  // Observable.apply()
  // Observable.merge()
  
  // 1|--1--------1------1------#
  //  |  |        |      |      |
  // 2|----2---2------#  |      |
  //  |  | |   |  |      |      |
  // S|--1-2---2--1------1------#
  
  // Video about this demo: http://youtu.be/EwKWaZdPoGY
  
  void run() {
  
    var o1 = Observable
    .randomInt(0, 100, intervalLow:1, intervalHigh:1000, howMany:20)
    .apply((v) => 'Observable 1: $v');

    var o2 = Observable
    .randomInt(0, 100, intervalLow:1, intervalHigh:1000, howMany:20)
    .apply((v) => 'Observable 2: $v');
    
    var o3 = Observable
    .randomInt(0, 100, intervalLow:1, intervalHigh:1000, howMany:20)
    .apply((v) => 'Observable 3: $v');
    
    o1
    .merge([o2, o3])
    .observe((v) => print('$v'), ()=> print('All streams terminated.'));
    
  }
}

void main() {
  new observablemerge().run();
}
