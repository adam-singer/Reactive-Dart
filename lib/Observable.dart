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
 static create(f(IObserver o)) => new _SharedSequenceObservable(f);

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

