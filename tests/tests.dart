#library('reactive_tests');

#import('dart:html');
#import('../lib/reactive_lib.dart');
#import('../../../src/dart/client/testing/unittest/unittest_html.dart');


/*
 * Unit Tests for Reactive Dart library
*/

var tlist5 = const [1, 2, 3, 4, 5];

var tListStrings = const ['apple', 'pear', 'orange', 'grape', 'strawberry'];

main(){

  group("Test Setup ::: ", (){
    test('tlist5 is Valid', (){
      Expect.equals(5, tlist5.length);
      Expect.equals('apple', tListStrings[0]);
      Expect.equals('pear', tListStrings[1]);
      Expect.equals('orange', tListStrings[2]);
      Expect.equals('grape', tListStrings[3]);
      Expect.equals('strawberry', tListStrings[4]);
    });
    
    test('tListStrings is Valid', (){
      Expect.equals(5, tListStrings.length);
      for (var i = 1; i < 6; i++){
        Expect.equals(i, tlist5[i - 1]);
      }
    });
  });
  
  group("Initializers ::: ", (){
    usingNew();
    usingCreate();
  });
  
  group("Operators ::: ", (){
    fromFuture();
    pace();
    skipWhile();
    skip();
    firstOf();
    
    fromListGetsAllElements();
    nullCountIsZero();
    countEqualsExpected();
    timer();  
  });

}

firstOf() => asyncTest('.firstOf()', 10, (){
  
  var o1 = Observable.fromList(tlist5);
  var o2 = Observable.fromList(tListStrings);
  
  // o1 should emit first since it is first in the list.
  Observable
    .firstOf([o1, o2])
    .subscribe((n) {
      Expect.isTrue(n is num);
      callbackDone();
    });
  
  o1 = Observable.fromList(tlist5);
  o2 = Observable.fromList(tListStrings);
  
  // o2 should emit first since o1 is delayed.
  Observable
    .firstOf([o1.delay(50), o2])
    .subscribe((n) {
      Expect.isTrue(n is String);
      callbackDone();
    });
  
});

skip() => asyncTest('.skip()', 1, (){
  
  Observable
    .fromList(tlist5)
    .skip(2) // removes the first two elements from the list
    .count()
    .subscribe((n){
      Expect.equals(3, n);
      callbackDone();
    });
  
});

skipWhile() => asyncTest('.skipWhile()', 1, (){
  
  Observable
    .fromList(tlist5)
    .skipWhile((v) => v < 3) // removes the first two elements from the list that are < 3
    .count()
    .subscribe((n){
      Expect.equals(3, n);
      callbackDone();
    });
  
});

pace() => asyncTest('.pace()', 1, (){
  
  var sw = new Stopwatch.start();
  var interval = 30;
  
  Observable
    .fromList(tlist5)
    .pace(interval)
    .subscribe((_){}, (){
      sw.stop();
      Expect.isTrue(sw.elapsedInMs() > (tlist5.length - 1) * interval);
      sw.reset();
      callbackDone();
    });
  
});

fromFuture() => asyncTest('.fromFuture()', 2, (){
  Element e = document.query('#status');
  Expect.isNotNull(e);
  
  //get a future
  Future f = e.rect;
  
  Observable
    .fromFuture(f)
    .subscribe((v){
      Expect.isTrue(v is ElementRect);
      callbackDone();
    });
  
  callbackDone();
});

usingCreate() => asyncTest('Observable.create() creates and returns correct object', 1, (){
  var obs = Observable.create((IObserver o){
    o.next(5);
    o.complete();
  });
  
  Expect.isTrue(obs is IObservable);
  Expect.isTrue(obs is ChainableIObservable);
  
  obs.subscribe((v){
    Expect.equals(5, v);
    callbackDone();
  });
});

usingNew() => asyncTest('new Observable() creates and returns correct object', 1, (){
  var obs = new Observable((IObserver o){
    o.next(5);
    o.complete();
  });
  
  Expect.isTrue(obs is IObservable);
  Expect.isTrue(obs is ChainableIObservable);
  
  obs.subscribe((v){
    Expect.equals(5, v);
    callbackDone();
  });
});

/// Validates that Observable.fromList emits the correct elements and correct total of elements.
fromListGetsAllElements() => asyncTest('.fromList() Emits all elements', 5, (){
  var i = 1;
  Observable
    .fromList(tlist5)
    .subscribe((n) {
      Expect.equals(i++, n);
      callbackDone();
    });
});

/// Checks if a sequence of null returns a count of 0 from Observable.count.
nullCountIsZero() => asyncTest('.count() Null count is 0', 1, (){
  Observable
    .fromList([])
    .count()
    .subscribe((total){
      Expect.equals(0, total);
      callbackDone();
      });
  
});

/// Checks if a sequence of elements returns the correct total via Observable.count.
countEqualsExpected() => asyncTest('.count() Count equals expected', 1, (){
  Observable
    .fromList(tlist5)
    .count()
    .subscribe((total){
      Expect.equals(5, total);
      callbackDone();
      });
});

//TODO: write test that verifies intervals are correct.
/// Validates that Observable.timer emits the correct number of ticks.
timer() => asyncTest('.timer() validate tick count', 1, (){
  Observable
    .timer(300, 5)
    .count()
    .subscribe((total){
      Expect.equals(5, total);
      callbackDone();
      });
});