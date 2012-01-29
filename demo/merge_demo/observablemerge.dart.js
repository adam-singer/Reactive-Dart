//  ********** Library dart:core **************
//  ********** Natives dart:core **************
function $defProp(obj, prop, value) {
  Object.defineProperty(obj, prop,
      {value: value, enumerable: false, writable: true, configurable: true});
}
$defProp(Object.prototype, '$typeNameOf', function() {
  if ((typeof(window) != 'undefined' && window.constructor.name == 'DOMWindow')
      || typeof(process) != 'undefined') { // fast-path for Chrome and Node
    return this.constructor.name;
  }
  var str = Object.prototype.toString.call(this);
  str = str.substring(8, str.length - 1);
  if (str == 'Window') {
    str = 'DOMWindow';
  } else if (str == 'Document') {
    str = 'HTMLDocument';
  }
  return str;
});
function $throw(e) {
  // If e is not a value, we can use V8's captureStackTrace utility method.
  // TODO(jmesserly): capture the stack trace on other JS engines.
  if (e && (typeof e == 'object') && Error.captureStackTrace) {
    // TODO(jmesserly): this will clobber the e.stack property
    Error.captureStackTrace(e, $throw);
  }
  throw e;
}
$defProp(Object.prototype, '$index', function(i) {
  var proto = Object.getPrototypeOf(this);
  if (proto !== Object) {
    proto.$index = function(i) { return this[i]; }
  }
  return this[i];
});
$defProp(Array.prototype, '$index', function(index) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i];
});
$defProp(String.prototype, '$index', function(i) {
  return this[i];
});
function $wrap_call$0(fn) { return fn; }
function $wrap_call$1(fn) { return fn; }
function $add(x, y) {
  return ((typeof(x) == 'number' && typeof(y) == 'number') ||
          (typeof(x) == 'string'))
    ? x + y : x.$add(y);
}
function $eq(x, y) {
  if (x == null) return y == null;
  return (typeof(x) == 'number' && typeof(y) == 'number') ||
         (typeof(x) == 'boolean' && typeof(y) == 'boolean') ||
         (typeof(x) == 'string' && typeof(y) == 'string')
    ? x == y : x.$eq(y);
}
// TODO(jimhug): Should this or should it not match equals?
$defProp(Object.prototype, '$eq', function(other) {
  return this === other;
});
$defProp(Object.prototype, "get$typeName", Object.prototype.$typeNameOf);
// ********** Code for Object **************
$defProp(Object.prototype, "get$dynamic", function() {
  "use strict"; return this;
});
$defProp(Object.prototype, "noSuchMethod", function(name, args) {
  $throw(new NoSuchMethodException(this, name, args));
});
$defProp(Object.prototype, "complete$0", function() {
  return this.noSuchMethod("complete", []);
});
$defProp(Object.prototype, "error$1", function($0) {
  return this.noSuchMethod("error", [$0]);
});
$defProp(Object.prototype, "forEach$1", function($0) {
  return this.noSuchMethod("forEach", [$0]);
});
$defProp(Object.prototype, "is$IObserver", function() {
  return false;
});
$defProp(Object.prototype, "next$0", function() {
  return this.noSuchMethod("next", []);
});
$defProp(Object.prototype, "next$1", function($0) {
  return this.noSuchMethod("next", [$0]);
});
$defProp(Object.prototype, "setTimeout$2", function($0, $1) {
  return this.noSuchMethod("setTimeout", [$0, $1]);
});
$defProp(Object.prototype, "subscribe$2", function($0, $1) {
  return this.noSuchMethod("subscribe", [$0, $1]);
});
// ********** Code for IndexOutOfRangeException **************
function IndexOutOfRangeException(_index) {
  this._index = _index;
}
IndexOutOfRangeException.prototype.is$IndexOutOfRangeException = function(){return true};
IndexOutOfRangeException.prototype.toString = function() {
  return ("IndexOutOfRangeException: " + this._index);
}
// ********** Code for NoSuchMethodException **************
function NoSuchMethodException(_receiver, _functionName, _arguments) {
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
}
NoSuchMethodException.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  for (var i = (0);
   i < this._arguments.get$length(); i++) {
    if (i > (0)) {
      sb.add(", ");
    }
    sb.add(this._arguments.$index(i));
  }
  sb.add("]");
  return $add(("NoSuchMethodException - receiver: '" + this._receiver + "' "), ("function name: '" + this._functionName + "' arguments: [" + sb + "]"));
}
// ********** Code for ClosureArgumentMismatchException **************
function ClosureArgumentMismatchException() {

}
ClosureArgumentMismatchException.prototype.toString = function() {
  return "Closure argument mismatch";
}
// ********** Code for IllegalArgumentException **************
function IllegalArgumentException(args) {
  this._args = args;
}
IllegalArgumentException.prototype.is$IllegalArgumentException = function(){return true};
IllegalArgumentException.prototype.toString = function() {
  return ("Illegal argument(s): " + this._args);
}
// ********** Code for NoMoreElementsException **************
function NoMoreElementsException() {

}
NoMoreElementsException.prototype.toString = function() {
  return "NoMoreElementsException";
}
// ********** Code for UnsupportedOperationException **************
function UnsupportedOperationException(_message) {
  this._message = _message;
}
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
// ********** Code for dart_core_Function **************
Function.prototype.to$call$0 = function() {
  this.call$0 = this._genStub(0);
  this.to$call$0 = function() { return this.call$0; };
  return this.call$0;
};
Function.prototype.call$0 = function() {
  return this.to$call$0()();
};
function to$call$0(f) { return f && f.to$call$0(); }
Function.prototype.to$call$1 = function() {
  this.call$1 = this._genStub(1);
  this.to$call$1 = function() { return this.call$1; };
  return this.call$1;
};
Function.prototype.call$1 = function($0) {
  return this.to$call$1()($0);
};
function to$call$1(f) { return f && f.to$call$1(); }
Function.prototype.to$call$2 = function() {
  this.call$2 = this._genStub(2);
  this.to$call$2 = function() { return this.call$2; };
  return this.call$2;
};
Function.prototype.call$2 = function($0, $1) {
  return this.to$call$2()($0, $1);
};
function to$call$2(f) { return f && f.to$call$2(); }
// ********** Code for Math **************
// ********** Code for top level **************
function dart_core_print(obj) {
  return _print(obj);
}
function _print(obj) {
  if (typeof console == 'object') {
    if (obj) obj = obj.toString();
    console.log(obj);
  } else {
    write(obj);
    write('\n');
  }
}
//  ********** Library dart:coreimpl **************
// ********** Code for ListFactory **************
ListFactory = Array;
$defProp(ListFactory.prototype, "get$length", function() { return this.length; });
$defProp(ListFactory.prototype, "set$length", function(value) { return this.length = value; });
$defProp(ListFactory.prototype, "add", function(value) {
  this.push(value);
});
$defProp(ListFactory.prototype, "clear", function() {
  this.set$length((0));
});
$defProp(ListFactory.prototype, "insertRange", function(start, length, initialValue) {
  
      if (length == 0) return;
      if (length < 0) throw new IllegalArgumentException('length');
      if (start < 0 || start > this.length)
        throw new IndexOutOfRangeException(start);
  
      // Splice in the values with a minimum of array allocations.
      var args = new Array(length + 2);
      args[0] = start;
      args[1] = 0;
      for (var i = 0; i < length; i++) {
        args[i + 2] = initialValue;
      }
      this.splice.apply(this, args);
      
});
$defProp(ListFactory.prototype, "iterator", function() {
  return new ListIterator(this);
});
$defProp(ListFactory.prototype, "forEach$1", function($0) {
  return this.forEach(to$call$1($0));
});
// ********** Code for ListIterator **************
function ListIterator(array) {
  this._array = array;
  this._pos = (0);
}
ListIterator.prototype.hasNext = function() {
  return this._array.get$length() > this._pos;
}
ListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  return this._array.$index(this._pos++);
}
ListIterator.prototype.next$0 = ListIterator.prototype.next;
// ********** Code for NumImplementation **************
NumImplementation = Number;
NumImplementation.prototype.ceil = function() {
  'use strict'; return Math.ceil(this);
}
// ********** Code for ExceptionImplementation **************
function ExceptionImplementation(msg) {
  this._msg = msg;
}
ExceptionImplementation.prototype.toString = function() {
  return (null == this._msg) ? "Exception" : ("Exception: " + this._msg);
}
// ********** Code for HashMapImplementation **************
function HashMapImplementation() {}
HashMapImplementation.prototype.forEach = function(f) {
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    var key = this._keys.$index(i);
    if ((null != key) && ((null == key ? null != (const$0001) : key !== const$0001))) {
      f(key, this._values.$index(i));
    }
  }
}
HashMapImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$2($0));
};
// ********** Code for HashSetImplementation **************
function HashSetImplementation() {}
HashSetImplementation.prototype.forEach = function(f) {
  this._backingMap.forEach(function _(key, value) {
    f(key);
  }
  );
}
HashSetImplementation.prototype.iterator = function() {
  return new HashSetIterator(this);
}
HashSetImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for HashSetIterator **************
function HashSetIterator(set_) {
  this._entries = set_._backingMap._keys;
  this._nextValidIndex = (-1);
  this._advance();
}
HashSetIterator.prototype.hasNext = function() {
  var $0;
  if (this._nextValidIndex >= this._entries.get$length()) return false;
  if ((($0 = this._entries.$index(this._nextValidIndex)) == null ? null == (const$0001) : $0 === const$0001)) {
    this._advance();
  }
  return this._nextValidIndex < this._entries.get$length();
}
HashSetIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  var res = this._entries.$index(this._nextValidIndex);
  this._advance();
  return res;
}
HashSetIterator.prototype._advance = function() {
  var length = this._entries.get$length();
  var entry;
  var deletedKey = const$0001;
  do {
    if (++this._nextValidIndex >= length) break;
    entry = this._entries.$index(this._nextValidIndex);
  }
  while ((null == entry) || ((null == entry ? null == (deletedKey) : entry === deletedKey)))
}
HashSetIterator.prototype.next$0 = HashSetIterator.prototype.next;
// ********** Code for _DeletedKeySentinel **************
function _DeletedKeySentinel() {

}
// ********** Code for DoubleLinkedQueue **************
function DoubleLinkedQueue() {}
DoubleLinkedQueue.prototype.forEach = function(f) {
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    f(entry._element);
    entry = nextEntry;
  }
}
DoubleLinkedQueue.prototype.iterator = function() {
  return new _DoubleLinkedQueueIterator(this._sentinel);
}
DoubleLinkedQueue.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _DoubleLinkedQueueIterator **************
function _DoubleLinkedQueueIterator(_sentinel) {
  this._sentinel = _sentinel;
  this._currentEntry = this._sentinel;
}
_DoubleLinkedQueueIterator.prototype.hasNext = function() {
  var $0;
  return (($0 = this._currentEntry._next) == null ? null != (this._sentinel) : $0 !== this._sentinel);
}
_DoubleLinkedQueueIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  this._currentEntry = this._currentEntry._next;
  return this._currentEntry.get$element();
}
_DoubleLinkedQueueIterator.prototype.next$0 = _DoubleLinkedQueueIterator.prototype.next;
// ********** Code for StringBufferImpl **************
function StringBufferImpl(content) {
  this.clear();
  this.add(content);
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString();
  if (null == str || str.isEmpty()) return this;
  this._buffer.add(str);
  this._length = this._length + str.length;
  return this;
}
StringBufferImpl.prototype.clear = function() {
  this._buffer = new Array();
  this._length = (0);
  return this;
}
StringBufferImpl.prototype.toString = function() {
  if (this._buffer.get$length() == (0)) return "";
  if (this._buffer.get$length() == (1)) return this._buffer.$index((0));
  var result = StringBase.concatAll(this._buffer);
  this._buffer.clear();
  this._buffer.add(result);
  return result;
}
// ********** Code for StringBase **************
function StringBase() {}
StringBase.join = function(strings, separator) {
  if (strings.get$length() == (0)) return "";
  var s = strings.$index((0));
  for (var i = (1);
   i < strings.get$length(); i++) {
    s = $add($add(s, separator), strings.$index(i));
  }
  return s;
}
StringBase.concatAll = function(strings) {
  return StringBase.join(strings, "");
}
// ********** Code for StringImplementation **************
StringImplementation = String;
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
// ********** Code for _Worker **************
// ********** Code for _ArgumentMismatchException **************
/** Implements extends for Dart classes on JavaScript prototypes. */
function $inherits(child, parent) {
  if (child.prototype.__proto__) {
    child.prototype.__proto__ = parent.prototype;
  } else {
    function tmp() {};
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
  }
}
$inherits(_ArgumentMismatchException, ClosureArgumentMismatchException);
function _ArgumentMismatchException(_message) {
  this._dart_coreimpl_message = _message;
  ClosureArgumentMismatchException.call(this);
}
_ArgumentMismatchException.prototype.toString = function() {
  return ("Closure argument mismatch: " + this._dart_coreimpl_message);
}
// ********** Code for _FunctionImplementation **************
_FunctionImplementation = Function;
_FunctionImplementation.prototype._genStub = function(argsLength, names) {
      // Fast path #1: if no named arguments and arg count matches
      if (this.length == argsLength && !names) {
        return this;
      }

      var paramsNamed = this.$optional ? (this.$optional.length / 2) : 0;
      var paramsBare = this.length - paramsNamed;
      var argsNamed = names ? names.length : 0;
      var argsBare = argsLength - argsNamed;

      // Check we got the right number of arguments
      if (argsBare < paramsBare || argsLength > this.length ||
          argsNamed > paramsNamed) {
        return function() {
          $throw(new _ArgumentMismatchException(
            'Wrong number of arguments to function. Expected ' + paramsBare +
            ' positional arguments and at most ' + paramsNamed +
            ' named arguments, but got ' + argsBare +
            ' positional arguments and ' + argsNamed + ' named arguments.'));
        };
      }

      // First, fill in all of the default values
      var p = new Array(paramsBare);
      if (paramsNamed) {
        p = p.concat(this.$optional.slice(paramsNamed));
      }
      // Fill in positional args
      var a = new Array(argsLength);
      for (var i = 0; i < argsBare; i++) {
        p[i] = a[i] = '$' + i;
      }
      // Then overwrite with supplied values for optional args
      var lastParameterIndex;
      var namesInOrder = true;
      for (var i = 0; i < argsNamed; i++) {
        var name = names[i];
        a[i + argsBare] = name;
        var j = this.$optional.indexOf(name);
        if (j < 0 || j >= paramsNamed) {
          return function() {
            $throw(new _ArgumentMismatchException(
              'Named argument "' + name + '" was not expected by function.' +
              ' Did you forget to mark the function parameter [optional]?'));
          };
        } else if (lastParameterIndex && lastParameterIndex > j) {
          namesInOrder = false;
        }
        p[j + paramsBare] = name;
        lastParameterIndex = j;
      }

      if (this.length == argsLength && namesInOrder) {
        // Fast path #2: named arguments, but they're in order and all supplied.
        return this;
      }

      // Note: using Function instead of 'eval' to get a clean scope.
      // TODO(jmesserly): evaluate the performance of these stubs.
      var f = 'function(' + a.join(',') + '){return $f(' + p.join(',') + ');}';
      return new Function('$f', 'return ' + f + '').call(null, this);
    
}
// ********** Code for top level **************
//  ********** Library dom **************
// ********** Code for DOMTypeJs **************
function $dynamic(name) {
  var f = Object.prototype[name];
  if (f && f.methods) return f.methods;

  var methods = {};
  if (f) methods.Object = f;
  function $dynamicBind() {
    // Find the target method
    var obj = this;
    var tag = obj.$typeNameOf();
    var method = methods[tag];
    if (!method) {
      var table = $dynamicMetadata;
      for (var i = 0; i < table.length; i++) {
        var entry = table[i];
        if (entry.map.hasOwnProperty(tag)) {
          method = methods[entry.tag];
          if (method) break;
        }
      }
    }
    method = method || methods.Object;
    var proto = Object.getPrototypeOf(obj);
    if (!proto.hasOwnProperty(name)) {
      $defProp(proto, name, method);
    }

    return method.apply(this, Array.prototype.slice.call(arguments));
  };
  $dynamicBind.methods = methods;
  $defProp(Object.prototype, name, $dynamicBind);
  return methods;
}
if (typeof $dynamicMetadata == 'undefined') $dynamicMetadata = [];

function $dynamicSetMetadata(inputTable) {
  // TODO: Deal with light isolates.
  var table = [];
  for (var i = 0; i < inputTable.length; i++) {
    var tag = inputTable[i][0];
    var tags = inputTable[i][1];
    var map = {};
    var tagNames = tags.split('|');
    for (var j = 0; j < tagNames.length; j++) {
      map[tagNames[j]] = true;
    }
    table.push({tag: tag, tags: tags, map: map});
  }
  $dynamicMetadata = table;
}
$dynamic("get$dartObjectLocalStorage").DOMType = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMType = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for AbstractWorkerJs **************
// ********** Code for ArrayBufferJs **************
// ********** Code for ArrayBufferViewJs **************
// ********** Code for NodeJs **************
// ********** Code for AttrJs **************
// ********** Code for AudioBufferJs **************
// ********** Code for AudioNodeJs **************
// ********** Code for AudioSourceNodeJs **************
// ********** Code for AudioBufferSourceNodeJs **************
// ********** Code for AudioChannelMergerJs **************
// ********** Code for AudioChannelSplitterJs **************
// ********** Code for AudioContextJs **************
// ********** Code for AudioDestinationNodeJs **************
// ********** Code for AudioParamJs **************
// ********** Code for AudioGainJs **************
// ********** Code for AudioGainNodeJs **************
// ********** Code for AudioListenerJs **************
// ********** Code for AudioPannerNodeJs **************
// ********** Code for EventJs **************
// ********** Code for AudioProcessingEventJs **************
// ********** Code for BarInfoJs **************
// ********** Code for BeforeLoadEventJs **************
// ********** Code for BiquadFilterNodeJs **************
// ********** Code for BlobJs **************
// ********** Code for CharacterDataJs **************
// ********** Code for TextJs **************
// ********** Code for CDATASectionJs **************
// ********** Code for CSSRuleJs **************
// ********** Code for CSSCharsetRuleJs **************
// ********** Code for CSSFontFaceRuleJs **************
// ********** Code for CSSImportRuleJs **************
// ********** Code for CSSMediaRuleJs **************
// ********** Code for CSSPageRuleJs **************
// ********** Code for CSSValueJs **************
// ********** Code for CSSPrimitiveValueJs **************
// ********** Code for CSSRuleListJs **************
// ********** Code for CSSStyleDeclarationJs **************
// ********** Code for CSSStyleRuleJs **************
// ********** Code for StyleSheetJs **************
// ********** Code for CSSStyleSheetJs **************
// ********** Code for CSSUnknownRuleJs **************
// ********** Code for CSSValueListJs **************
// ********** Code for CanvasGradientJs **************
// ********** Code for CanvasPatternJs **************
// ********** Code for CanvasPixelArrayJs **************
$dynamic("get$length").CanvasPixelArray = function() {
  return this.length;
}
$dynamic("$index").CanvasPixelArray = function(index) {
  return this[index];
}
$dynamic("iterator").CanvasPixelArray = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").CanvasPixelArray = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").CanvasPixelArray = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").CanvasPixelArray = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").CanvasPixelArray = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for CanvasRenderingContextJs **************
// ********** Code for CanvasRenderingContext2DJs **************
// ********** Code for ClientRectJs **************
// ********** Code for ClientRectListJs **************
// ********** Code for ClipboardJs **************
// ********** Code for CloseEventJs **************
// ********** Code for CommentJs **************
// ********** Code for UIEventJs **************
// ********** Code for CompositionEventJs **************
// ********** Code for ConsoleJs **************
ConsoleJs = (typeof console == 'undefined' ? {} : console);
ConsoleJs.get$dartObjectLocalStorage = function() { return this.dartObjectLocalStorage; };
ConsoleJs.set$dartObjectLocalStorage = function(value) { return this.dartObjectLocalStorage = value; };
ConsoleJs.error$1 = ConsoleJs.error;
// ********** Code for ConvolverNodeJs **************
// ********** Code for CoordinatesJs **************
// ********** Code for CounterJs **************
// ********** Code for CryptoJs **************
// ********** Code for CustomEventJs **************
// ********** Code for DOMApplicationCacheJs **************
// ********** Code for DOMExceptionJs **************
// ********** Code for DOMFileSystemJs **************
// ********** Code for DOMFileSystemSyncJs **************
// ********** Code for DOMFormDataJs **************
// ********** Code for DOMImplementationJs **************
// ********** Code for DOMMimeTypeJs **************
// ********** Code for DOMMimeTypeArrayJs **************
// ********** Code for DOMParserJs **************
// ********** Code for DOMPluginJs **************
// ********** Code for DOMPluginArrayJs **************
// ********** Code for DOMSelectionJs **************
// ********** Code for DOMTokenListJs **************
// ********** Code for DOMSettableTokenListJs **************
// ********** Code for DOMURLJs **************
// ********** Code for DOMWindowJs **************
$dynamic("setTimeout$2").DOMWindow = function($0, $1) {
  return this.setTimeout($wrap_call$0(to$call$0($0)), $1);
};
// ********** Code for DataTransferItemJs **************
// ********** Code for DataTransferItemListJs **************
// ********** Code for DataViewJs **************
// ********** Code for DatabaseJs **************
// ********** Code for DatabaseSyncJs **************
// ********** Code for WorkerContextJs **************
$dynamic("setTimeout$2").WorkerContext = function($0, $1) {
  return this.setTimeout($wrap_call$0(to$call$0($0)), $1);
};
// ********** Code for DedicatedWorkerContextJs **************
// ********** Code for DelayNodeJs **************
// ********** Code for DeviceMotionEventJs **************
// ********** Code for DeviceOrientationEventJs **************
// ********** Code for EntryJs **************
// ********** Code for DirectoryEntryJs **************
// ********** Code for EntrySyncJs **************
// ********** Code for DirectoryEntrySyncJs **************
// ********** Code for DirectoryReaderJs **************
// ********** Code for DirectoryReaderSyncJs **************
// ********** Code for DocumentJs **************
$dynamic("get$documentElement").Document = function() {
  return this.documentElement;
}
// ********** Code for DocumentFragmentJs **************
// ********** Code for DocumentTypeJs **************
// ********** Code for DynamicsCompressorNodeJs **************
// ********** Code for ElementJs **************
// ********** Code for ElementTimeControlJs **************
// ********** Code for ElementTraversalJs **************
// ********** Code for EntityJs **************
// ********** Code for EntityReferenceJs **************
// ********** Code for EntryArrayJs **************
// ********** Code for EntryArraySyncJs **************
// ********** Code for ErrorEventJs **************
// ********** Code for EventExceptionJs **************
// ********** Code for EventSourceJs **************
// ********** Code for EventTargetJs **************
// ********** Code for FileJs **************
// ********** Code for FileEntryJs **************
// ********** Code for FileEntrySyncJs **************
// ********** Code for FileErrorJs **************
// ********** Code for FileExceptionJs **************
// ********** Code for FileListJs **************
// ********** Code for FileReaderJs **************
// ********** Code for FileReaderSyncJs **************
// ********** Code for FileWriterJs **************
// ********** Code for FileWriterSyncJs **************
// ********** Code for Float32ArrayJs **************
var Float32ArrayJs = {};
$dynamic("get$length").Float32Array = function() {
  return this.length;
}
$dynamic("$index").Float32Array = function(index) {
  return this[index];
}
$dynamic("iterator").Float32Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").Float32Array = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").Float32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for Float64ArrayJs **************
var Float64ArrayJs = {};
$dynamic("get$length").Float64Array = function() {
  return this.length;
}
$dynamic("$index").Float64Array = function(index) {
  return this[index];
}
$dynamic("iterator").Float64Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float64Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float64Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").Float64Array = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").Float64Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for GeolocationJs **************
// ********** Code for GeopositionJs **************
// ********** Code for HTMLAllCollectionJs **************
// ********** Code for HTMLElementJs **************
// ********** Code for HTMLAnchorElementJs **************
// ********** Code for HTMLAppletElementJs **************
// ********** Code for HTMLAreaElementJs **************
// ********** Code for HTMLMediaElementJs **************
// ********** Code for HTMLAudioElementJs **************
// ********** Code for HTMLBRElementJs **************
// ********** Code for HTMLBaseElementJs **************
// ********** Code for HTMLBaseFontElementJs **************
// ********** Code for HTMLBodyElementJs **************
// ********** Code for HTMLButtonElementJs **************
// ********** Code for HTMLCanvasElementJs **************
// ********** Code for HTMLCollectionJs **************
$dynamic("get$length").HTMLCollection = function() {
  return this.length;
}
$dynamic("$index").HTMLCollection = function(index) {
  return this[index];
}
$dynamic("iterator").HTMLCollection = function() {
  return new _FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").HTMLCollection = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").HTMLCollection = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").HTMLCollection = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").HTMLCollection = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for HTMLDListElementJs **************
// ********** Code for HTMLDataListElementJs **************
// ********** Code for HTMLDetailsElementJs **************
// ********** Code for HTMLDirectoryElementJs **************
// ********** Code for HTMLDivElementJs **************
// ********** Code for HTMLDocumentJs **************
// ********** Code for HTMLEmbedElementJs **************
// ********** Code for HTMLFieldSetElementJs **************
// ********** Code for HTMLFontElementJs **************
// ********** Code for HTMLFormElementJs **************
// ********** Code for HTMLFrameElementJs **************
// ********** Code for HTMLFrameSetElementJs **************
// ********** Code for HTMLHRElementJs **************
// ********** Code for HTMLHeadElementJs **************
// ********** Code for HTMLHeadingElementJs **************
// ********** Code for HTMLHtmlElementJs **************
// ********** Code for HTMLIFrameElementJs **************
// ********** Code for HTMLImageElementJs **************
// ********** Code for HTMLInputElementJs **************
// ********** Code for HTMLIsIndexElementJs **************
// ********** Code for HTMLKeygenElementJs **************
// ********** Code for HTMLLIElementJs **************
// ********** Code for HTMLLabelElementJs **************
// ********** Code for HTMLLegendElementJs **************
// ********** Code for HTMLLinkElementJs **************
// ********** Code for HTMLMapElementJs **************
// ********** Code for HTMLMarqueeElementJs **************
// ********** Code for HTMLMenuElementJs **************
// ********** Code for HTMLMetaElementJs **************
// ********** Code for HTMLMeterElementJs **************
// ********** Code for HTMLModElementJs **************
// ********** Code for HTMLOListElementJs **************
// ********** Code for HTMLObjectElementJs **************
// ********** Code for HTMLOptGroupElementJs **************
// ********** Code for HTMLOptionElementJs **************
// ********** Code for HTMLOptionsCollectionJs **************
$dynamic("get$length").HTMLOptionsCollection = function() {
  return this.length;
}
// ********** Code for HTMLOutputElementJs **************
// ********** Code for HTMLParagraphElementJs **************
// ********** Code for HTMLParamElementJs **************
// ********** Code for HTMLPreElementJs **************
// ********** Code for HTMLProgressElementJs **************
// ********** Code for HTMLPropertiesCollectionJs **************
$dynamic("get$length").HTMLPropertiesCollection = function() {
  return this.length;
}
// ********** Code for HTMLQuoteElementJs **************
// ********** Code for HTMLScriptElementJs **************
// ********** Code for HTMLSelectElementJs **************
// ********** Code for HTMLSourceElementJs **************
// ********** Code for HTMLSpanElementJs **************
// ********** Code for HTMLStyleElementJs **************
// ********** Code for HTMLTableCaptionElementJs **************
// ********** Code for HTMLTableCellElementJs **************
// ********** Code for HTMLTableColElementJs **************
// ********** Code for HTMLTableElementJs **************
// ********** Code for HTMLTableRowElementJs **************
// ********** Code for HTMLTableSectionElementJs **************
// ********** Code for HTMLTextAreaElementJs **************
// ********** Code for HTMLTitleElementJs **************
// ********** Code for HTMLTrackElementJs **************
// ********** Code for HTMLUListElementJs **************
// ********** Code for HTMLUnknownElementJs **************
// ********** Code for HTMLVideoElementJs **************
// ********** Code for HashChangeEventJs **************
// ********** Code for HighPass2FilterNodeJs **************
// ********** Code for HistoryJs **************
// ********** Code for IDBAnyJs **************
// ********** Code for IDBCursorJs **************
// ********** Code for IDBCursorWithValueJs **************
// ********** Code for IDBDatabaseJs **************
// ********** Code for IDBDatabaseErrorJs **************
// ********** Code for IDBDatabaseExceptionJs **************
// ********** Code for IDBFactoryJs **************
// ********** Code for IDBIndexJs **************
// ********** Code for IDBKeyJs **************
// ********** Code for IDBKeyRangeJs **************
// ********** Code for IDBObjectStoreJs **************
// ********** Code for IDBRequestJs **************
// ********** Code for IDBTransactionJs **************
// ********** Code for IDBVersionChangeEventJs **************
// ********** Code for IDBVersionChangeRequestJs **************
// ********** Code for ImageDataJs **************
// ********** Code for InjectedScriptHostJs **************
// ********** Code for InspectorFrontendHostJs **************
// ********** Code for Int16ArrayJs **************
var Int16ArrayJs = {};
$dynamic("get$length").Int16Array = function() {
  return this.length;
}
$dynamic("$index").Int16Array = function(index) {
  return this[index];
}
$dynamic("iterator").Int16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int16Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").Int16Array = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").Int16Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for Int32ArrayJs **************
var Int32ArrayJs = {};
$dynamic("get$length").Int32Array = function() {
  return this.length;
}
$dynamic("$index").Int32Array = function(index) {
  return this[index];
}
$dynamic("iterator").Int32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").Int32Array = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").Int32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for Int8ArrayJs **************
var Int8ArrayJs = {};
$dynamic("get$length").Int8Array = function() {
  return this.length;
}
$dynamic("$index").Int8Array = function(index) {
  return this[index];
}
$dynamic("iterator").Int8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int8Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").Int8Array = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").Int8Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for JavaScriptAudioNodeJs **************
// ********** Code for JavaScriptCallFrameJs **************
// ********** Code for KeyboardEventJs **************
// ********** Code for LocationJs **************
// ********** Code for LowPass2FilterNodeJs **************
// ********** Code for MediaControllerJs **************
// ********** Code for MediaElementAudioSourceNodeJs **************
// ********** Code for MediaErrorJs **************
// ********** Code for MediaListJs **************
$dynamic("get$length").MediaList = function() {
  return this.length;
}
$dynamic("$index").MediaList = function(index) {
  return this[index];
}
$dynamic("iterator").MediaList = function() {
  return new _FixedSizeListIterator_dart_core_String(this);
}
$dynamic("add").MediaList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").MediaList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").MediaList = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").MediaList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for MediaQueryListJs **************
// ********** Code for MediaQueryListListenerJs **************
// ********** Code for MemoryInfoJs **************
// ********** Code for MessageChannelJs **************
// ********** Code for MessageEventJs **************
// ********** Code for MessagePortJs **************
// ********** Code for MetadataJs **************
// ********** Code for MouseEventJs **************
// ********** Code for MutationCallbackJs **************
// ********** Code for MutationEventJs **************
// ********** Code for MutationRecordJs **************
// ********** Code for NamedNodeMapJs **************
$dynamic("get$length").NamedNodeMap = function() {
  return this.length;
}
$dynamic("$index").NamedNodeMap = function(index) {
  return this[index];
}
$dynamic("iterator").NamedNodeMap = function() {
  return new _FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").NamedNodeMap = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").NamedNodeMap = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").NamedNodeMap = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").NamedNodeMap = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for NavigatorJs **************
// ********** Code for NodeFilterJs **************
// ********** Code for NodeIteratorJs **************
// ********** Code for NodeListJs **************
$dynamic("get$length").NodeList = function() {
  return this.length;
}
$dynamic("$index").NodeList = function(index) {
  return this[index];
}
$dynamic("iterator").NodeList = function() {
  return new _FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").NodeList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").NodeList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").NodeList = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").NodeList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for NodeSelectorJs **************
// ********** Code for NotationJs **************
// ********** Code for NotificationJs **************
// ********** Code for NotificationCenterJs **************
// ********** Code for OESStandardDerivativesJs **************
// ********** Code for OESTextureFloatJs **************
// ********** Code for OESVertexArrayObjectJs **************
// ********** Code for OfflineAudioCompletionEventJs **************
// ********** Code for OperationNotAllowedExceptionJs **************
// ********** Code for OverflowEventJs **************
// ********** Code for PageTransitionEventJs **************
// ********** Code for PerformanceJs **************
// ********** Code for PerformanceNavigationJs **************
// ********** Code for PerformanceTimingJs **************
// ********** Code for PointerLockJs **************
// ********** Code for PopStateEventJs **************
// ********** Code for PositionErrorJs **************
// ********** Code for ProcessingInstructionJs **************
// ********** Code for ProgressEventJs **************
// ********** Code for RGBColorJs **************
// ********** Code for RangeJs **************
// ********** Code for RangeExceptionJs **************
// ********** Code for RealtimeAnalyserNodeJs **************
// ********** Code for RectJs **************
// ********** Code for SQLErrorJs **************
// ********** Code for SQLExceptionJs **************
// ********** Code for SQLResultSetJs **************
// ********** Code for SQLResultSetRowListJs **************
// ********** Code for SQLTransactionJs **************
// ********** Code for SQLTransactionSyncJs **************
// ********** Code for SVGElementJs **************
// ********** Code for SVGAElementJs **************
// ********** Code for SVGAltGlyphDefElementJs **************
// ********** Code for SVGTextContentElementJs **************
// ********** Code for SVGTextPositioningElementJs **************
// ********** Code for SVGAltGlyphElementJs **************
// ********** Code for SVGAltGlyphItemElementJs **************
// ********** Code for SVGAngleJs **************
// ********** Code for SVGAnimationElementJs **************
// ********** Code for SVGAnimateColorElementJs **************
// ********** Code for SVGAnimateElementJs **************
// ********** Code for SVGAnimateMotionElementJs **************
// ********** Code for SVGAnimateTransformElementJs **************
// ********** Code for SVGAnimatedAngleJs **************
// ********** Code for SVGAnimatedBooleanJs **************
// ********** Code for SVGAnimatedEnumerationJs **************
// ********** Code for SVGAnimatedIntegerJs **************
// ********** Code for SVGAnimatedLengthJs **************
// ********** Code for SVGAnimatedLengthListJs **************
// ********** Code for SVGAnimatedNumberJs **************
// ********** Code for SVGAnimatedNumberListJs **************
// ********** Code for SVGAnimatedPreserveAspectRatioJs **************
// ********** Code for SVGAnimatedRectJs **************
// ********** Code for SVGAnimatedStringJs **************
// ********** Code for SVGAnimatedTransformListJs **************
// ********** Code for SVGCircleElementJs **************
// ********** Code for SVGClipPathElementJs **************
// ********** Code for SVGColorJs **************
// ********** Code for SVGComponentTransferFunctionElementJs **************
// ********** Code for SVGCursorElementJs **************
// ********** Code for SVGDefsElementJs **************
// ********** Code for SVGDescElementJs **************
// ********** Code for SVGDocumentJs **************
$dynamic("get$rootElement").SVGDocument = function() {
  return this.rootElement;
}
// ********** Code for SVGElementInstanceJs **************
// ********** Code for SVGElementInstanceListJs **************
// ********** Code for SVGEllipseElementJs **************
// ********** Code for SVGExceptionJs **************
// ********** Code for SVGExternalResourcesRequiredJs **************
// ********** Code for SVGFEBlendElementJs **************
// ********** Code for SVGFEColorMatrixElementJs **************
// ********** Code for SVGFEComponentTransferElementJs **************
// ********** Code for SVGFECompositeElementJs **************
// ********** Code for SVGFEConvolveMatrixElementJs **************
// ********** Code for SVGFEDiffuseLightingElementJs **************
// ********** Code for SVGFEDisplacementMapElementJs **************
// ********** Code for SVGFEDistantLightElementJs **************
// ********** Code for SVGFEDropShadowElementJs **************
// ********** Code for SVGFEFloodElementJs **************
// ********** Code for SVGFEFuncAElementJs **************
// ********** Code for SVGFEFuncBElementJs **************
// ********** Code for SVGFEFuncGElementJs **************
// ********** Code for SVGFEFuncRElementJs **************
// ********** Code for SVGFEGaussianBlurElementJs **************
// ********** Code for SVGFEImageElementJs **************
// ********** Code for SVGFEMergeElementJs **************
// ********** Code for SVGFEMergeNodeElementJs **************
// ********** Code for SVGFEMorphologyElementJs **************
// ********** Code for SVGFEOffsetElementJs **************
// ********** Code for SVGFEPointLightElementJs **************
// ********** Code for SVGFESpecularLightingElementJs **************
// ********** Code for SVGFESpotLightElementJs **************
// ********** Code for SVGFETileElementJs **************
// ********** Code for SVGFETurbulenceElementJs **************
// ********** Code for SVGFilterElementJs **************
// ********** Code for SVGStylableJs **************
// ********** Code for SVGFilterPrimitiveStandardAttributesJs **************
// ********** Code for SVGFitToViewBoxJs **************
// ********** Code for SVGFontElementJs **************
// ********** Code for SVGFontFaceElementJs **************
// ********** Code for SVGFontFaceFormatElementJs **************
// ********** Code for SVGFontFaceNameElementJs **************
// ********** Code for SVGFontFaceSrcElementJs **************
// ********** Code for SVGFontFaceUriElementJs **************
// ********** Code for SVGForeignObjectElementJs **************
// ********** Code for SVGGElementJs **************
// ********** Code for SVGGlyphElementJs **************
// ********** Code for SVGGlyphRefElementJs **************
// ********** Code for SVGGradientElementJs **************
// ********** Code for SVGHKernElementJs **************
// ********** Code for SVGImageElementJs **************
// ********** Code for SVGLangSpaceJs **************
// ********** Code for SVGLengthJs **************
// ********** Code for SVGLengthListJs **************
// ********** Code for SVGLineElementJs **************
// ********** Code for SVGLinearGradientElementJs **************
// ********** Code for SVGLocatableJs **************
// ********** Code for SVGMPathElementJs **************
// ********** Code for SVGMarkerElementJs **************
// ********** Code for SVGMaskElementJs **************
// ********** Code for SVGMatrixJs **************
// ********** Code for SVGMetadataElementJs **************
// ********** Code for SVGMissingGlyphElementJs **************
// ********** Code for SVGNumberJs **************
// ********** Code for SVGNumberListJs **************
// ********** Code for SVGPaintJs **************
// ********** Code for SVGPathElementJs **************
// ********** Code for SVGPathSegJs **************
// ********** Code for SVGPathSegArcAbsJs **************
// ********** Code for SVGPathSegArcRelJs **************
// ********** Code for SVGPathSegClosePathJs **************
// ********** Code for SVGPathSegCurvetoCubicAbsJs **************
// ********** Code for SVGPathSegCurvetoCubicRelJs **************
// ********** Code for SVGPathSegCurvetoCubicSmoothAbsJs **************
// ********** Code for SVGPathSegCurvetoCubicSmoothRelJs **************
// ********** Code for SVGPathSegCurvetoQuadraticAbsJs **************
// ********** Code for SVGPathSegCurvetoQuadraticRelJs **************
// ********** Code for SVGPathSegCurvetoQuadraticSmoothAbsJs **************
// ********** Code for SVGPathSegCurvetoQuadraticSmoothRelJs **************
// ********** Code for SVGPathSegLinetoAbsJs **************
// ********** Code for SVGPathSegLinetoHorizontalAbsJs **************
// ********** Code for SVGPathSegLinetoHorizontalRelJs **************
// ********** Code for SVGPathSegLinetoRelJs **************
// ********** Code for SVGPathSegLinetoVerticalAbsJs **************
// ********** Code for SVGPathSegLinetoVerticalRelJs **************
// ********** Code for SVGPathSegListJs **************
// ********** Code for SVGPathSegMovetoAbsJs **************
// ********** Code for SVGPathSegMovetoRelJs **************
// ********** Code for SVGPatternElementJs **************
// ********** Code for SVGPointJs **************
// ********** Code for SVGPointListJs **************
// ********** Code for SVGPolygonElementJs **************
// ********** Code for SVGPolylineElementJs **************
// ********** Code for SVGPreserveAspectRatioJs **************
// ********** Code for SVGRadialGradientElementJs **************
// ********** Code for SVGRectJs **************
// ********** Code for SVGRectElementJs **************
// ********** Code for SVGRenderingIntentJs **************
// ********** Code for SVGSVGElementJs **************
// ********** Code for SVGScriptElementJs **************
// ********** Code for SVGSetElementJs **************
// ********** Code for SVGStopElementJs **************
// ********** Code for SVGStringListJs **************
// ********** Code for SVGStyleElementJs **************
// ********** Code for SVGSwitchElementJs **************
// ********** Code for SVGSymbolElementJs **************
// ********** Code for SVGTRefElementJs **************
// ********** Code for SVGTSpanElementJs **************
// ********** Code for SVGTestsJs **************
// ********** Code for SVGTextElementJs **************
// ********** Code for SVGTextPathElementJs **************
// ********** Code for SVGTitleElementJs **************
// ********** Code for SVGTransformJs **************
// ********** Code for SVGTransformListJs **************
// ********** Code for SVGTransformableJs **************
// ********** Code for SVGURIReferenceJs **************
// ********** Code for SVGUnitTypesJs **************
// ********** Code for SVGUseElementJs **************
// ********** Code for SVGVKernElementJs **************
// ********** Code for SVGViewElementJs **************
// ********** Code for SVGZoomAndPanJs **************
// ********** Code for SVGViewSpecJs **************
// ********** Code for SVGZoomEventJs **************
// ********** Code for ScreenJs **************
// ********** Code for ScriptProfileJs **************
// ********** Code for ScriptProfileNodeJs **************
// ********** Code for SharedWorkerJs **************
// ********** Code for SharedWorkerContextJs **************
// ********** Code for SpeechInputEventJs **************
// ********** Code for SpeechInputResultJs **************
// ********** Code for SpeechInputResultListJs **************
// ********** Code for StorageJs **************
$dynamic("get$dartObjectLocalStorage").Storage = function() {
      if (this === window.localStorage)
        return window._dartLocalStorageLocalStorage;
      else if (this === window.sessionStorage)
        return window._dartSessionStorageLocalStorage;
      else
        throw new UnsupportedOperationException('Cannot dartObjectLocalStorage for unknown Storage object.');
}
$dynamic("set$dartObjectLocalStorage").Storage = function(value) {
      if (this === window.localStorage)
        window._dartLocalStorageLocalStorage = value;
      else if (this === window.sessionStorage)
        window._dartSessionStorageLocalStorage = value;
      else
        throw new UnsupportedOperationException('Cannot dartObjectLocalStorage for unknown Storage object.');
}
// ********** Code for StorageEventJs **************
// ********** Code for StorageInfoJs **************
// ********** Code for StyleMediaJs **************
// ********** Code for StyleSheetListJs **************
$dynamic("get$length").StyleSheetList = function() {
  return this.length;
}
$dynamic("$index").StyleSheetList = function(index) {
  return this[index];
}
$dynamic("iterator").StyleSheetList = function() {
  return new _FixedSizeListIterator_dom_StyleSheet(this);
}
$dynamic("add").StyleSheetList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").StyleSheetList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").StyleSheetList = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").StyleSheetList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for TextEventJs **************
// ********** Code for TextMetricsJs **************
// ********** Code for TextTrackJs **************
// ********** Code for TextTrackCueJs **************
// ********** Code for TextTrackCueListJs **************
// ********** Code for TextTrackListJs **************
// ********** Code for TimeRangesJs **************
// ********** Code for TouchJs **************
// ********** Code for TouchEventJs **************
// ********** Code for TouchListJs **************
$dynamic("get$length").TouchList = function() {
  return this.length;
}
$dynamic("$index").TouchList = function(index) {
  return this[index];
}
$dynamic("iterator").TouchList = function() {
  return new _FixedSizeListIterator_dom_Touch(this);
}
$dynamic("add").TouchList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").TouchList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").TouchList = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").TouchList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for TrackEventJs **************
// ********** Code for TreeWalkerJs **************
// ********** Code for Uint16ArrayJs **************
var Uint16ArrayJs = {};
$dynamic("get$length").Uint16Array = function() {
  return this.length;
}
$dynamic("$index").Uint16Array = function(index) {
  return this[index];
}
$dynamic("iterator").Uint16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint16Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").Uint16Array = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").Uint16Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for Uint32ArrayJs **************
var Uint32ArrayJs = {};
$dynamic("get$length").Uint32Array = function() {
  return this.length;
}
$dynamic("$index").Uint32Array = function(index) {
  return this[index];
}
$dynamic("iterator").Uint32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").Uint32Array = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").Uint32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for Uint8ArrayJs **************
var Uint8ArrayJs = {};
$dynamic("get$length").Uint8Array = function() {
  return this.length;
}
$dynamic("$index").Uint8Array = function(index) {
  return this[index];
}
$dynamic("iterator").Uint8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint8Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("insertRange").Uint8Array = function(start, length, initialValue) {
  $throw(new UnsupportedOperationException("Cannot insertRange on immutable List."));
}
$dynamic("forEach$1").Uint8Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for ValidityStateJs **************
// ********** Code for WaveShaperNodeJs **************
// ********** Code for WebGLActiveInfoJs **************
// ********** Code for WebGLBufferJs **************
// ********** Code for WebGLCompressedTexturesJs **************
// ********** Code for WebGLContextAttributesJs **************
// ********** Code for WebGLContextEventJs **************
// ********** Code for WebGLDebugRendererInfoJs **************
// ********** Code for WebGLDebugShadersJs **************
// ********** Code for WebGLFramebufferJs **************
// ********** Code for WebGLLoseContextJs **************
// ********** Code for WebGLProgramJs **************
// ********** Code for WebGLRenderbufferJs **************
// ********** Code for WebGLRenderingContextJs **************
// ********** Code for WebGLShaderJs **************
// ********** Code for WebGLTextureJs **************
// ********** Code for WebGLUniformLocationJs **************
// ********** Code for WebGLVertexArrayObjectOESJs **************
// ********** Code for WebKitAnimationJs **************
// ********** Code for WebKitAnimationEventJs **************
// ********** Code for WebKitAnimationListJs **************
// ********** Code for WebKitBlobBuilderJs **************
// ********** Code for WebKitCSSFilterValueJs **************
// ********** Code for WebKitCSSKeyframeRuleJs **************
// ********** Code for WebKitCSSKeyframesRuleJs **************
// ********** Code for WebKitCSSMatrixJs **************
// ********** Code for WebKitCSSTransformValueJs **************
// ********** Code for WebKitMutationObserverJs **************
// ********** Code for WebKitNamedFlowJs **************
// ********** Code for WebKitPointJs **************
// ********** Code for WebKitTransitionEventJs **************
// ********** Code for WebSocketJs **************
// ********** Code for WheelEventJs **************
// ********** Code for WorkerJs **************
// ********** Code for WorkerLocationJs **************
// ********** Code for WorkerNavigatorJs **************
// ********** Code for XMLHttpRequestJs **************
// ********** Code for XMLHttpRequestExceptionJs **************
// ********** Code for XMLHttpRequestProgressEventJs **************
// ********** Code for XMLHttpRequestUploadJs **************
// ********** Code for XMLSerializerJs **************
// ********** Code for XPathEvaluatorJs **************
// ********** Code for XPathExceptionJs **************
// ********** Code for XPathExpressionJs **************
// ********** Code for XPathNSResolverJs **************
// ********** Code for XPathResultJs **************
// ********** Code for XSLTProcessorJs **************
// ********** Code for _Collections **************
function _Collections() {}
_Collections.forEach = function(iterable, f) {
  for (var $$i = iterable.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    f(e);
  }
}
// ********** Code for _AudioContextFactoryProvider **************
function _AudioContextFactoryProvider() {}
// ********** Code for _FileReaderFactoryProvider **************
function _FileReaderFactoryProvider() {}
// ********** Code for _TypedArrayFactoryProvider **************
function _TypedArrayFactoryProvider() {}
// ********** Code for _WebKitCSSMatrixFactoryProvider **************
function _WebKitCSSMatrixFactoryProvider() {}
// ********** Code for _WebKitPointFactoryProvider **************
function _WebKitPointFactoryProvider() {}
// ********** Code for _WebSocketFactoryProvider **************
function _WebSocketFactoryProvider() {}
// ********** Code for _XMLHttpRequestFactoryProvider **************
function _XMLHttpRequestFactoryProvider() {}
// ********** Code for _VariableSizeListIterator **************
function _VariableSizeListIterator() {}
_VariableSizeListIterator.prototype.hasNext = function() {
  return this._dom_array.get$length() > this._dom_pos;
}
_VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  return this._dom_array.$index(this._dom_pos++);
}
_VariableSizeListIterator.prototype.next$0 = _VariableSizeListIterator.prototype.next;
// ********** Code for _FixedSizeListIterator **************
$inherits(_FixedSizeListIterator, _VariableSizeListIterator);
function _FixedSizeListIterator() {}
_FixedSizeListIterator.prototype.hasNext = function() {
  return this._dom_length > this._dom_pos;
}
// ********** Code for _VariableSizeListIterator_dom_Node **************
$inherits(_VariableSizeListIterator_dom_Node, _VariableSizeListIterator);
function _VariableSizeListIterator_dom_Node(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dom_Node **************
$inherits(_FixedSizeListIterator_dom_Node, _FixedSizeListIterator);
function _FixedSizeListIterator_dom_Node(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_dom_Node.call(this, array);
}
// ********** Code for _VariableSizeListIterator_dart_core_String **************
$inherits(_VariableSizeListIterator_dart_core_String, _VariableSizeListIterator);
function _VariableSizeListIterator_dart_core_String(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dart_core_String **************
$inherits(_FixedSizeListIterator_dart_core_String, _FixedSizeListIterator);
function _FixedSizeListIterator_dart_core_String(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_dart_core_String.call(this, array);
}
// ********** Code for _VariableSizeListIterator_dom_StyleSheet **************
$inherits(_VariableSizeListIterator_dom_StyleSheet, _VariableSizeListIterator);
function _VariableSizeListIterator_dom_StyleSheet(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dom_StyleSheet **************
$inherits(_FixedSizeListIterator_dom_StyleSheet, _FixedSizeListIterator);
function _FixedSizeListIterator_dom_StyleSheet(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_dom_StyleSheet.call(this, array);
}
// ********** Code for _VariableSizeListIterator_dom_Touch **************
$inherits(_VariableSizeListIterator_dom_Touch, _VariableSizeListIterator);
function _VariableSizeListIterator_dom_Touch(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dom_Touch **************
$inherits(_FixedSizeListIterator_dom_Touch, _FixedSizeListIterator);
function _FixedSizeListIterator_dom_Touch(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_dom_Touch.call(this, array);
}
// ********** Code for _VariableSizeListIterator_int **************
$inherits(_VariableSizeListIterator_int, _VariableSizeListIterator);
function _VariableSizeListIterator_int(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_int **************
$inherits(_FixedSizeListIterator_int, _FixedSizeListIterator);
function _FixedSizeListIterator_int(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_int.call(this, array);
}
// ********** Code for _VariableSizeListIterator_num **************
$inherits(_VariableSizeListIterator_num, _VariableSizeListIterator);
function _VariableSizeListIterator_num(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_num **************
$inherits(_FixedSizeListIterator_num, _FixedSizeListIterator);
function _FixedSizeListIterator_num(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_num.call(this, array);
}
// ********** Code for _Lists **************
function _Lists() {}
// ********** Code for top level **************
function get$window() {
  return window;
}
function get$document() {
  return window.document;
}
//  ********** Library htmlimpl **************
// ********** Code for LevelDom **************
function LevelDom() {}
LevelDom.wrapDocument = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLDocument":

      return new DocumentWrappingImplementation._wrap$ctor(raw, raw.get$documentElement());

    case "SVGDocument":

      return new SVGDocumentWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapWindow = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new WindowWrappingImplementation._wrap$ctor(raw);
}
LevelDom.initialize = function() {
  $globals.secretWindow = LevelDom.wrapWindow(get$window());
  $globals.secretDocument = LevelDom.wrapDocument(get$document());
}
// ********** Code for DOMWrapperBase **************
DOMWrapperBase._wrap$ctor = function(_ptr) {
  this._ptr = _ptr;
  this._ptr.set$dartObjectLocalStorage(this);
}
DOMWrapperBase._wrap$ctor.prototype = DOMWrapperBase.prototype;
function DOMWrapperBase() {}
// ********** Code for EventTargetWrappingImplementation **************
$inherits(EventTargetWrappingImplementation, DOMWrapperBase);
EventTargetWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EventTargetWrappingImplementation._wrap$ctor.prototype = EventTargetWrappingImplementation.prototype;
function EventTargetWrappingImplementation() {}
// ********** Code for NodeWrappingImplementation **************
$inherits(NodeWrappingImplementation, EventTargetWrappingImplementation);
NodeWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
NodeWrappingImplementation._wrap$ctor.prototype = NodeWrappingImplementation.prototype;
function NodeWrappingImplementation() {}
// ********** Code for ElementWrappingImplementation **************
$inherits(ElementWrappingImplementation, NodeWrappingImplementation);
ElementWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
ElementWrappingImplementation._wrap$ctor.prototype = ElementWrappingImplementation.prototype;
function ElementWrappingImplementation() {}
// ********** Code for DocumentWrappingImplementation **************
$inherits(DocumentWrappingImplementation, ElementWrappingImplementation);
DocumentWrappingImplementation._wrap$ctor = function(_documentPtr, ptr) {
  this._documentPtr = _documentPtr;
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
  this._documentPtr.get$dynamic().set$dartObjectLocalStorage(this);
}
DocumentWrappingImplementation._wrap$ctor.prototype = DocumentWrappingImplementation.prototype;
function DocumentWrappingImplementation() {}
// ********** Code for _ListWrapper **************
function _ListWrapper() {}
_ListWrapper.prototype.iterator = function() {
  return this._list.iterator();
}
_ListWrapper.prototype.forEach = function(f) {
  return this._list.forEach(f);
}
_ListWrapper.prototype.get$length = function() {
  return this._list.get$length();
}
_ListWrapper.prototype.$index = function(index) {
  return this._list.$index(index);
}
_ListWrapper.prototype.add = function(value) {
  return this._list.add(value);
}
_ListWrapper.prototype.clear = function() {
  return this._list.clear();
}
_ListWrapper.prototype.insertRange = function(start, length, initialValue) {
  return this._list.insertRange(start, length, initialValue);
}
_ListWrapper.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for SVGDocumentWrappingImplementation **************
$inherits(SVGDocumentWrappingImplementation, DocumentWrappingImplementation);
SVGDocumentWrappingImplementation._wrap$ctor = function(ptr) {
  DocumentWrappingImplementation._wrap$ctor.call(this, ptr, ptr.get$rootElement());
}
SVGDocumentWrappingImplementation._wrap$ctor.prototype = SVGDocumentWrappingImplementation.prototype;
function SVGDocumentWrappingImplementation() {}
// ********** Code for WindowWrappingImplementation **************
$inherits(WindowWrappingImplementation, EventTargetWrappingImplementation);
WindowWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
WindowWrappingImplementation._wrap$ctor.prototype = WindowWrappingImplementation.prototype;
function WindowWrappingImplementation() {}
WindowWrappingImplementation.prototype.setTimeout = function(handler, timeout) {
  return this._ptr.setTimeout$2(handler, timeout);
}
WindowWrappingImplementation.prototype.setTimeout$2 = function($0, $1) {
  return this.setTimeout(to$call$0($0), $1);
};
// ********** Code for top level **************
var _pendingRequests;
var _pendingMeasurementFrameCallbacks;
//  ********** Library html **************
// ********** Code for top level **************
var secretWindow;
var secretDocument;
function html_get$window() {
  if (null == $globals.secretWindow) {
    LevelDom.initialize();
  }
  return $globals.secretWindow;
}
//  ********** Library json **************
// ********** Code for top level **************
//  ********** Library Reactive Dart **************
// ********** Code for Observable **************
function Observable() {}
Observable.create = function(f) {
  return new _ChainableIObservableImplementation(f);
}
Observable.randomInt = function(low, high, intervalLow, intervalHigh, howMany) {
  return Observable.create((function (o) {
    Observable.random(low, high, intervalLow, intervalHigh, howMany).apply((function (v) {
      return v.ceil();
    })
    ).subscribe((function (v) {
      return o.next(v);
    })
    , (function () {
      return o.complete();
    })
    , (function (e) {
      return o.error(e);
    })
    );
  })
  );
}
Observable.random = function(low, high, intervalLow, intervalHigh, howMany) {
  if (high <= low) return Observable.throwE(const$0000);
  if (intervalHigh < intervalLow) return Observable.throwE(const$0004);
  if (intervalLow < (1) || intervalHigh < (1)) return Observable.throwE(const$0005);
  var delta = high - low;
  var intervalDelta = intervalHigh - intervalLow;
  var ticks = (0);
  var iFunc = (intervalDelta == (0)) ? (function () {
    return intervalLow;
  })
   : (function () {
    return (Math.random() * intervalDelta) + intervalLow;
  })
  ;
  return Observable.create((function (o) {
    function nextNum() {
      o.next((Math.random() * delta) + low);
      if (howMany == null) {
        html_get$window().setTimeout(nextNum, iFunc.call$0());
      }
      else if (howMany != null && ++ticks <= howMany) {
        html_get$window().setTimeout(nextNum, iFunc.call$0());
      }
      else {
        o.complete();
      }
    }
    if (howMany == null) {
      html_get$window().setTimeout(nextNum, iFunc.call$0());
    }
    else if (howMany != null && ++ticks <= howMany) {
      html_get$window().setTimeout(nextNum, iFunc.call$0());
    }
    else {
      o.complete();
    }
  })
  );
}
Observable.throwE = function(e) {
  return Observable.create((function (o) {
    return o.error(e);
  })
  );
}
Observable.apply = function(source, applyFunction) {
  return Observable.create((function (o) {
    source.subscribe((function (v) {
      return o.next(applyFunction(v));
    })
    , (function () {
      return o.complete();
    })
    , (function (e) {
      return o.error(e);
    })
    );
  })
  );
}
Observable.merge = function(sources) {
  var t = (0);
  return Observable.create((function (o) {
    sources.forEach$1((function (source) {
      return source.subscribe((function (v) {
        return o.next(v);
      })
      , (function () {
        if ($eq((t = $add(t, (1))), sources.get$length())) o.complete();
      })
      , (function (e) {
        return o.error(e);
      })
      );
    })
    );
  })
  );
}
// ********** Code for _ChainableIObservableImplementation **************
function _ChainableIObservableImplementation(oFunc) {
  var $this = this; // closure support
  this.oFunc = oFunc;
  this.observers = new Array();
  this.mainObserver = new _DefaultObserver((function (n) {
    return $this.observers.forEach$1((function (o) {
      return o.next$1(n);
    })
    );
  })
  , (function () {
    $this.observers.forEach$1((function (o) {
      return o.complete$0();
    })
    );
    $this.dispose();
  })
  , (function (e) {
    $this.err = e;
    $this.observers.forEach$1((function (o) {
      return o.error$1(e);
    })
    );
    $this.dispose();
  })
  );
}
_ChainableIObservableImplementation.prototype.apply = function(applyFunction) {
  return Observable.apply(this, applyFunction);
}
_ChainableIObservableImplementation.prototype.merge = function(sources) {
  sources.insertRange((0), (1), this);
  return Observable.merge(sources);
}
_ChainableIObservableImplementation.prototype.subscribe = function(next, complete, error) {
  if (this.err != null) {
    if (error != null) error(this.err);
    return;
  }
  if (this.mainObserver == null) {
    if (complete != null) complete();
  }
  if ((typeof(next) == 'function')) {
    return this._addObserver(new _DefaultObserver(next, complete, error));
  }
  else if (!!(next && next.is$IObserver())) {
    return this._addObserver(next);
  }
  else {
    $throw(new ExceptionImplementation("Parameter 'next' must be a Function or a IObserver."));
  }
}
_ChainableIObservableImplementation.prototype._addObserver = function(o) {
  this.observers.add(o);
  if (this.observers.get$length() == (1)) this.oFunc.call$1(this.mainObserver);
  return new _UnsubscriberWrapper(this, o);
}
_ChainableIObservableImplementation.prototype.dispose = function() {
  this.observers.clear();
  this.mainObserver = null;
  this.oFunc = null;
}
_ChainableIObservableImplementation.prototype.subscribe$2 = function($0, $1) {
  return this.subscribe($0, to$call$0($1), to$call$1(null));
};
// ********** Code for _UnsubscriberWrapper **************
function _UnsubscriberWrapper(factoryObservableReference, observer) {
  this.factoryObservableReference = factoryObservableReference;
  this.observer = observer;
}
// ********** Code for _DefaultObserver **************
function _DefaultObserver(next, complete, error) {
  this._assignedHash = $globals._DefaultObserver__hashNum++;
  this.nextFunc = next;
  this.completeFunc = complete == null ? (function () {

  })
   : complete;
  this.errorFunc = error == null ? (function (_) {

  })
   : error;
}
_DefaultObserver.prototype.is$IObserver = function(){return true};
_DefaultObserver.prototype.next = function(value) {
  return this.nextFunc.call$1(value);
}
_DefaultObserver.prototype.error = function(error) {
  return this.errorFunc.call$1(error);
}
_DefaultObserver.prototype.complete = function() {
  return this.completeFunc.call$0();
}
_DefaultObserver.prototype.complete$0 = _DefaultObserver.prototype.complete;
_DefaultObserver.prototype.error$1 = _DefaultObserver.prototype.error;
_DefaultObserver.prototype.next$1 = _DefaultObserver.prototype.next;
// ********** Code for top level **************
//  ********** Library observablemerge **************
// ********** Code for observablemerge **************
function observablemerge() {

}
observablemerge.prototype.run = function() {
  var o1 = Observable.randomInt((0), (100), (1), (1000), (20)).apply((function (v) {
    return ("Observable 1: " + v);
  })
  );
  var o2 = Observable.randomInt((0), (100), (1), (1000), (20)).apply((function (v) {
    return ("Observable 2: " + v);
  })
  );
  var o3 = Observable.randomInt((0), (100), (1), (1000), (20)).apply((function (v) {
    return ("Observable 3: " + v);
  })
  );
  o1.merge([o2, o3]).subscribe$2((function (v) {
    return dart_core_print(("" + v));
  })
  , (function () {
    return dart_core_print("All streams terminated.");
  })
  );
}
// ********** Code for top level **************
function main() {
  new observablemerge().run();
}
// 23 dynamic types.
// 501 types
// 41 !leaf
(function(){
  var v0/*HTMLCollection*/ = 'HTMLCollection|HTMLOptionsCollection|HTMLPropertiesCollection';
  var v1/*Document*/ = 'Document|HTMLDocument|SVGDocument';
  var v2/*WorkerContext*/ = 'WorkerContext|DedicatedWorkerContext|SharedWorkerContext';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['Document', v1/*Document*/]
    , ['HTMLCollection', v0/*HTMLCollection*/]
    , ['WorkerContext', v2/*WorkerContext*/]
    , ['DOMType', [v0/*HTMLCollection*/,v1/*Document*/,v2/*WorkerContext*/,'DOMType|AbstractWorker|SharedWorker|Worker|ArrayBuffer|ArrayBufferView|DataView|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|AudioBuffer|AudioContext|AudioListener|AudioNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioPannerNode|AudioSourceNode|AudioBufferSourceNode|MediaElementAudioSourceNode|BiquadFilterNode|ConvolverNode|DelayNode|DynamicsCompressorNode|HighPass2FilterNode|JavaScriptAudioNode|LowPass2FilterNode|RealtimeAnalyserNode|WaveShaperNode|AudioParam|AudioGain|BarInfo|Blob|File|CSSRule|CSSCharsetRule|CSSFontFaceRule|CSSImportRule|CSSMediaRule|CSSPageRule|CSSStyleRule|CSSUnknownRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule|CSSRuleList|CSSStyleDeclaration|CSSValue|CSSPrimitiveValue|CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|SVGColor|SVGPaint|CanvasGradient|CanvasPattern|CanvasPixelArray|CanvasRenderingContext|CanvasRenderingContext2D|WebGLRenderingContext|ClientRect|ClientRectList|Clipboard|Coordinates|Counter|Crypto|DOMApplicationCache|DOMException|DOMFileSystem|DOMFileSystemSync|DOMFormData|DOMImplementation|DOMMimeType|DOMMimeTypeArray|DOMParser|DOMPlugin|DOMPluginArray|DOMSelection|DOMTokenList|DOMSettableTokenList|DOMURL|DOMWindow|DataTransferItem|DataTransferItemList|Database|DatabaseSync|DirectoryReader|DirectoryReaderSync|ElementTimeControl|ElementTraversal|Entry|DirectoryEntry|FileEntry|EntryArray|EntryArraySync|EntrySync|DirectoryEntrySync|FileEntrySync|Event|AudioProcessingEvent|BeforeLoadEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|HashChangeEvent|IDBVersionChangeEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|XMLHttpRequestProgressEvent|SpeechInputEvent|StorageEvent|TrackEvent|UIEvent|CompositionEvent|KeyboardEvent|MouseEvent|SVGZoomEvent|TextEvent|TouchEvent|WheelEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|EventException|EventSource|EventTarget|FileError|FileException|FileList|FileReader|FileReaderSync|FileWriter|FileWriterSync|Geolocation|Geoposition|HTMLAllCollection|History|IDBAny|IDBCursor|IDBCursorWithValue|IDBDatabase|IDBDatabaseError|IDBDatabaseException|IDBFactory|IDBIndex|IDBKey|IDBKeyRange|IDBObjectStore|IDBRequest|IDBVersionChangeRequest|IDBTransaction|ImageData|InjectedScriptHost|InspectorFrontendHost|JavaScriptCallFrame|Location|MediaController|MediaError|MediaList|MediaQueryList|MediaQueryListListener|MemoryInfo|MessageChannel|MessagePort|Metadata|MutationCallback|MutationRecord|NamedNodeMap|Navigator|Node|Attr|CharacterData|Comment|Text|CDATASection|DocumentFragment|DocumentType|Element|HTMLElement|HTMLAnchorElement|HTMLAppletElement|HTMLAreaElement|HTMLBRElement|HTMLBaseElement|HTMLBaseFontElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFormElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLInputElement|HTMLIsIndexElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLAudioElement|HTMLVideoElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLSelectElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|SVGElement|SVGAElement|SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGAnimationElement|SVGAnimateColorElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGSetElement|SVGCircleElement|SVGClipPathElement|SVGComponentTransferFunctionElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGForeignObjectElement|SVGGElement|SVGGlyphElement|SVGGlyphRefElement|SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGHKernElement|SVGImageElement|SVGLineElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGMissingGlyphElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTextContentElement|SVGTextPathElement|SVGTextPositioningElement|SVGAltGlyphElement|SVGTRefElement|SVGTSpanElement|SVGTextElement|SVGTitleElement|SVGUseElement|SVGVKernElement|SVGViewElement|Entity|EntityReference|Notation|ProcessingInstruction|NodeFilter|NodeIterator|NodeList|NodeSelector|Notification|NotificationCenter|OESStandardDerivatives|OESTextureFloat|OESVertexArrayObject|OperationNotAllowedException|Performance|PerformanceNavigation|PerformanceTiming|PointerLock|PositionError|RGBColor|Range|RangeException|Rect|SQLError|SQLException|SQLResultSet|SQLResultSetRowList|SQLTransaction|SQLTransactionSync|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGElementInstance|SVGElementInstanceList|SVGException|SVGExternalResourcesRequired|SVGFitToViewBox|SVGLangSpace|SVGLength|SVGLengthList|SVGLocatable|SVGTransformable|SVGMatrix|SVGNumber|SVGNumberList|SVGPathSeg|SVGPathSegArcAbs|SVGPathSegArcRel|SVGPathSegClosePath|SVGPathSegCurvetoCubicAbs|SVGPathSegCurvetoCubicRel|SVGPathSegCurvetoCubicSmoothAbs|SVGPathSegCurvetoCubicSmoothRel|SVGPathSegCurvetoQuadraticAbs|SVGPathSegCurvetoQuadraticRel|SVGPathSegCurvetoQuadraticSmoothAbs|SVGPathSegCurvetoQuadraticSmoothRel|SVGPathSegLinetoAbs|SVGPathSegLinetoHorizontalAbs|SVGPathSegLinetoHorizontalRel|SVGPathSegLinetoRel|SVGPathSegLinetoVerticalAbs|SVGPathSegLinetoVerticalRel|SVGPathSegMovetoAbs|SVGPathSegMovetoRel|SVGPathSegList|SVGPoint|SVGPointList|SVGPreserveAspectRatio|SVGRect|SVGRenderingIntent|SVGStringList|SVGStylable|SVGFilterPrimitiveStandardAttributes|SVGTests|SVGTransform|SVGTransformList|SVGURIReference|SVGUnitTypes|SVGZoomAndPan|SVGViewSpec|Screen|ScriptProfile|ScriptProfileNode|SpeechInputResult|SpeechInputResultList|Storage|StorageInfo|StyleMedia|StyleSheet|CSSStyleSheet|StyleSheetList|TextMetrics|TextTrack|TextTrackCue|TextTrackCueList|TextTrackList|TimeRanges|Touch|TouchList|TreeWalker|ValidityState|WebGLActiveInfo|WebGLBuffer|WebGLCompressedTextures|WebGLContextAttributes|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation|WebGLVertexArrayObjectOES|WebKitAnimation|WebKitAnimationList|WebKitBlobBuilder|WebKitCSSMatrix|WebKitMutationObserver|WebKitNamedFlow|WebKitPoint|WebSocket|WorkerLocation|WorkerNavigator|XMLHttpRequest|XMLHttpRequestException|XMLHttpRequestUpload|XMLSerializer|XPathEvaluator|XPathException|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor'].join('|')]
  ];
  $dynamicSetMetadata(table);
})();
//  ********** Globals **************
function $static_init(){
  $globals._DefaultObserver__hashNum = (0);
}
var const$0000 = Object.create(ExceptionImplementation.prototype, {_msg: {"value": "Parameter \"high\" must be > parameter \"low\"", writeable: false}});
var const$0001 = Object.create(_DeletedKeySentinel.prototype, {});
var const$0002 = Object.create(NoMoreElementsException.prototype, {});
var const$0004 = Object.create(ExceptionImplementation.prototype, {_msg: {"value": "Parameter \"intervalHigh\" must be > parameter \"intervalLow\"", writeable: false}});
var const$0005 = Object.create(ExceptionImplementation.prototype, {_msg: {"value": "timer interval parameters must be >= 1", writeable: false}});
var $globals = {};
$static_init();
main();
