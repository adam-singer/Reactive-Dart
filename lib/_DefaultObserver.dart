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
// Instantiates a general-purpose observer.
//
class _DefaultObserver<T> implements IObserver<T>
{
  Function nextFunc, completeFunc, errorFunc;
  
  void next(T value) => nextFunc(value);
  void error(Exception error) => errorFunc(error);
  void complete() => completeFunc(); 
  
  _DefaultObserver(next, [complete(), error(Exception e)])
  : _assignedHash = _hashNum++
  {
    nextFunc = next;
    completeFunc = complete == null ? (){} : complete;
    errorFunc = error == null ? (_){} : error;
  }
  
  static int _hashNum = 0;
  final int _assignedHash;
}