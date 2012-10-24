part of reactive_console;

abstract class IObservable<T>
{
  // 'next' can be an observer or a function f(next)
  abstract IDisposable observe(next, [complete(), error(Exception e)]);
}
