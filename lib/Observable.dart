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
 // Support factory implementation if the dev wants to use 'new Observable(...)'
 factory Observable(f(IObserver o)) => Observable.create(f);
 
 /// Creates an IObservable with the given implementation function.
 static create(f(IObserver o)) => new ChainableIObservable(f);
 

 /// Provides an observable sequence of random integers in the 
 /// given low(exclusive)/high(inclusive) range at (default) 1ms intervals.
 ///
 /// Intervals can also be randomized by providing optional intervalLow/intervalHigh values.
 ///
 /// This observable generator is a more specific implementation of [Observable.random()].
 static ChainableIObservable randomInt(int low, int high, [int intervalLow = 1, int intervalHigh = 1, int howMany]){     
   return Observable.create((IObserver o){
      Observable
        .random(low, high, intervalLow, intervalHigh, howMany)
        .apply((v) => v.ceil())
        .subscribe(
          (v) => o.next(v),
          () => o.complete(),
          (e) => o.error(e)
        );
   });
   
 }
 
 /// Provides an observable sequence of random numbers
 /// in the given low(inclusive)/high(exclusive) range at (default) 1ms intervals.
 ///
 /// Intervals can also be randomized by providing optional intervalLow/intervalHigh values.
 static ChainableIObservable random(num low, num high, [int intervalLow = 1, int intervalHigh = 1, int howMany]){
   if (high <= low) return Observable.throwE(const Exception('Parameter "high" must be > parameter "low"'));
   if (intervalHigh < intervalLow) return Observable.throwE(const Exception('Parameter "intervalHigh" must be > parameter "intervalLow"'));
   if (intervalLow < 1 || intervalHigh < 1) return Observable.throwE(const Exception('timer interval parameters must be >= 1'));
   
   num delta = high - low;
   num intervalDelta = intervalHigh - intervalLow;
   num ticks = 0;
   
   Function iFunc = (intervalDelta == 0) 
                    ? () => intervalLow 
                    : () => (Math.random() * intervalDelta) + intervalLow;
   
   return Observable.create((IObserver o){
           void nextNum(){
             o.next((Math.random() * delta) + low);
             
             if (howMany == null){
               window.setTimeout(nextNum, iFunc());
             }else if (howMany != null && ++ticks <= howMany){
               window.setTimeout(nextNum, iFunc());
             }else{
               o.complete();
             }    
           }
          
           if (howMany == null){
             window.setTimeout(nextNum, iFunc());
           }else if (howMany != null && ++ticks <= howMany){
             window.setTimeout(nextNum, iFunc());
           }else{
             o.complete();
           }     
         });
   
 }
 
 /// Executes a simple GET request with the given header/request type and returns the result
 /// in an observable sequence of a single value (the data).
 static ChainableIObservable fromXMLHttpRequest(String uri, String requestHeader, String requestValue)
 {
  return Observable.create((IObserver o){
    XMLHttpRequest r = new XMLHttpRequest();
    
    Observable
    .fromEvent(r.on.error)
    .subscribe((e){
      o.error(const Exception('error occurred during XMLHttpRequest.'));  
    });
        
    Observable
    .fromEvent(r.on.abort)
    .subscribe((e){
      o.complete();
    });
    
    Observable
    .fromEvent(r.on.readyStateChange)
    .subscribe((e){
      if (r.readyState != 4) return;
      o.next(r.responseText);
      o.complete();
    });
    
    try{
      r.open('GET', uri, true);
      r.setRequestHeader(requestHeader, requestValue);
      r.send();
    }catch(Exception e){
      o.error(e);
    }
    catch(var e){
      o.error(e);
    }
  });  
 }
 
 /// Takes n values from an observable sequence while the conditional function
 /// returns true.
 static ChainableIObservable takeWhile(IObservable source, conditional(v)){  
   return Observable.create((IObserver o){
     source.subscribe(
       (v){
         if (conditional(v) == false){
           o.complete();
         }else{
           o.next(v);
         }
       },
       () => o.complete(),
       (e) => o.error(e));
   });
 }
 
 /// Takes the first n values from an observable sequence, then terminates.
 static ChainableIObservable take(IObservable source, int howMany){
   if (howMany < 0) return Observable.throwE(const Exception('Illegal take value.  Must be greater than 0.'));
   
   if (howMany == 0) return Observable.empty();
   
   var cnt = 0;
   
   return Observable.create((IObserver o){
     source.subscribe(
       (v){
         if (++cnt == howMany){
           o.next(v);
           o.complete();
         }else{
           o.next(v);
         }
       },
       () => o.complete(),
       (e) => o.error(e));
   });
 }
 
 /// Returns the first value received from an observable sequence, then terminates.
 static ChainableIObservable first(IObservable source){
   return Observable.create((IObserver o){
     source.subscribe(
       (v){
         o.next(v);
         o.complete();
       },
       () => o.complete(),
       (e) => o.error(e));
   });
 }
 
 /// Returns a single value from an observable sequence and an exception
 /// if more than one value is found in the sequence.
 static ChainableIObservable single(IObservable source){
   return Observable.create((IObserver o){
     bool gotOne = false;
     source.subscribe(
       (v){
         if (gotOne) {
           o.error(const Exception('source return more than one element in Observable.single().'));
           return;
         }
         gotOne = true;
         o.next(v);
       },
       () => o.complete(),
       (e) => o.error(e)
       );
   });
 }
 
 /// Returns a single value as an observable sequence.
 static ChainableIObservable returnValue(value) =>
   Observable.create((IObserver o){
     o.next(value);
     o.complete();
   });
 
 /// Returns a numerica range from a given start to a given finish, with optional stepping
 /// (default step is 1).  If start > finish then range will be high to low.
 static ChainableIObservable range(num start, num finish, [step = 1]){
   if (step == 0) return Observable.throwE(const Exception('Invalid step.  Cannot <= 0'));
   
   if (start == finish) return Observable.returnValue(start);
   
   return (start < finish) 
     ? Observable.unfold(start, (v) => v <= finish, (v) => v += step, (v) => v)
     : Observable.unfold(start, (v) => v >= finish, (v) => v -= step, (v) => v);
   
 }
 
 /// Unfolds a given initialstate until conditional() returns false;
 /// Each successful iteration is passed to result() which then returns
 /// returns the element sent to the sequence.
 static ChainableIObservable unfold(initialstate, conditional(state), iterate(state), result(state)){
   return Observable.create((IObserver o){
     var s = initialstate;
     try{
       while(conditional(s) == true){
         o.next(result(s));
         s = iterate(s);
       }
       o.complete();
     }catch(Exception e){
       o.error(e);
     }
   });
 }
 
 /// When an element is received, throttle ignores subsequent elements for a 
 /// given time (in milliseconds).  This is useful for certain UI interactions
 /// where you only want to trigger when the user action has been idle
 /// for a certain period of time. 
 /// 
 /// For example, search boxes that retrieve on-demand results
 /// use throttling to reduce query load.
 static ChainableIObservable throttle(IObservable source, int timeInMilliseconds){
   return Observable.create((IObserver o){
     var handle;
     bool ignoreValue = false;
     var last;
     
     void checker() {
       ignoreValue = false;
       if (last != null) o.next(last);
       }
          
     source.subscribe(
       (v) {
         if (!ignoreValue){
           last = v;
           ignoreValue = true;
           handle = window.setTimeout(checker, timeInMilliseconds);
         }else{
           window.clearTimeout(handle);
           last = v;
           handle = window.setTimeout(checker, timeInMilliseconds);
         }
       },
       () => o.complete(),
       (e) => o.error(e)
     );
   });
 }
 
 /// Propogates an exception if an element isn't received within a given time period.
 /// Otherwise returns elements from the sequence.
 static ChainableIObservable timeout(IObservable source, int timeoutInMilliseconds){
   return Observable.create((IObserver o){
     var handler;

     void checker() => o.error(const Exception('Timeout Exceeded.'));
          
     source.subscribe(
       (v) {
         window.clearTimeout(handler);
         o.next(v);
         handler = window.setTimeout(checker, timeoutInMilliseconds);
       },
       () => o.complete(),
       (e) => o.error(e)
     );
     
     handler = window.setTimeout(checker, timeoutInMilliseconds);
   });
 }
 
 /// Returns a sequence of [Date] timestamps representing the arrival of
 /// each element in a given sequence.
 static ChainableIObservable<Date> timestamp(IObservable source){
   return Observable.create((IObserver o){
     source.subscribe(
       (v) => o.next(new Date.now()),
       () => o.complete(),
       (e) => o.error(e)
     );
   });
 }
 
 /// Converts a terminating observable sequence into a list.
 /// next() is only called when the source sequence terminates.
 /// 
 /// This function is a more specific version of Obervable.buffer(),
 /// in that all elements in the sequence are essentially "buffered".
 static ChainableIObservable<List> toList(IObservable source){
   List l = new List();
   
   return Observable.create((IObserver o){
     source.subscribe(
       (v) => l.add(v),
       (){
         o.next(l);
         o.complete();
       },
       (e) => o.error(e)
     );
   });
 }
 
 /// Returns an Observable sequence from an [Event] stream.
 ///
 /// ## Usage
 ///     Element myElement = new Element.tag('button');
 ///     Observable
 ///         .fromEvent(myElement.on.click)
 ///         .subscribe((e) => print('clicked!'));
 static ChainableIObservable<Event> fromEvent(EventListenerList event){
   return Observable.create((IObserver o) => event.add((e) => o.next(e)));
 }
  
 /// Returns a sequence that terminates immediately with an exception.
 static IObservable throwE(Exception e) => Observable.create((IObserver o) => o.error(e)); 
 
 /// Returns running total of items in a sequence.
 static ChainableIObservable count(IObservable source){
   int cnt = 0;
   return Observable.create((IObserver o) => source.subscribe((_)=> o.next(++cnt), ()=> o.complete(), (e)=> o.error(e)));
 }
 
 
 
 /// Applies a given function to each element of the sequence
 static ChainableIObservable apply(IObservable source, applyFunction(n)){
   return Observable.create((IObserver o){
     source.subscribe(
       (v) => o.next(applyFunction(v)),
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
 
 /// Filters elements of an observable sequence where the given
 /// function returns true for a given element.
 static ChainableIObservable where(IObservable source, f(n)){
   return Observable.create((IObserver o){
     source.subscribe(
     (v){
       if (f(v)) o.next(v);
     },
     () => o.complete(),
     (e) => o.error(e)
     );
   });
 }
 
 /// Returns an observable resulting from application of function [f] over
 /// pairs of elements from two observable streams.  The function is not
 /// invoked unless a element is present in both streams.
 /// Orphan elements are cached.
 static ChainableIObservable zip(IObservable left, IObservable right, f(l, r)){
   Queue lq = new Queue();
   Queue rq = new Queue();
   bool rc = false;
   bool lc = false;
   
   return Observable.create((IObserver o){
     var ld;
     var rd;
     
     ld = left.subscribe(
       (v){
         lq.add(v);
         if (!rq.isEmpty()) o.next(f(lq.removeFirst(), rq.removeFirst()));
       },
       (){
         if (lq.isEmpty()){
           o.complete();
           rd.dispose();
         }
       },
       (e) => o.error(e));

     rd = right.subscribe(
       (v){
         rq.add(v);
         if (!lq.isEmpty()) o.next(f(lq.removeFirst(), rq.removeFirst()));
       },
       (){
         if (rq.isEmpty()){
           o.complete();
           ld.dispose();
         }
       },
       (e) => o.error(e));
   });
 }
 
 /// Performs an n-ary merge of a given list of sequences into a single sequence.
 static ChainableIObservable merge(List<IObservable> sources){
   var t = 0;
   return Observable.create((IObserver o){
     //subscribe to tall the sources
     sources.forEach((source)=>
       source.subscribe(
       (v) => o.next(v),
       () {
         if (++t == sources.length) o.complete();
       },
       (e) => o.error(e)
       )
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
   List buff = new List();
   bool delaying = true;
   
   var t = Observable
    .timer(milliseconds, 1);
   
   t.subscribe((v) =>{}, () => delaying = false);
   
   
   return Observable.create((IObserver o){
     source.subscribe(
     (v){
       if (!delaying){
         if (!buff.isEmpty()){
           buff.forEach((b) => o.next(b));
           buff.clear();
         }else{
           o.next(v);           
         }
       }else{
         buff.add(v);
       }
     },
     (){
        t.subscribe((v)=>{},(){
          if (!buff.isEmpty()){
            buff.forEach((b) => o.next(b));
            buff.clear();
          }
          o.complete();
        });
     },
     (e) => o.error(e)
     );
   });
 }
 
 /// Returns an observable sequence that returns false until a given value is found, then terminates.
 static ChainableIObservable contains(IObservable source, value){
   return Observable.create((IObserver o) {
     source.subscribe(
       (v){
         if (v != value){
           o.next(false);
         }
         else{
          o.next(true);
          o.complete();
         }
       },
       (){
         o.complete();
       },
       (e) => o.error(e)
     );
   });
 }
 
 /// Returns an observable sequence that terminates immediately.
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
         (e){
           o.error(e);
         }
       );
   });
 }
 
 //TODO Add buffering options with time/timeout constraints
 /// Buffers the sequence into non-overlapping lists based on a given size (default 10)
 static ChainableIObservable buffer(IObservable source, [int size = 10]){
   List buff = new List();
   return Observable.create((IObserver o)
   {source.subscribe(
     (v) {
       buff.add(v);
       if (buff.length == size){
         o.next(buff);
         buff.clear();
       }
     },
     (){
       if (!buff.isEmpty()){
         o.next(buff);
         buff.clear();
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
         if (++tickCount > ticks){
           window.clearInterval(handler);
           o.complete();
           return;
         }
         o.next(tickCount);
       }, milliseconds);
     }
   });
 }
 
 /// Returns an observable sequence of messages received from a given [Isolate].
 /// This observable operator assumes that the given isolate is uni-directional
 /// and can only receive an initialization (or registration) messsage.
 ///
 /// ## CAUTION - READ BEFORE USING
 /// Isolates can only expose state via the DOM, so this observable will only
 /// work client-side.  Also, sensitive data SHOULD NEVER be accessed this way, because
 /// it is exposed to the DOM via a hidden field and could be inspected by other
 /// client-side scripts.
 ///
 /// ## Parameters
 /// * i - The isolate to observe.
 /// * initMessage - The initialization message that the isolate is to receive.
 /// * terminationMessage (optional) - A message, that when received from the isolate,
 /// terminates the sequence.
 /// * timeOut (optional, default none) Terminates the sequence if a message isn't
 /// received from the isolate in a given time (in milliseconds).
 static ChainableIObservable fromIsolate(Isolate i, initMessage, [terminationMessage = ""])
 {
   return Observable.create((IObserver o){
     
     i.spawn().then((SendPort port){
       new _ObserverIsolate().spawn().then((SendPort oPort){
         oPort.send(terminationMessage);
                  
         var iostate = document.query("#${_ObserverIsolate.IOSTATE + oPort.hashCode()}");
         
         Observable
         .fromEvent(iostate.on.change)
         .subscribe(
           (e){
             if (iostate.value == _ObserverIsolate.MSG_COMPLETE){
               iostate.remove();
               o.complete();
             }else{
               o.next(JSON.parse(iostate.value));             
             }
         },
         () => o.complete(),
         (err) => o.error(err)
         );
         
         
         port.send(initMessage, oPort);
       });     
     });
   });  
 }
 
}

// HACK
// proxy for the Observable.fromIsolate() function.
// uses DOM hidden field to surface and notify .fromIsolate()
// of new messages from the target Isolate.
class _ObserverIsolate extends Isolate {
  static final MSG_COMPLETE = "___complete___";
  static final IOSTATE = "___iostate___";
  
  _ObserverIsolate() : super.light() {

  }

  void main() {
    var tMessage;

    String statehash = _ObserverIsolate.IOSTATE + this.port.toSendPort().hashCode();

    var state = document.query("#${statehash}");
    
    if (state == null){
      Element e = new Element.tag('input');
      e.style.display = 'none';
      e.id = statehash;
      document.body.nodes.add(e);
      state = document.query("#${statehash}");
    }
    
    if (state == null) return;  //TODO throw?
    
    this.port.receive((message, SendPort replyTo) {
      //first two messages will always be from the observable.
      if (tMessage == null){
        tMessage = message;
        return;
      }
      
      if (message == tMessage){
        state.value = _ObserverIsolate.MSG_COMPLETE;
      }else{
        state.value = JSON.stringify(message);
      }
      state.on.change.dispatch(new Event('change'));
    });
  }
}

