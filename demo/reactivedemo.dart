//   Copyright (c) 2012, John Evans
//
//   John: https://plus.google.com/u/0/115427174005651655317/about
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.


/// ## About this Demo
///
/// Demonstrates various Observable operations on sequences.
///
/// Build with frogc.  Open browser console to see results.

#import('dart:html');
#import('../lib/reactive_lib.dart');
#source('DemoIsolate.dart');

class reactivedemo {

  static num mc = 0;
  var testlist = const [1,2,3,4,5,6,7,8,9,10];
  
  reactivedemo();

  void run() {
    
    /*
    **************************************************************************
    * Un-comment the demos that you wnat to see, rebuild, and run in browser *
    * with the browser console open.                                         *
    *                                                                        *
    * Builds with:                                                           *
    * frogc --out=reactivedemo.dart.app.js reactivedemo.dart                 *
    *                                                                        *
    * If in Dart Editor, press Alt-O to jump to any demo method.             *
    **************************************************************************
    */
    
    timer();
    fromEvent();
//    contains();
//    count();
//    concat();
//    fold();
//    any();
//    buffer();
//    distinct();
//    merge();
//    zip();
//    where();
//    toList();
//    timestamp();
//    apply();
//    timeout(); //adjust the timeout to see the exception throw.
//    throttle(); //Throttle has it's own demo, see '/demos/throttle_demo/throttle_demo.dart'
//    unfold();
//    range();
//    fromIsolate();
//    fromXMLHttpRequest();
//    take();  
//    takeWhile();
//    first();
//    single();
//    returnValue();
//    throwE();
  }
  
  throwE(){
    header("Observable.throwE() Propagates an given Exception.");
    
    Observable
    .throwE(const Exception('Here is an exception.'))
    .subscribe((e){}, (){}, (e)=> print('Error! $e'));
  }
  
  returnValue(){
    header("Observable.returnValue() Returns the given value as an observable sequence and then terminates.");
    
    Observable
    .returnValue(42)
    .subscribe((e)=> print('$e'));
  }
  
  single(){
    header("Observable.single() Returns the first element from a sequence and propogates an exception if any other elements are present.");
    
    Observable
    .range(1, 100)
    .single()
    .subscribe((e)=> print('$e'), (){}, (e) => print('Error! $e'));
  }
  
  first(){
    header("Observable.first() Returns the first element from the sequence and then terminates.");
    
    Observable
    .range(42, 100)
    .first()
    .subscribe((e)=> print('$e'));
  }
  
  takeWhile(){
    header("Observable.takeWhile() Returns the first n elements while the conditional function returns true.");
    
    Observable
    .range(1, 100)
    .takeWhile((n) => n < 6)
    .subscribe((e)=> print('$e'));
  }
  
  take(){
    header("Observable.take() Returns the first n elements from an observable sequence.");
    
    Observable
    .range(1, 100)
    .take(5)
    .subscribe((e)=> print('$e'));
    
  }
  
  fromXMLHttpRequest(){
    header("Observable.fromXMLHttpRequest() Performs a GET request and returns the results for the given request type, in an observable sequence (singleton)");
    
    var uri = 'reactivedemo.html'; //this should work if running locally...
    Observable
    .fromXMLHttpRequest(uri, 'Accept', 'text/plain')
    .single() //using single to enforce no additional values other than the data we requested...
    .subscribe((v)=>print('$v'), ()=> print('Request Complete.'), (e) => print ("Error! $e"));
  }
  
  
  void fromIsolate(){
    header("Observable.fromIsolate() Generates an observable sequence from an Isolate. Read the comments carefully before using this function.");
    
    Observable
      .fromIsolate(new DemoIsolate(), "")
      //we know DemoIsolate is sending in the form [n1, n2] so...
      .subscribe((n) => print('Message from Isolate: ${n[0]}, ${n[1]}'), () => print('Isolate terminated.'));
  }
  
  void range(){
    header("Observable.range() Generates an observable sequence from a given start/end with optional step");
    
    print('1 to 5 in .5 step');
    Observable
      .range(1, 5, .5)
      .subscribe((v) => print(v));
    
    print('5 to 1 in .5 step');
    Observable
      .range(5, 1, .5)
      .subscribe((v) => print(v));
  }
  
  void apply(){
    header("Observable.apply() Applies a given function to each element in the sequence and returns the result in a new observable sequence");
    
    Observable
      .fromList(testlist)
      .apply((n) => n * n)
      .subscribe((v) => print('squared: $v'));
  }
  
  void unfold(){
    header("Observable.unfold() Generates a sequences from intial state and provides elements until conditional is false");
    
    // lets count 1 to 10
    Observable
      .unfold(1, (n) => n <= 10, (n) => n + 1, (n) => n)
      .subscribe((v) => print(v));
  }
  
  void throttle(){
    print("Throttle has it's own demo, see '/demos/throttle_demo/throttle_demo.dart");
  }
  
  void timeout(){
    header("Observable.timeout().  Returns an exception if an element in a sequence is not delivered within a given time allotment.");
    
    print('These shouldn\'t time out');
    Observable
      .timer(500, 4)
      .timeout(501)  //adjust this lower than 500 to see the exception throw.
      .subscribe((t) => print('Tick: $t'), (){}, (e)=> print('error!'));
  }
  
  void timestamp(){
    header("Observable.timestamp() Returns a sequence of Date timestamps representing the arrival of each element in a given sequence.");
    
    Observable
      .timer(1300, 4)
      .timestamp()
      .subscribe((Date t) => print('Stamp: $t'),()=>print('Sequence Complete.'));
    
  }
  
  
  void toList(){
    header("Observable.toList() I a singleton sequence that returns all elements in a terminating sequence as a list.");
    
    // filters the sequence for even numbers and returns as a list
    Observable
      .fromList(testlist)
      .where((v) => v % 2 == 0)
      .toList()
      .subscribe((v) => print("List has ${v.length} elements.  First element is ${v[0]} and last is ${v.last()}"));
  }
  
  void where(){
    header("Observable.where() Returns a sequence of elements that satisfy the given boolean function.");
    
    // filters the sequence for even numbers
    Observable
      .fromList(testlist)
      .where((v) => v % 2 == 0)
      .subscribe((v) => print(v));
  }
  
  void zip(){
    header("Observable.zip() Returns the value of a function applied to pairs of two observable sequences.");
    
    // setups some timers that tick at different intervals
    var o1 = Observable.timer(100, 10);
    var o2 = Observable.timer(1500, 20);
    
    // zip should 'synchronize' the ticks and emit them as pairs.
    // only 10 pairs should yield from the sequence, because o1's
    // tick maximum is 10.
    o1
      .zip(o2, (l, r) => [l, r]) // just return the pair as a list of two.
      .subscribe((v) => print('These values should be the same: ${v[0]}, ${v[1]}'));
    
  }
    
  void contains(){
    // false until contains
    header("Observable.contains() Returns false until contained value is found or sequence terminates.");
    Observable
      .fromList(testlist)
      .contains(5)
      .subscribe((b)=> print(b));
  }
  
  void count(){
    // counting contains count iteration
    header("Here we are using Observable.count() tells us the number of attempts that Observable.contains() makes before returning true.");
    Observable
      .fromList(testlist)
      .contains(5)
      .count()
      .subscribe((c)=> print(c));
  }
  
  void concat(){
    // concat 3 observable sequences into a single sequence
    header("Observable.concat() Concatenates observable sequences into one sequence.  Here we have 3 ([1,2,3], [4,5,6], [7,8,9])");
    Observable
      .fromList([1,2,3])
      .concat([Observable.fromList([4,5,6]), Observable.fromList([7,8,9])]) //concat our list sequence with two more sequences
      .subscribe((v) => print(v));
  }
  
  void fold(){
    header("Folding (aggregating really) over a sequence.");
    Observable
      .fromList(testlist)
      .fold((v, n) => v + n, 0)
      .subscribe((v) => print(v));
  }
  
  void any(){
    header("Observable.any() Returns true if there are any values in the sequence, false otherwise.");
    Observable
      .fromList(testlist)
      .any()
      .subscribe((v)=> print('Should be true: $v.'));
    
    Observable
      .empty()
      .any()
      .subscribe((v) => print('Should be false: $v.'));
    
  }
  
  void buffer(){
    header("Observable.buffer() Returns sequences as a series of buffered lists, based on buffer size provided.");
    Observable
      .fromList(testlist)
      .buffer(2)
      .subscribe((v)=> print("Received buffered list of size ${v.length} with elements: ${v[0]}, ${v[1]}."));
  }
  

  void distinct(){
    header("Observable.distinct() Returns elements in the sequence that are distinct with respect to other elements.");
    Observable
      .fromList(testlist)
      .concat([Observable.fromList(testlist), Observable.fromList(testlist)]) //add a few copies of the same elements
      .distinct()
      .subscribe((v) => print(v));    
  }
  
  void merge(){
    header("Observable.merge() Takes n sequences and merges elements into a single stream.");
    
    var o1 = Observable.timer(100, 10).apply((v) => 'Timer 1, tick $v');
    var o2 = Observable.timer(200, 10).apply((v) => 'Timer 2, tick $v');
    var o3 = Observable.timer(300, 10).apply((v) => 'Timer 3, tick $v');
    
    o1.merge([o2, o3]) //merges o1 with o2 and o3...
      .subscribe((v) => print(v));
  }
  
  void timer(){
    var status = document.query("#status");
    var counter = 0;
    
    //Timer
    Observable
    .timer(1000, 20)
    .subscribe((t) => status.text = ++counter,
      () => status.text = "Complete.");    
  }
  
  void fromEvent(){
    var button = document.query("#btnClickDemo");
    var buttonStatus = document.query("#btnStatus");
    
    //Lets count mouse clicks...   
    Observable
      .fromEvent(button.on.click)
      .count()
      .subscribe((c) => buttonStatus.text = "$c clicks have occurred.");
  }
  
  
  
  void header(String msg){
    print("");
    print(msg);
    print("----------------------------------------------------------------------");
  }

}



void main() {
  new reactivedemo().run();
}
