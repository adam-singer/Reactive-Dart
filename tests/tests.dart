#library('reactive_tests');

//#import('dart:html');
#import('../lib/reactive_lib.dart');
#import('../../../src/dart/client/testing/unittest/unittest_html.dart');


/*
* 
* Unit Tests for Reactive Dart library
*
*
* Aside from some lower level tests, most of these follow a pattern
* for each Observable type:
* * Check the original implementation
* * Check the chained implementation (if chainable)
* * Check the continuation parameter (if has one)
* * Check the implementation logic
*/

main(){

  fromListGetsAllElements();
  nullCountIsZero();
  countEqualsExpected();
  timer();  
}


/// Validates that Observable.fromList emits the correct elements and correct total of elements.
fromListGetsAllElements() => asyncTest('Observable.fromList() Emits all elements', 5, (){
  var i = 1;
  Observable
  .fromList([1,2,3,4,5])
  .subscribe((n) {
    Expect.equals(i++, n);
    callbackDone();
  });
});

/// Checks if a sequence of null returns a count of 0 from Observable.count.
nullCountIsZero() => asyncTest('Observable.count() Null count is 0', 1, (){
  Observable
  .fromList([])
  .count()
  .subscribe((total){
    Expect.equals(0, total);
    callbackDone();
    });
  
});

/// Checks if a sequence of elements returns the correct total via Observable.count.
countEqualsExpected() => asyncTest('Observable.count() Count equals expected', 1, (){
  Observable
  .fromList([1,2,3,4,5])
  .count()
  .subscribe((total){
    Expect.equals(5, total);
    callbackDone();
    });
});

//TODO: write test that verifies intervals are correct.
/// Validates that Observable.timer emits the correct number of ticks.
timer() => asyncTest('Observable.timer() validate tick count', 1, (){
  Observable
    .timer(300, 5)
    .count()
    .subscribe((total){
      Expect.equals(5, total);
      callbackDone();
      });
});