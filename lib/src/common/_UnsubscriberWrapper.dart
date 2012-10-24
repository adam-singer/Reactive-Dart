//
// Contract for observables that use the _UnsubscriberWrapper implementation
//
abstract class _FactoryObservable<T>
{
  List<IObserver<T>> observers;
}

//
// wraps an observer so it can dispose of itself from it's observable context
//
class _UnsubscriberWrapper implements IDisposable
{
  final _FactoryObservable factoryObservableReference;
  final IObserver observer;

  _UnsubscriberWrapper(this.factoryObservableReference, this.observer);

  void dispose(){
    if (factoryObservableReference.observers.indexOf(observer) != -1) {
      factoryObservableReference
        .observers
        .removeRange(factoryObservableReference.observers.indexOf(observer), 1);
    }
  }
}