part of reactive_console;

/**
* Interface which represents an observer in the reactive model.
*/
class IObserver<T>
{
  Function nextFunc, completeFunc, errorFunc;

  void next(T value) {
    nextFunc(value);
  }
  void error(Exception err){
    errorFunc(err);
  }
  void complete() {
    completeFunc();
  }

  IObserver(next, [complete(), error(Exception e)])
  : _assignedHash = _hashNum++
  {
    nextFunc = next;
    completeFunc = complete == null ? (){} : complete;
    errorFunc = error == null ? (_){} : error;
  }

  static int _hashNum = 0;
  final int _assignedHash;

  hashCode() => _assignedHash;
}