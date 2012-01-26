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

interface IObservable<T>
{
  // 'next' can be an observer or a function f(next)
  IDisposable subscribe(next, [complete(), error(Exception e)]);
}


/**
* Represents an IObservable that provides extended methods for
* chaining of multiple IObservable sequences.
*/ 
interface ChainableIObservable<T> extends IObservable<T>
{
  ChainableIObservable<T> count();
  ChainableIObservable<T> contains(value);
  ChainableIObservable<T> concat(List<IObservable> list);
  ChainableIObservable<T> fold(f(v,n), startingValue);
  ChainableIObservable<T> any();
  ChainableIObservable<T> buffer([size]);
  ChainableIObservable<T> delay(int milliseconds);
  ChainableIObservable<T> distinct();
}