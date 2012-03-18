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


// Instantiates a general purpose IObservable with chaining helper methods.
// This implementation treats the sequences as a shared stream among all 
// subscribers.  Only the first subscriber is guaranteed to get all elements
// in a static sequence (lists, etc).  This is the default behavior for most observables.
//
class _ChainableIObservableImplementation<T> implements ChainableIObservable<T>, IDisposable, _FactoryObservable{
  final Function oFunc;
  IObserver<T> mainObserver;
  final List<IObserver<T>> observers;
  Exception err;
    
  _ChainableIObservableImplementation(Function this.oFunc) 
  : observers = new List<IObserver<T>>()
  {
    mainObserver = new _DefaultObserver(
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
      return null;
    }
    
    if (mainObserver == null){
      //this sequence is terminated so just return complete immediately
      if (complete != null) complete();
      return null;
    }
    
    if (next is Function){
      //create a wrapper observer
      return _addObserver(new _DefaultObserver(next, complete, error));
    }
    else if (next is IObserver<T>)
    {
      return _addObserver(next);
    }else{
      throw const ObservableException("Parameter 'next' must be a Function f(n) or an IObserver.");
    }
  }
  
  IDisposable _addObserver(IObserver o){
    observers.add(o);
    
    // don't initiate the main observer on the sequence until the
    // first observer arrives.
    if (observers.length == 1) oFunc(mainObserver);
    return new _UnsubscriberWrapper(this, o);
  }
  
  void dispose(){
    // TODO remove all subscribers
    mainObserver = null;
    observers.clear();
  }
  
  
  //***********************************
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
  
  merge(List<IObservable> sources){
    sources.insertRange(0, 1, this);
    return Observable.merge(sources);
  }
  
  zip(IObservable right, f(l, r)) => Observable.zip(this, right, f);
  
  where(f(n)) => Observable.where(this, f);
  
  toList() => Observable.toList(this);
  
  timestamp() => Observable.timestamp(this);
  
  timeout(int milliseconds) => Observable.timeout(this, milliseconds);
  
  throttle(int milliseconds) => Observable.throttle(this, milliseconds);
  
  single() => Observable.single(this);
  
  first() => Observable.first(this);
  
  take(int howMany) => Observable.take(this, howMany);
  
  takeWhile(conditional(v)) => Observable.takeWhile(this, conditional);
  
  firstOf(List<IObservable> sources){
    sources.insertRange(0, 1, this);
    return Observable.firstOf(sources);
  }
  
  sample(int sampleFrequency) => Observable.sample(this, sampleFrequency);
  
  skip(int skipCount) => Observable.skip(this, skipCount);
  
  skipWhile(isTrue(v)) => Observable.skipWhile(this, isTrue);
  
  fromXMLHttpRequest(String uri, String requestHeader, String requestValue) => Observable.fromXMLHttpRequest(uri, requestHeader, requestValue, continuation:this);
  
  fromList(List l) => Observable.fromList(l, continuation:this);
  
  timer(int milliseconds, [int ticks = -1]) => Observable.timer(milliseconds, ticks, continuation:this);
  
  fromIsolate(Isolate i, initMessage, [terminationMessage = ""]) => Observable.fromIsolate(i, initMessage, terminationMessage, continuation:this);
  
  unfold(initialstate, conditional(state), iterate(state), result(state)) => Observable.unfold(initialstate, conditional, iterate, result, continuation:this);
  
  fromEvent(EventListenerList event) => Observable.fromEvent(event, continuation:this);
  
  returnValue(value) => Observable.returnValue(value, continuation:this);
  
  range(num start, num finish, [step = 1]) => Observable.range(start, finish, step, continuation:this);
  
  fromFuture(Future f) => Observable.fromFuture(f, continuation:this);
  
  pace(int paceInMilliseconds) => Observable.pace(this, paceInMilliseconds);
  
  animationFrame([int interval = 0]) => Observable.animationFrame(interval, continuation:this);
}

