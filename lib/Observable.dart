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


/**
* Observable<T> is a helper class for the reactive model.  It is recommended
* to use this class, rather than trying to implement [IObservable<T>] directly.
*
* Observable.create is a catch-all helper for creating observable
* implementations on the fly, and does much of the heavy lifting required
* to implement [IObservable<T>].
*/
class Observable
{
 
 /// Creates an observable with the given function as the primary observer behavior.
 static create(f(IObserver o)) => new _factoryObservable(f);

 static ChainableIObservable<Event> fromDOMEvent(EventListenerList event){
   return Observable.create((IObserver o) => event.add((e) => o.next(e)));
 }
  
 /// Returns a sequence that terminates immediately with an exception.
 static IObservable throwE(Exception e) => Observable.create((IObserver o) => o.error(e)); 
 
 /// Returns running total of items in a sequence.
 static ChainableIObservable count(IObservable source){
   int count = 0;
   return Observable.create((IObserver o) => source.subscribe((_)=> o.next(++count), ()=> o.complete(), (e)=> o.error(e)));
 }
 
 /// Applies a given function to each element of the sequence
 static ChainableIObservable apply(IObservable source, applyFunction(n)){
   return Observable.create((IObserver o){
     source.subscribe(
       (v) => applyFunction(v),
       () => o.complete(),
       (e) => o.error(e)
       );
   });
 }
 
 /// Returns the distinct elements from the list until the first repeating element is found.
 static ChainableIObservable distinctUntilNot(IObservable source){
   Set s = new Set();
   
   return Observable.create((IObserver o){
     source.subscribe(
       (v){
         if (!s.contains(v)){
           s.add(v);
           o.next(v);
         }else{
           o.complete();
         }
       },
       () => o.complete(),
       (e) => o.error(e)
       );
   });
 }
 
 /// Returns the distinct elements from a given [IObservable] sequence.
 static ChainableIObservable distinct(IObservable source){
   Set s = new Set();
   
   return Observable.create((IObserver o){
     source.subscribe(
       (v){
         if (!s.contains(v)){
           s.add(v);
           o.next(v);
         }
       },
       () => o.complete(),
       (e) => o.error(e)
       );
   });
 }
 
 /// Delays (shifts in time) the sequence.
 static ChainableIObservable delay(IObservable source, int milliseconds){
   List buffer = new List();
   bool delaying = true;
   
   var t = Observable
    .timer(milliseconds, 1);
   
   t.subscribe((v) =>{}, () => delaying = false);
   
   
   return Observable.create((IObserver o){
     source.subscribe(
     (v){
       if (!delaying){
         if (!buffer.isEmpty()){
           buffer.forEach((b) => o.next(b));
           buffer.clear();
         }else{
           o.next(v);           
         }
       }else{
         buffer.add(v);
       }
     },
     (){
        t.subscribe((v)=>{},(){
          if (!buffer.isEmpty()){
            buffer.forEach((b) => o.next(b));
            buffer.clear();
          }
          o.complete();
        });
     },
     (e) => o.error(e)
     );
   });
 }
 
 static ChainableIObservable contains(IObservable source, value){
   return Observable.create((IObserver o) {
     source.subscribe((v){
       if (v != value){
         o.next(false);
       }
       else{
        o.next(true);
        o.complete();
       }
     });
   });
 }
 
 static ChainableIObservable empty() => Observable.create((IObserver o) => o.complete());
 
 /// Performs a left fold operation over a sequence.
 ///
 /// This is really more like an aggregation or a "scan" from functional list
 /// operations, where you get each intermediate value of the sequence as it
 /// is folded in with the accumulator and function.
 static ChainableIObservable fold(IObservable source, f(v, n), startingValue){
   var acc = startingValue;
   return Observable.create((IObserver o){
     source.subscribe(
       (v){
         acc = f(acc, v);
         o.next(acc);
       },
       () => o.complete(),
       (e) => o.error(e)
       );
   });
 }
 
 /// Returns true if the given sequence produces a value.
 /// If the sequences terminates without producing a value, returns false.
 static ChainableIObservable any(IObservable source){
   return Observable.create((IObserver o){
     source.subscribe(
       (v)
       {
         o.next(true);
         o.complete();
       },
       (){
         o.next(false);
         o.complete();
       },
       (e) => o.error(e)
       );
   });
 }
 
 //TODO Add buffering options with time/timeout constraints
 /// Buffers the sequence into non-overlapping lists based on a given size (default 10)
 static ChainableIObservable buffer(IObservable source, [int size = 10]){
   List buffer = new List();
   return Observable.create((IObserver o)
   {source.subscribe(
     (v) {
       buffer.add(v);
       if (buffer.length == size){
         o.next(buffer);
         buffer.clear();
       }
     },
     (){
       if (!buffer.isEmpty()){
         o.next(buffer);
         buffer.clear();
       }
       o.complete();
     },
     (e) => o.error(e)
     );
   });
 }
 
 
 /// Returns an concatentated sequence of a list of IObservables.
 static ChainableIObservable concat(List<IObservable> oList){
   
   if (oList == null || oList.isEmpty()) return Observable.empty();
  
   return Observable.create((IObserver o){
     _concatInternal(o, oList, 0);
   });
 }
 
 static void _concatInternal(IObserver o, List<IObservable> oList, int index){

   oList[index]
    .subscribe(
      (v) => o.next(v),
      (){
        if (++index < oList.length){
          _concatInternal(o, oList, index);
        }else{
          o.complete();
        }
      },
      (e) => o.error(e)
    );
 }
 
 /// Returns an observable sequence from a given [List]
 static ChainableIObservable fromList(List l){
   if (l == null) return Observable.throwE(const NullPointerException());
   
   return Observable.create((IObserver o){
     l.forEach((el) => o.next(el));
     o.complete();
   });
 }
 
 /// Returns a sequence of ticks at a given interval in milliseconds.
 ///
 /// The sequence can be made self-terminating by setting the optional [ticks]
 /// parameter to a positive integer value.
 static ChainableIObservable timer(int milliseconds, [int ticks = -1]){
   
   if (milliseconds < 1) return Observable.throwE(const Exception("Invalid milliseconds value."));
   
   return Observable.create((IObserver o){
     if (ticks <= 0){
       window.setInterval(() => o.next(null), milliseconds);
     }else{
       var handler;
       var tickCount = 0;
       handler = window.setInterval((){
         if (++tickCount >= ticks){
           window.clearInterval(handler);
           o.complete();
           return;
         }
         o.next(tickCount);
       }, milliseconds);
     }
   });
 }
}



//
//
// INTERNALS
//
//


//
// Instantiates a general purpose IObservable with chaining helper methods.
//
class _factoryObservable<T> implements ChainableIObservable<T>, IDisposable{
  Function oFunc;
  IObserver<T> mainObserver;
  final List<IObserver<T>> observers;
  Exception err;
    
  _factoryObservable(this.oFunc) 
  : observers = new List<IObserver<T>>()
  {
    mainObserver = new _factoryObserver(
      (n) =>  observers.forEach((o) => o.next(n)),
      () {
        observers.forEach((o) => o.complete());
        this.dispose();  
      },
      (e){
        err = e;
        observers.forEach((o) => o.error(e));
        this.dispose();
        }
      );
  }
  
  IDisposable subscribe(next, [complete(), error(Exception e)]){
    if (err != null){
      //sequence faulted, so return an exception result immediately
      if (error != null) error(err);
      return;
    }
    
    if (mainObserver == null){
      //this sequence is terminated so just return complete immediately
      if (complete != null) complete();
    }
    
    if (next is Function){
      //create a wrapper observer
      var o = new _factoryObserver(next, complete, error);
      _addObserver(o);
    }
    else if (next is IObserver<T>)
    {
      _addObserver(next);
    }else{
      throw new Exception("Parameter 'next' must be a Function or a IObserver.");
    }
  }
  
  IDisposable _addObserver(IObserver o){
    observers.add(o);
    
    // don't initiate the main observer on the sequence until the
    // first observer arrives.
    if (observers.length == 1) oFunc(mainObserver);
    return new _Unsubscriber(this, o);
  }
  
  void dispose(){
    // TODO remove all subscribers
    observers.clear();
    mainObserver = null;
    oFunc = null;
  }
  
  //*********************************
  //instance wrappers to the Observable statics, to support chaining of certain observables.
  //************************************
  count() => Observable.count(this);
  
  contains(value) => Observable.contains(this, value);
  
  concat(List list)
  {
    list.insertRange(0, 1, this);
    return Observable.concat(list);
  }
  
  fold(f(v,n), startingValue) => Observable.fold(this, f, startingValue);
  
  any() => Observable.any(this);
  
  buffer([size = 10]) => Observable.buffer(this, size);
  
  delay(int milliseconds) => Observable.delay(this, milliseconds);
  
  distinct() => Observable.distinct(this);
  
  distinctUntilNot() => Observable.distinctUntilNot(this);
  
  apply(applyFunction(n)) => Observable.apply(this, applyFunction);
}


//
// wraps an observer so it can dispose of itself from it's observable context
//
class _Unsubscriber implements IDisposable{
  final _factoryObservable factoryObservableReference;
  final IObserver observer;
  
  _Unsubscriber(this.factoryObservableReference, this.observer);
  
  void dispose(){
    if (factoryObservableReference.observers.indexOf(observer) != -1)
      factoryObservableReference.observers.removeRange(factoryObservableReference.observers.indexOf(observer), 1);
  }
}


//
// Instantiates a general-purpose observer.
//
class _factoryObserver<T> implements IObserver<T>
{
  Function nextFunc, completeFunc, errorFunc;
  
  void next(T value) => nextFunc(value);
  void error(Exception error) => errorFunc(error);
  void complete() => completeFunc(); 
  
  _factoryObserver(next, [complete(), error(Exception e)])
  : _assignedHash = _hashNum++
  {
    nextFunc = next;
    completeFunc = complete == null ? (){} : complete;
    errorFunc = error == null ? (_){} : error;
  }
  
  static int _hashNum = 0;
  final int _assignedHash;
}
