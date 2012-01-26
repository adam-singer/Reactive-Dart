#import('dart:html');
#import('../../lib/reactive_lib.dart');

/**
*
* A short demo to illustrate how Observable.throttle() works.
*
* In this demo, we are simulating a search query, where we only want to
* perform a 'round-trip' to the server when the user has paused their input
* for a given period of time (in this case, 400ms).
*
* Observable.throttle makes this trivial and declarative.
*
*/

class throttle_demo {
  Element resultsList;
  final awords = const ['a','apple','arch','able','apparently','about','awkward','always','are','around','any','anyway','allow','allowance','allowable'];
  
  throttle_demo() {
    resultsList = document.query("#searchresults");
  }

  void run() {
    Element tbInput = document.query("#tbInput");
    
    // Here we are building an observable chain, starting from the raw DOM keyUp events
    // and then passing through throttle, which only fires when the given time span
    // is reached without any elements being received from the previous 
    // observable sequence (the event stream, in this case).    
    Observable
    .fromDOMEvent(tbInput.on.keyUp)
    .throttle(400)
    .subscribe((e) => displayResults(tbInput.value));
    
  }

  void displayResults(String beginsWith){
    StringBuffer s = new StringBuffer();
    
    //open the browser console to see what throttle is emitting.
    print('$beginsWith');
    
    if (beginsWith.isEmpty()){
      resultsList.innerHTML = "<li></li>";
      return;
    }
    
    Observable
    .fromList(awords)
    .where((String w) => w.startsWith(beginsWith))
    .subscribe(
      (String word) => s.add('<li>$word</li>'), // .next(v) function
      ()=> resultsList.innerHTML = s.toString() // .complete() function
      );

  }  
}

void main() {
  new throttle_demo().run();
}
