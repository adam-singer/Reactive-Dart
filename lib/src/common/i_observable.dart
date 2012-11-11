part of reactive_common;

abstract class IObservable<T>
{
  // 'next' can be an observer or a function f(next)
  IDisposable observe(next, [complete(), error(Exception e)]);
}
