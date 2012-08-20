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
  /// Creates an IObservable with the given implementation function.
  static ChainableIObservable create(f(IObserver o)) => new ChainableIObservable(f);
 
  /// Takes output from a [Future] and returns it in an observable sequence.
 static ChainableIObservable fromFuture(Future f, [IObservable continuation]){
   return Observable.create((IObserver o){
     makeit(){
       if (f.isComplete){
         if (f.hasValue){
           o.next(f.value);
         }
         o.complete();
       }else{        
         f.then((v){
           o.next(v);
           o.complete();
         }); 
         
         f.handleException((e){
           o.error(e);  
         });
       }
     }
     
     if (continuation == null){
       makeit();
     }else{
       continuation.observe((_){},() => makeit(), (e) => o.error(e));
     }
   });
 }
 
 /// Skips elements in an observable sequence until the given fuction returns false.
 /// All subsequent elements are returned.
 static ChainableIObservable skipWhile(IObservable source, isTrue(n)){
   return Observable.create((IObserver o){
     int counter = 0;
     bool trueFlag = true;
     
     source.observe(
       (v){
         if (!trueFlag){
           o.next(v);
         }else{
           if (!isTrue(v)){
             trueFlag = false;
             o.next(v);
           }
         }
       },
       () => o.complete(),
       (e) => o.error(e));
     
   });
 }
 
 /// Skips [skip] number of elements in a given observable sequence.  Subsequent elements are returned.
 static ChainableIObservable skip(IObservable source, int skipCount){
   if (skipCount == null || skipCount < 0) return Observable.throwE(const ObservableException('parameter "skipCount" must be >= 0.'));
   
   return Observable.create((IObserver o){
     int counter = 0;
     source.observe(
       (v){
         if (counter++ >= skipCount){
           o.next(v);
         }
       },
       () => o.complete(),
       (e) => o.error(e));
     
   });
 }
 
 /// Returns an observable sequence sample every nth element of the given sequence.
 static ChainableIObservable sample(IObservable source, int sampleFrequency){
   if (sampleFrequency == null || sampleFrequency < 1) return Observable.throwE(const ObservableException('parameter "sampleFrequency" must be >= 1.'));
   
   return Observable.create((IObserver o){
     int counter = 0;
     
     source.observe((v){
       if (++counter == sampleFrequency){
         o.next(v);
         counter = 0;
       }
     },
     () => o.complete(),
     (e) => o.error(e)
     );
   });
 }
 
 /// Of the given [List] of observable sequences, propagates the sequence that
 /// provides a value first.  Sequences are subscribed in order they are found in the
 /// sources list; those earlier in the index may have a slight advantage.
 static ChainableIObservable firstOf(List<IObservable> sources){  
   return Observable.create((IObserver o){
     IObservable firstIn;
     
     sources.forEach((source){
      IDisposable d;
      d = source.observe(
        (v){
          if (firstIn == null){
            firstIn = source;
            o.next(v);
          }else{
            if (firstIn != source){
              if (d != null) d.dispose();
            }else{
              o.next(v);
            }
          }
        },
        (){
          if (firstIn != null && source == firstIn){
            o.complete();
          }
        },
        (e) => o.error(e)
        );
    });
   });
 }
   
 /// Takes n values from an observable sequence while the conditional function
 /// returns true.
 static ChainableIObservable takeWhile(IObservable source, conditional(v)){  
   return Observable.create((IObserver o){
     source.observe(
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
   if (howMany < 0) return Observable.throwE(const ObservableException('Illegal take value.  Must be greater than 0.'));
   
   if (howMany == 0) return Observable.empty();
   
   var cnt = 0;
   
   return Observable.create((IObserver o){
     source.observe(
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
     source.observe(
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
     source.observe(
       (v){
         if (gotOne) {
           o.error(const ObservableException('source return more than one element in Observable.single().'));
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
 static ChainableIObservable returnValue(value, [IObservable continuation]){
   return Observable.create((IObserver o){
     makeit(){
       o.next(value);
       o.complete();
     }
     
     if (continuation == null){
       makeit();
     }else{
       continuation.observe((_){},() => makeit(), (e) => o.error(e));
     }
   });
 }
 
 /// Returns a numerica range from a given start to a given finish, with optional stepping
 /// (default step is 1).  If start > finish then range will be high to low.
 static ChainableIObservable range(num start, num finish, [step = 1, IObservable continuation]){
   if (step == 0) return Observable.throwE(const ObservableException('Invalid step.  Cannot <= 0'));
   
   if (start == finish) return Observable.returnValue(start);
   
   return (start < finish) 
           ? Observable.unfold(start, (v) => v <= finish, (v) => v += step, (v) => v, continuation)
           : Observable.unfold(start, (v) => v >= finish, (v) => v -= step, (v) => v, continuation);
                    
 }
 
 /// Unfolds a given initialstate until conditional() returns false;
 /// Each successful iteration is passed to result() which then returns
 /// returns the element sent to the sequence.
 static ChainableIObservable unfold(initialstate, conditional(state), iterate(state), result(state), [IObservable continuation]){
   return Observable.create((IObserver o){
     makeit(){
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
     }
     
     if (continuation == null){
       makeit();
     }else{
       continuation.observe((_){},() => makeit(), (e) => o.error(e));
     }
   });
 }
   
 /// Returns a sequence of [Date] timestamps representing the arrival of
 /// each element in a given sequence.
 static ChainableIObservable<Date> timestamp(IObservable source){
   return Observable.create((IObserver o){
     source.observe(
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
     source.observe(
       (v) => l.add(v),
       (){
         o.next(l);
         o.complete();
       },
       (e) => o.error(e)
     );
   });
 }
 
 /// Returns an observable sequence that never returns a value and never terminates.
 static IObservable never() => Observable.create((IObserver o){});
  
 /// Returns a sequence that terminates immediately with an exception.
 static IObservable throwE(Exception e) => Observable.create((IObserver o) => o.error(e)); 
 
 /// Returns running total of items in a sequence.
 static ChainableIObservable count(IObservable source){
   int cnt = 0;
   return Observable.create((IObserver o) =>
   source.observe(
     (_)=> ++cnt, 
     (){
       o.next(cnt);
       o.complete();
       }, 
     (e)=> o.error(e)));
 }

 
 /// Applies a given function to each element of the sequence
 static ChainableIObservable apply(IObservable source, applyFunction(n)){
   return Observable.create((IObserver o){
     source.observe(
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
     source.observe(
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
     source.observe(
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
     
     ld = left.observe(
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

     rd = right.observe(
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
       source.observe(
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
     source.observe(
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
  
 /// Returns an observable sequence that returns false until a given value is found, then terminates.
 static ChainableIObservable contains(IObservable source, value){
   return Observable.create((IObserver o) {
     source.observe(
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
 static ChainableIObservable fold(IObservable source, f(acc, v), startingValue){
   return Observable.create((IObserver o){
     var acc = startingValue;
     source.observe(
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
     source.observe(
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
   {source.observe(
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
     void _concatInternal(IObserver obs, List<IObservable> ol, int index){

       ol[index]
        .observe(
          (v) => obs.next(v),
          (){
            if (++index < ol.length){
              _concatInternal(o, ol, index);
            }else{
              obs.complete();
            }
          },
          (e) => obs.error(e)
        );
     }
     
     _concatInternal(o, oList, 0);
   });
 }
 

 /// Returns an observable sequence from a given [List]
 static ChainableIObservable fromList(List l, [IObservable continuation]){
   if (l == null) return Observable.throwE(const NullPointerException());
   
   return Observable.create((IObserver o){
     makeit(){
       l.forEach((el) => o.next(el));
       o.complete();
     }
     if (continuation == null){
       makeit();
     }else{
       continuation.observe((_){},() => makeit(), (e) => o.error(e));
     }
   });
 }

}
