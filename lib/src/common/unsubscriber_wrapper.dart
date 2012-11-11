//
// Contract for observables that use the _UnsubscriberWrapper implementation
//

part of reactive_common;

abstract class FactoryObservable<T>
{
  List<IObserver<T>> observers;
}

//
// wraps an observer so it can dispose of itself from it's observable context
//
class UnsubscriberWrapper implements IDisposable
{
  final FactoryObservable factoryObservableReference;
  final IObserver observer;

  UnsubscriberWrapper(this.factoryObservableReference, this.observer);

  void dispose(){
    if (factoryObservableReference.observers.indexOf(observer) != -1) {
      factoryObservableReference
        .observers
        .removeRange(factoryObservableReference.observers.indexOf(observer), 1);
    }
  }
}