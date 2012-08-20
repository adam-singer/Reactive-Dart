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
* Represents an [IObservable] that provides extended methods for
* chaining of multiple operations.
*/
interface ChainableIObservable<T> extends IObservable<T> default _ChainableIObservableImplementation
{

  ChainableIObservable(Function oFunc);

  // this is more about the tooling than anything else.
  // we want to surface these methods in the IDE
  // during chained operations.
  ChainableIObservable<T> count();
  ChainableIObservable<T> contains(value);
  ChainableIObservable<T> concat(List<IObservable> list);
  ChainableIObservable<T> fold(f(v,n), startingValue);
  ChainableIObservable<T> any();
  ChainableIObservable<T> buffer([size]);
  ChainableIObservable<T> delay(int milliseconds);
  ChainableIObservable<T> distinct();
  ChainableIObservable<T> distinctUntilNot();
  ChainableIObservable<T> apply(applyFunction(n));
  ChainableIObservable<T> merge(List<IObservable> sources);
  ChainableIObservable<T> zip(IObservable right, f(l, r));
  ChainableIObservable<T> where(f(n));
  ChainableIObservable<T> toList();
  ChainableIObservable<T> timestamp();
  ChainableIObservable<T> timeout(int milliseconds);
  ChainableIObservable<T> throttle(int milliseconds);
  ChainableIObservable<T> single();
  ChainableIObservable<T> first();
  ChainableIObservable<T> take(int howMany);
  ChainableIObservable<T> takeWhile(conditional(v));
  ChainableIObservable<T> firstOf(List<IObservable> sources);
  ChainableIObservable<T> sample(int sampleFrequency);
  ChainableIObservable<T> skip(int skip);
  ChainableIObservable<T> skipWhile(isTrue(v));
  ChainableIObservable<T> fromHttpRequest(String uri, String requestHeader, String requestValue);
  ChainableIObservable<T> fromList(List l);
  ChainableIObservable<T> timer(int milliseconds, [int ticks]);
  ChainableIObservable<T> unfold(initialstate, conditional(state), iterate(state), result(state));
  ChainableIObservable<T> fromEvent(EventListenerList event);
  ChainableIObservable<T> returnValue(value);
  ChainableIObservable<T> range(num start, num finish, [step]);
  ChainableIObservable<T> fromFuture(Future f);
  ChainableIObservable<T> pace(int paceInMilliseconds);
  ChainableIObservable<T> animationFrame([int interval]);
}