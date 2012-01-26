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
/// Open browser console to see results.

#import('dart:html');
#import('../lib/reactive_lib.dart');

class reactivedemo {

  static num mc = 0;
  
  reactivedemo();

  void run() {
    var button = document.query("#btnClickDemo");
    var status = document.query("#status");
    var buttonStatus = document.query("#btnStatus");
    
    var testlist = [1,2,3,4,5,6,7,8,9,10];
    
    var counter = 0;
    //Timer
    Observable
    .timer(1000, 20)
    .subscribe((t) => status.text = ++counter,
      () => status.text = "Complete.");    
    
    
    //Lets count mouse clicks...   
    header("Observable.fromDOMEvent() Click the buttons to see observable event sequence.");    
    Observable
      .fromDOMEvent(button.on.click)
      .count()
      .subscribe((c) => buttonStatus.text = "$c clicks have occurred.");
    
    
    // counting
    header("Observable.count() Simple counting of a sequence (10)");   
    Observable
      .fromList(testlist)
      .count()
      .subscribe((i)=> print(i));
    
    // false until contains
    header("Observable.contains() Returns false until contained value is found or sequence terminates.");
    Observable
      .fromList(testlist)
      .contains(5)
      .subscribe((b)=> print(b));
    
    // counting contains count iteration
    header("Here we are using Observable.count() tells us the number of attempts that Observable.contains() makes before returning true.");
    Observable
      .fromList(testlist)
      .contains(5)
      .count()
      .subscribe((c)=> print(c));
    
    // concat 3 observable sequences into a single sequence
    header("Observable.concat() Concatenates observable sequences into one sequence.  Here we have 3 ([1,2,3], [4,5,6], [7,8,9])");
    Observable
      .fromList([1,2,3])
      .concat([Observable.fromList([4,5,6]), Observable.fromList([7,8,9])]) //concat our list sequence with two more sequences
      .subscribe((v) => print(v));
    
    header("Folding (aggregating really) over a sequence.");
    Observable
      .fromList(testlist)
      .fold((v, n) => v + n, 0)
      .subscribe((v) => print(v));
    
    header("Observable.any() Returns true if there are any values in the sequence, false otherwise.");
    Observable
      .fromList(testlist)
      .any()
      .subscribe((v)=> print('Should be true: $v.'));
    
    Observable
      .empty()
      .any()
      .subscribe((v) => print('Should be false: $v.'));
    
    header("Observable.buffer() Returns sequences as a series of buffered lists, based on buffer size provided.");
    Observable
      .fromList(testlist)
      .buffer(2)
      .subscribe((v)=> print("Received buffered list of size ${v.length} with elements: ${v[0]}, ${v[1]}."));
    
    header("Observable.distinct() Returns elements in the sequence that are distinct with respect to other elements.");
    Observable
      .fromList(testlist)
      .concat([Observable.fromList(testlist), Observable.fromList(testlist)]) //add a few copies of the same elements
      .distinct()
      .subscribe((v) => print(v));
    
    header("Observable.delay() Shifts the sequence by a given time in milliseconds.");
    print("... delay started (3 seconds)");
    Observable
      .fromList(testlist)
      .delay(3000)
      .subscribe((v) => print(v), () => print("...delay finished"));
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
