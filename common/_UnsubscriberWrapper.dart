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


//
// Contract for observables that use the _UnsubscriberWrapper implementation
//
interface _FactoryObservable<T>{
  final List<IObserver<T>> observers;
}

//
// wraps an observer so it can dispose of itself from it's observable context
//
class _UnsubscriberWrapper implements IDisposable{
  final _FactoryObservable factoryObservableReference;
  final IObserver observer;
  
  _UnsubscriberWrapper(this.factoryObservableReference, this.observer);
  
  void dispose(){
    if (factoryObservableReference.observers.indexOf(observer) != -1)
      factoryObservableReference.observers.removeRange(factoryObservableReference.observers.indexOf(observer), 1);
  }
}