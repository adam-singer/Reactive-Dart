#import('dart:html');
#import('../../lib/reactive_lib.dart');

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
    .randomInt(0, 100, 1, 1000, 5)
    .apply((v) => 'Observable 1: $v');

    var o2 = Observable
    .randomInt(0, 100, 1, 1000, 20)
    .apply((v) => 'Observable 2: $v');
    
    var o3 = Observable
    .randomInt(0, 100, 1, 1000, 20)
    .apply((v) => 'Observable 3: $v');
    
    o1
    .merge([o2, o3])
    .subscribe((v) => print('$v'), ()=> print('All streams terminated.'));
    
  }
}

void main() {
  new observablemerge().run();
}
