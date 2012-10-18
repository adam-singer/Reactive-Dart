//   Copyright (c) 2012, John Evans
//
//   John: https://plus.google.com/u/0/115427174005651655317/about
//
//   Licensed under the Apache License, Version 2.0 (the "License";
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
* This library implements reactive operators that can be used in
* server-side operations.  Use reactive_client or reactive_server if
* you want to use functionality specific to those environments.
*/
library reactive_console;

import 'dart:io';
import 'dart:isolate';
import 'dart:math';

part 'src/common/i_disposable.dart';
part 'src/common/i_observer.dart';
part 'src/common/i_observable.dart';
part 'src/console/observable.dart';
part 'src/console/_chainable_i_observable_implementation.dart';
part 'src/common/_UnsubscriberWrapper.dart';
part 'src/console/chainable_i_observable.dart';
part 'src/common/observable_exception.dart';