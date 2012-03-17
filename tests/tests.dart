#import('dart:html');
#import('../lib/reactive_lib.dart');

// NOTE: You will need to point the path below to wherever your 
// location of the Dart source code is located.
#import('../../../src/dart/client/testing/unittest/unittest_html.dart');



/*
 * Unit Tests for Reactive Dart library
*/

var tlist5 = const [1, 2, 3, 4, 5];

var tListStrings = const ['apple', 'pear', 'orange', 'grape', 'strawberry'];

main(){  
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
    sample();
    randomInt();
    random();
    fromXMLHttpRequest();
    takeWhile();
    take();
    first();
    returnValue();
    range();
    unfold();
    throttle();
    timeout();
    timestamp();
    toList();
    fromEvent();
    throwE();
    count();
    
    fromListGetsAllElements();

    timer();  
  });

}

count(){
  nullCountIsZero();
  countEqualsExpected();
}

throwE() => asyncTest('.throwE()', 1, (){
  
  Observable
  .throwE(new Exception('hello world.'))
  .subscribe(
    (v) => Expect.fail('should not emit value'),
    () => Expect.fail('should not terminate'),
    (e){
      Expect.isTrue(e is Exception);
      Expect.equals('Exception: hello world.', e.toString());
      callbackDone();
    });
});

fromEvent() => asyncTest('.fromEvent()', 1, (){
  
  Element element = document.query('#status');
  
  Expect.isNotNull(element);
  
  Observable
  .fromEvent(element.on.click)
  .subscribe((v){
    Expect.isTrue(v is Event);
    callbackDone();
  });
  
  //fire an event
  element.on.click.dispatch(new Event('click'));
});

toList() => asyncTest('.toList()', 1, (){
  
  Observable
  .randomInt(1, 10, howMany:5)
  .toList()
  .subscribe((v){
    Expect.isTrue(v is List);
    Expect.equals(5, v.length);
    callbackDone();
  });
});

timestamp() => asyncTest('.timestamp()', 1, (){
  
  Observable
  .returnValue(10)
  .timestamp()
  .subscribe((v){
    Expect.isTrue(v is Date);
    callbackDone();
  });
});

timeout() => asyncTest('.timeout()', 2, (){
  
  Observable
    .fromList(tlist5)
    .pace(100)
    .timeout(50)
    .subscribe(
      (v) => callbackDone(),
      () => Expect.fail('Should never terminate.'),
      (e) { 
        Expect.isTrue(e is ObservableException);
        callbackDone();
      }
      );
  
});

throttle() => asyncTest('.throttle()', 2, (){
  
  //should emit no values
  Observable
    .fromList(tlist5)
    .throttle(100)
    .subscribe((v){
      Expect.fail('throttle failed.');
    },(){
      callbackDone();
    });
  
  //should emit 5 values
  Observable
    .fromList(tlist5)
    .pace(20)
    .throttle(10)
    .count()
    .subscribe((v){
      Expect.equals(5, v);
      callbackDone();
    });
  
});

unfold() => asyncTest('.unfold()', 10, (){
  int i = 1;
  
  //unfold from 1 to 10
  Observable
  .unfold(1, (v) => v <= 10, (v) => v += 1, (v) => v)
  .subscribe((v){
    Expect.equals(i++, v);
    callbackDone();
  });
});


range(){
  asyncTest('.range() Low To High', 5, (){
    int i = 1;
    
    Observable
    .range(1, 10, step:2)
    .subscribe((v){
      Expect.equals(i++, v);
      i++;
      callbackDone();
    });
  });
  
  asyncTest('.range() High To Low', 5, (){
    int i = 10;
    
    Observable
    .range(10, 1, step:2)
    .subscribe((v){
      Expect.equals(i--, v);
      i--;
      callbackDone();
    });
  });
  
}


returnValue() => asyncTest('.returnValue()', 1, (){
  
  Observable
  .returnValue("hello")
  .subscribe((v){
    Expect.equals("hello", v);
    callbackDone();
  });
});


first() => asyncTest('.first()', 2, (){
  var gotValue = false;
  
  Observable
  .fromList(tlist5)
  .first()
  .subscribe((v){
    Expect.isFalse(gotValue);
    gotValue = true;
    Expect.equals(1, v);
    callbackDone();
  });
  
  callbackDone();
});


take() => asyncTest('.take()', 4, (){

  var i = 1;
  
  Observable
    .fromList(tlist5)
    .take(4)
    .subscribe((v){
      Expect.equals(i++, v);
      callbackDone();
    });
});

takeWhile() => asyncTest('.takeWhile()', 1, (){
  
  Observable
    .fromList(tlist5)
    .takeWhile((v) => v < 3)
    .count()
    .subscribe((v){
      Expect.equals(2, v);
      callbackDone();
    });
});

fromXMLHttpRequest() => asyncTest('.fromXMLHttpRequest()', 1, (){
  var uri = 'tests.html'; //this should work if running locally...
  var testFileLength = 387; // the length of test.html if unmodified.
  
  Observable
    .fromXMLHttpRequest(uri, 'Accept', 'text/plain')
    .single() //using single to enforce no additional values other than the data we requested...
    .subscribe(
      (v){
        Expect.isTrue(v is String);
        Expect.equals(testFileLength, v.length);  //the length of unmodified test.html
        callbackDone();
      }, 
      (){}, 
      (e) {
        Expect.fail("exception thrown $e");
        callbackDone();
      });
});

random() => asyncTest('.random()', 1, (){
  
  //TODO test for invalid ranges
  //TODO test random intervals
  
  Observable
  .random(1, 10, howMany:10)
  .apply((v){
    Expect.isTrue(v is num);  // all values should be num
    return v;
  })
  .count()
  .subscribe((v){
    Expect.equals(10, v); //should produce 10 values
    callbackDone();
  });
});

randomInt() => asyncTest('.randomInt()', 1, (){
  
  //TODO test for invalid ranges
  //TODO test random intervals
  
  Observable
  .randomInt(1, 10, howMany:10)
  .apply((v){
    Expect.isTrue(v is int);  // all values should be integers
    return v;
  })
  .count()
  .subscribe((v){
    Expect.equals(10, v); //should produce 10 values
    callbackDone();
  });
});

sample() => asyncTest('.sample()', 1, (){
  
  Observable
    .fromList(tlist5)
    .sample(2) //sample rate of 2 from the list should yield 2 results
    .count()
    .subscribe((n) {
      Expect.equals(2, n);
      callbackDone();
    });
});

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