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
* This library implements reactive operators that can be used in server and
* client-side operations.  Use reactive_client or reactive_server if
* you want to use functionality specific to those environments.
*
* This library will go away once Dart supports a Timer object
* in the core.
*/
#library('Reactive Dart - Common');

#source('common/IDisposable.dart');
#source('common/IObserver.dart');
#source('common/IObservable.dart');
#source('common/Observable.dart');
#source('common/_ChainableIObservableImplementation.dart');
#source('common/_UnsubscriberWrapper.dart');
#source('common/_DefaultObserver.dart');
#source('common/ChainableIObservable.dart');
#source('common/ObservableException.dart');
