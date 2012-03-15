//  ********** Library dart:core **************
//  ********** Natives dart:core **************
function $defProp(obj, prop, value) {
  Object.defineProperty(obj, prop,
      {value: value, enumerable: false, writable: true, configurable: true});
}
Function.prototype.bind = Function.prototype.bind ||
  function(thisObj) {
    var func = this;
    var funcLength = func.$length || func.length;
    var argsLength = arguments.length;
    if (argsLength > 1) {
      var boundArgs = Array.prototype.slice.call(arguments, 1);
      var bound = function() {
        // Prepend the bound arguments to the current arguments.
        var newArgs = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(newArgs, boundArgs);
        return func.apply(thisObj, newArgs);
      };
      bound.$length = Math.max(0, funcLength - (argsLength - 1));
      return bound;
    } else {
      var bound = function() {
        return func.apply(thisObj, arguments);
      };
      bound.$length = funcLength;
      return bound;
    }
  };
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
  $throw(new NoSuchMethodException(this, "operator []", [i]));
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
$defProp(Object.prototype, '$setindex', function(i, value) {
  $throw(new NoSuchMethodException(this, "operator []=", [i, value]));
});
$defProp(Array.prototype, '$setindex', function(index, value) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i] = value;
});
function $add$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'string') {
    var str = (y == null) ? 'null' : y.toString();
    if (typeof(str) != 'string') {
      throw new Error("calling toString() on right hand operand of operator " +
      "+ did not return a String");
    }
    return x + str;
  } else if (typeof(x) == 'object') {
    return x.$add(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator +", [y]));
  }
}

function $add$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x + y;
  return $add$complex$(x, y);
}
function $eq$(x, y) {
  if (x == null) return y == null;
  return (typeof(x) != 'object') ? x === y : x.$eq(y);
}
// TODO(jimhug): Should this or should it not match equals?
$defProp(Object.prototype, '$eq', function(other) {
  return this === other;
});
function $gt$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$gt(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator >", [y]));
  }
}
function $gt$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x > y;
  return $gt$complex$(x, y);
}
function $ne$(x, y) {
  if (x == null) return y != null;
  return (typeof(x) != 'object') ? x !== y : !x.$eq(y);
}
function $sub$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$sub(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator -", [y]));
  }
}
function $sub$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x - y;
  return $sub$complex$(x, y);
}
function $truncdiv$(x, y) {
  if (typeof(x) == 'number') {
    if (typeof(y) == 'number') {
      if (y == 0) $throw(new IntegerDivisionByZeroException());
      var tmp = x / y;
      return (tmp < 0) ? Math.ceil(tmp) : Math.floor(tmp);
    } else {
      $throw(new IllegalArgumentException(y));
    }
  } else if (typeof(x) == 'object') {
    return x.$truncdiv(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator ~/", [y]));
  }
}
// ********** Code for Object **************
$defProp(Object.prototype, "get$dynamic", function() {
  "use strict"; return this;
});
$defProp(Object.prototype, "noSuchMethod", function(name, args) {
  $throw(new NoSuchMethodException(this, name, args));
});
$defProp(Object.prototype, "add$1", function($0) {
  return this.noSuchMethod("add", [$0]);
});
$defProp(Object.prototype, "clear$0", function() {
  return this.noSuchMethod("clear", []);
});
$defProp(Object.prototype, "complete$0", function() {
  return this.noSuchMethod("complete", []);
});
$defProp(Object.prototype, "contains$1", function($0) {
  return this.noSuchMethod("contains", [$0]);
});
$defProp(Object.prototype, "end$0", function() {
  return this.noSuchMethod("end", []);
});
$defProp(Object.prototype, "error$1", function($0) {
  return this.noSuchMethod("error", [$0]);
});
$defProp(Object.prototype, "filter$1", function($0) {
  return this.noSuchMethod("filter", [$0]);
});
$defProp(Object.prototype, "indexOf$1", function($0) {
  return this.noSuchMethod("indexOf", [$0]);
});
$defProp(Object.prototype, "is$Collection", function() {
  return false;
});
$defProp(Object.prototype, "is$IObserver", function() {
  return false;
});
$defProp(Object.prototype, "is$List", function() {
  return false;
});
$defProp(Object.prototype, "is$Map", function() {
  return false;
});
$defProp(Object.prototype, "is$RegExp", function() {
  return false;
});
$defProp(Object.prototype, "is$html_Element", function() {
  return false;
});
$defProp(Object.prototype, "next$0", function() {
  return this.noSuchMethod("next", []);
});
$defProp(Object.prototype, "next$1", function($0) {
  return this.noSuchMethod("next", [$0]);
});
$defProp(Object.prototype, "postMessage$1", function($0) {
  return this.noSuchMethod("postMessage", [$0]);
});
$defProp(Object.prototype, "remove$0", function() {
  return this.noSuchMethod("remove", []);
});
$defProp(Object.prototype, "send$2", function($0, $1) {
  return this.noSuchMethod("send", [$0, $1]);
});
$defProp(Object.prototype, "start$0", function() {
  return this.noSuchMethod("start", []);
});
$defProp(Object.prototype, "subscribe$1", function($0) {
  return this.noSuchMethod("subscribe", [$0]);
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
// ********** Code for IllegalAccessException **************
function IllegalAccessException() {

}
IllegalAccessException.prototype.toString = function() {
  return "Attempt to modify an immutable object";
}
// ********** Code for NoSuchMethodException **************
function NoSuchMethodException(_receiver, _functionName, _arguments, _existingArgumentNames) {
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
  this._existingArgumentNames = _existingArgumentNames;
}
NoSuchMethodException.prototype.is$NoSuchMethodException = function(){return true};
NoSuchMethodException.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  for (var i = (0);
   i < this._arguments.get$length(); i++) {
    if (i > (0)) {
      sb.add(", ");
    }
    sb.add(this._arguments.$index(i));
  }
  if (null == this._existingArgumentNames) {
    return $add$($add$(("NoSuchMethodException : method not found: '" + this._functionName + "'\n"), ("Receiver: " + this._receiver + "\n")), ("Arguments: [" + sb + "]"));
  }
  else {
    var actualParameters = sb.toString();
    sb = new StringBufferImpl("");
    for (var i = (0);
     i < this._existingArgumentNames.get$length(); i++) {
      if (i > (0)) {
        sb.add(", ");
      }
      sb.add(this._existingArgumentNames.$index(i));
    }
    var formalParameters = sb.toString();
    return $add$($add$($add$("NoSuchMethodException: incorrect number of arguments passed to ", ("method named '" + this._functionName + "'\nReceiver: " + this._receiver + "\n")), ("Tried calling: " + this._functionName + "(" + actualParameters + ")\n")), ("Found: " + this._functionName + "(" + formalParameters + ")"));
  }
}
// ********** Code for ClosureArgumentMismatchException **************
function ClosureArgumentMismatchException() {

}
ClosureArgumentMismatchException.prototype.toString = function() {
  return "Closure argument mismatch";
}
// ********** Code for ObjectNotClosureException **************
function ObjectNotClosureException() {

}
ObjectNotClosureException.prototype.toString = function() {
  return "Object is not closure";
}
// ********** Code for IllegalArgumentException **************
function IllegalArgumentException(arg) {
  this._arg = arg;
}
IllegalArgumentException.prototype.is$IllegalArgumentException = function(){return true};
IllegalArgumentException.prototype.toString = function() {
  return ("Illegal argument(s): " + this._arg);
}
// ********** Code for StackOverflowException **************
function StackOverflowException() {

}
StackOverflowException.prototype.toString = function() {
  return "Stack Overflow";
}
// ********** Code for BadNumberFormatException **************
function BadNumberFormatException(_s) {
  this._s = _s;
}
BadNumberFormatException.prototype.toString = function() {
  return ("BadNumberFormatException: '" + this._s + "'");
}
// ********** Code for NullPointerException **************
function NullPointerException() {

}
NullPointerException.prototype.toString = function() {
  return "NullPointerException";
}
// ********** Code for NoMoreElementsException **************
function NoMoreElementsException() {

}
NoMoreElementsException.prototype.toString = function() {
  return "NoMoreElementsException";
}
// ********** Code for EmptyQueueException **************
function EmptyQueueException() {

}
EmptyQueueException.prototype.toString = function() {
  return "EmptyQueueException";
}
// ********** Code for UnsupportedOperationException **************
function UnsupportedOperationException(_message) {
  this._message = _message;
}
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
// ********** Code for NotImplementedException **************
function NotImplementedException() {

}
NotImplementedException.prototype.toString = function() {
  return "NotImplementedException";
}
// ********** Code for IntegerDivisionByZeroException **************
function IntegerDivisionByZeroException() {

}
IntegerDivisionByZeroException.prototype.is$IntegerDivisionByZeroException = function(){return true};
IntegerDivisionByZeroException.prototype.toString = function() {
  return "IntegerDivisionByZeroException";
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
// ********** Code for FutureNotCompleteException **************
function FutureNotCompleteException() {

}
FutureNotCompleteException.prototype.toString = function() {
  return "Exception: future has not been completed";
}
// ********** Code for FutureAlreadyCompleteException **************
function FutureAlreadyCompleteException() {

}
FutureAlreadyCompleteException.prototype.toString = function() {
  return "Exception: future already completed";
}
// ********** Code for Futures **************
function Futures() {}
Futures.wait = function(futures) {
  var completer = new CompleterImpl_List();
  var remaining = futures.get$length();
  var values = new Array(futures.get$length());
  for (var i = (0);
   i < futures.get$length(); i++) {
    var pos = i;
    futures.$index(pos).then((function (pos, value) {
      values.$setindex(pos, value);
      if (--remaining == (0)) {
        completer.complete(values);
      }
    }).bind(null, pos)
    );
  }
  if (futures.get$length() == (0)) {
    completer.complete(values);
  }
  return completer.get$future();
}
// ********** Code for Math **************
Math.parseInt = function(str) {
    var match = /^\s*[+-]?(?:(0[xX][abcdefABCDEF0-9]+)|\d+)\s*$/.exec(str);
    if (!match) $throw(new BadNumberFormatException(str));
    var isHex = !!match[1];
    var ret = parseInt(str, isHex ? 16 : 10);
    if (isNaN(ret)) $throw(new BadNumberFormatException(str));
    return ret;
}
// ********** Code for Strings **************
function Strings() {}
Strings.join = function(strings, separator) {
  return StringBase.join(strings, separator);
}
// ********** Code for top level **************
function print$(obj) {
  return _print(obj);
}
function _print(obj) {
  if (typeof console == 'object') {
    if (obj) obj = obj.toString();
    console.log(obj);
  } else if (typeof write === 'function') {
    write(obj);
    write('\n');
  }
}
function _toDartException(e) {
  function attachStack(dartEx) {
    // TODO(jmesserly): setting the stack property is not a long term solution.
    var stack = e.stack;
    // The stack contains the error message, and the stack is all that is
    // printed (the exception's toString() is never called).  Make the Dart
    // exception's toString() be the dominant message.
    if (typeof stack == 'string') {
      var message = dartEx.toString();
      if (/^(Type|Range)Error:/.test(stack)) {
        // Indent JS message (it can be helpful) so new message stands out.
        stack = '    (' + stack.substring(0, stack.indexOf('\n')) + ')\n' +
                stack.substring(stack.indexOf('\n') + 1);
      }
      stack = message + '\n' + stack;
    }
    dartEx.stack = stack;
    return dartEx;
  }

  if (e instanceof TypeError) {
    switch(e.type) {
      case 'property_not_function':
      case 'called_non_callable':
        if (e.arguments[0] == null) {
          return attachStack(new NullPointerException());
        } else {
          return attachStack(new ObjectNotClosureException());
        }
        break;
      case 'non_object_property_call':
      case 'non_object_property_load':
        return attachStack(new NullPointerException());
        break;
      case 'undefined_method':
        var mname = e.arguments[0];
        if (typeof(mname) == 'string' && (mname.indexOf('call$') == 0
            || mname == 'call' || mname == 'apply')) {
          return attachStack(new ObjectNotClosureException());
        } else {
          // TODO(jmesserly): fix noSuchMethod on operators so we don't hit this
          return attachStack(new NoSuchMethodException('', e.arguments[0], []));
        }
        break;
    }
  } else if (e instanceof RangeError) {
    if (e.message.indexOf('call stack') >= 0) {
      return attachStack(new StackOverflowException());
    }
  }
  return e;
}
function _stackTraceOf(e) {
  return  (e && e.stack) ? e.stack : null;
}
//  ********** Library dart:coreimpl **************
// ********** Code for ListFactory **************
ListFactory = Array;
$defProp(ListFactory.prototype, "is$List", function(){return true});
$defProp(ListFactory.prototype, "is$Collection", function(){return true});
ListFactory.ListFactory$from$factory = function(other) {
  var list = [];
  for (var $$i = other.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    list.add$1(e);
  }
  return list;
}
$defProp(ListFactory.prototype, "get$length", function() { return this.length; });
$defProp(ListFactory.prototype, "set$length", function(value) { return this.length = value; });
$defProp(ListFactory.prototype, "add", function(value) {
  this.push(value);
});
$defProp(ListFactory.prototype, "addAll", function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var item = $$i.next$0();
    this.add(item);
  }
});
$defProp(ListFactory.prototype, "clear", function() {
  this.set$length((0));
});
$defProp(ListFactory.prototype, "removeLast", function() {
  return this.pop();
});
$defProp(ListFactory.prototype, "last", function() {
  return this.$index(this.get$length() - (1));
});
$defProp(ListFactory.prototype, "getRange", function(start, length) {
  
      if (length == 0) return [];
      if (length < 0) throw new IllegalArgumentException('length');
      if (start < 0 || start + length > this.length)
        throw new IndexOutOfRangeException(start);
      return this.slice(start, start + length);
    
});
$defProp(ListFactory.prototype, "removeRange", function(start, length) {
  
      if (length == 0) return;
      if (length < 0) throw new IllegalArgumentException('length');
      if (start < 0 || start + length > this.length)
        throw new IndexOutOfRangeException(start);
      this.splice(start, length);
    
});
$defProp(ListFactory.prototype, "isEmpty", function() {
  return this.get$length() == (0);
});
$defProp(ListFactory.prototype, "iterator", function() {
  return new ListIterator(this);
});
$defProp(ListFactory.prototype, "toString", function() {
  return Collections.collectionToString(this);
});
$defProp(ListFactory.prototype, "add$1", ListFactory.prototype.add);
$defProp(ListFactory.prototype, "clear$0", ListFactory.prototype.clear);
$defProp(ListFactory.prototype, "filter$1", function($0) {
  return this.filter(to$call$1($0));
});
$defProp(ListFactory.prototype, "indexOf$1", ListFactory.prototype.indexOf);
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
    $throw(const$0001);
  }
  return this._array.$index(this._pos++);
}
ListIterator.prototype.next$0 = ListIterator.prototype.next;
// ********** Code for ImmutableList **************
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
$inherits(ImmutableList, ListFactory);
function ImmutableList(length) {
  Array.call(this, length);
}
ImmutableList.ImmutableList$from$factory = function(other) {
  return _constList(other);
}
ImmutableList.prototype.get$length = function() {
  return this.length;
}
ImmutableList.prototype.set$length = function(length) {
  $throw(const$0011);
}
ImmutableList.prototype.$setindex = function(index, value) {
  $throw(const$0011);
}
ImmutableList.prototype.removeRange = function(start, length) {
  $throw(const$0011);
}
ImmutableList.prototype.add = function(element) {
  $throw(const$0011);
}
ImmutableList.prototype.addAll = function(elements) {
  $throw(const$0011);
}
ImmutableList.prototype.clear = function() {
  $throw(const$0011);
}
ImmutableList.prototype.removeLast = function() {
  $throw(const$0011);
}
ImmutableList.prototype.toString = function() {
  return Collections.collectionToString(this);
}
ImmutableList.prototype.add$1 = ImmutableList.prototype.add;
ImmutableList.prototype.clear$0 = ImmutableList.prototype.clear;
// ********** Code for ImmutableMap **************
function ImmutableMap(keyValuePairs) {
  this._internal = _map(keyValuePairs);
}
ImmutableMap.prototype.is$Map = function(){return true};
ImmutableMap.prototype.$index = function(key) {
  return this._internal.$index(key);
}
ImmutableMap.prototype.isEmpty = function() {
  return this._internal.isEmpty();
}
ImmutableMap.prototype.get$length = function() {
  return this._internal.get$length();
}
ImmutableMap.prototype.forEach = function(f) {
  this._internal.forEach(f);
}
ImmutableMap.prototype.getKeys = function() {
  return this._internal.getKeys();
}
ImmutableMap.prototype.getValues = function() {
  return this._internal.getValues();
}
ImmutableMap.prototype.containsKey = function(key) {
  return this._internal.containsKey(key);
}
ImmutableMap.prototype.$setindex = function(key, value) {
  $throw(const$0011);
}
ImmutableMap.prototype.clear = function() {
  $throw(const$0011);
}
ImmutableMap.prototype.remove = function(key) {
  $throw(const$0011);
}
ImmutableMap.prototype.toString = function() {
  return Maps.mapToString(this);
}
ImmutableMap.prototype.clear$0 = ImmutableMap.prototype.clear;
// ********** Code for JSSyntaxRegExp **************
function JSSyntaxRegExp(pattern, multiLine, ignoreCase) {
  JSSyntaxRegExp._create$ctor.call(this, pattern, $add$(($eq$(multiLine, true) ? "m" : ""), ($eq$(ignoreCase, true) ? "i" : "")));
}
JSSyntaxRegExp._create$ctor = function(pattern, flags) {
  this.re = new RegExp(pattern, flags);
      this.pattern = pattern;
      this.multiLine = this.re.multiline;
      this.ignoreCase = this.re.ignoreCase;
}
JSSyntaxRegExp._create$ctor.prototype = JSSyntaxRegExp.prototype;
JSSyntaxRegExp.prototype.is$RegExp = function(){return true};
JSSyntaxRegExp.prototype.firstMatch = function(str) {
  var m = this._exec(str);
  return m == null ? null : new MatchImplementation(this.pattern, str, this._matchStart(m), this.get$_lastIndex(), m);
}
JSSyntaxRegExp.prototype._exec = function(str) {
  return this.re.exec(str);
}
JSSyntaxRegExp.prototype._matchStart = function(m) {
  return m.index;
}
JSSyntaxRegExp.prototype.get$_lastIndex = function() {
  return this.re.lastIndex;
}
JSSyntaxRegExp.prototype.allMatches = function(str) {
  return new _AllMatchesIterable(this, str);
}
JSSyntaxRegExp.prototype.get$_global = function() {
  return new JSSyntaxRegExp._create$ctor(this.pattern, $add$($add$("g", (this.multiLine ? "m" : "")), (this.ignoreCase ? "i" : "")));
}
// ********** Code for MatchImplementation **************
function MatchImplementation(pattern, str, _start, _end, _groups) {
  this.pattern = pattern;
  this.str = str;
  this._start = _start;
  this._end = _end;
  this._groups = _groups;
}
MatchImplementation.prototype.start = function() {
  return this._start;
}
MatchImplementation.prototype.end = function() {
  return this._end;
}
MatchImplementation.prototype.$index = function(group) {
  return this._groups.$index(group);
}
MatchImplementation.prototype.end$0 = MatchImplementation.prototype.end;
MatchImplementation.prototype.start$0 = MatchImplementation.prototype.start;
// ********** Code for _AllMatchesIterable **************
function _AllMatchesIterable(_re, _str) {
  this._re = _re;
  this._dart_coreimpl_str = _str;
}
_AllMatchesIterable.prototype.iterator = function() {
  return new _AllMatchesIterator(this._re, this._dart_coreimpl_str);
}
// ********** Code for _AllMatchesIterator **************
function _AllMatchesIterator(re, _str) {
  this._re = re.get$_global();
  this._dart_coreimpl_str = _str;
  this._done = false;
}
_AllMatchesIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  var next = this._next;
  this._next = null;
  return next;
}
_AllMatchesIterator.prototype.hasNext = function() {
  if (this._done) {
    return false;
  }
  else if (this._next != null) {
    return true;
  }
  this._next = this._re.firstMatch(this._dart_coreimpl_str);
  if (this._next == null) {
    this._done = true;
    return false;
  }
  else {
    return true;
  }
}
_AllMatchesIterator.prototype.next$0 = _AllMatchesIterator.prototype.next;
// ********** Code for NumImplementation **************
NumImplementation = Number;
NumImplementation.prototype.ceil = function() {
  'use strict'; return Math.ceil(this);
}
NumImplementation.prototype.hashCode = function() {
  'use strict'; return this & 0x1FFFFFFF;
}
NumImplementation.prototype.toInt = function() {
  
    'use strict';
    if (isNaN(this)) $throw(new BadNumberFormatException("NaN"));
    if ((this == Infinity) || (this == -Infinity)) {
      $throw(new BadNumberFormatException("Infinity"));
    }
    var truncated = (this < 0) ? Math.ceil(this) : Math.floor(this);
    if (truncated == -0.0) return 0;
    return truncated;
}
// ********** Code for ExceptionImplementation **************
function ExceptionImplementation(msg) {
  this._msg = msg;
}
ExceptionImplementation.prototype.toString = function() {
  return (null == this._msg) ? "Exception" : ("Exception: " + this._msg);
}
// ********** Code for Collections **************
function Collections() {}
Collections.collectionToString = function(c) {
  var result = new StringBufferImpl("");
  Collections._emitCollection(c, result, new Array());
  return result.toString();
}
Collections._emitCollection = function(c, result, visiting) {
  visiting.add(c);
  var isList = !!(c && c.is$List());
  result.add(isList ? "[" : "{");
  var first = true;
  for (var $$i = c.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    if (!first) {
      result.add(", ");
    }
    first = false;
    Collections._emitObject(e, result, visiting);
  }
  result.add(isList ? "]" : "}");
  visiting.removeLast();
}
Collections._emitObject = function(o, result, visiting) {
  if (!!(o && o.is$Collection())) {
    if (Collections._containsRef(visiting, o)) {
      result.add(!!(o && o.is$List()) ? "[...]" : "{...}");
    }
    else {
      Collections._emitCollection(o, result, visiting);
    }
  }
  else if (!!(o && o.is$Map())) {
    if (Collections._containsRef(visiting, o)) {
      result.add("{...}");
    }
    else {
      Maps._emitMap(o, result, visiting);
    }
  }
  else {
    result.add($eq$(o) ? "null" : o);
  }
}
Collections._containsRef = function(c, ref) {
  for (var $$i = c.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    if ((null == e ? null == (ref) : e === ref)) return true;
  }
  return false;
}
// ********** Code for FutureImpl **************
function FutureImpl() {
  this._listeners = new Array();
  this._exceptionHandlers = new Array();
  this._isComplete = false;
  this._exceptionHandled = false;
}
FutureImpl.prototype.get$value = function() {
  if (!this.get$isComplete()) {
    $throw(new FutureNotCompleteException());
  }
  if (null != this._exception) {
    $throw(this._exception);
  }
  return this._value;
}
FutureImpl.prototype.get$isComplete = function() {
  return this._isComplete;
}
FutureImpl.prototype.get$hasValue = function() {
  return this.get$isComplete() && null == this._exception;
}
FutureImpl.prototype.then = function(onComplete) {
  if (this.get$hasValue()) {
    onComplete(this.get$value());
  }
  else if (!this.get$isComplete()) {
    this._listeners.add(onComplete);
  }
  else if (!this._exceptionHandled) {
    $throw(this._exception);
  }
}
FutureImpl.prototype._complete = function() {
  this._isComplete = true;
  if (null != this._exception) {
    var $$list = this._exceptionHandlers;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var handler = $$i.next$0();
      if (handler.call$1(this._exception)) {
        this._exceptionHandled = true;
        break;
      }
    }
  }
  if (this.get$hasValue()) {
    var $$list = this._listeners;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var listener = $$i.next$0();
      listener.call$1(this.get$value());
    }
  }
  else {
    if (!this._exceptionHandled && this._listeners.get$length() > (0)) {
      $throw(this._exception);
    }
  }
}
FutureImpl.prototype._setValue = function(value) {
  if (this._isComplete) {
    $throw(new FutureAlreadyCompleteException());
  }
  this._value = value;
  this._complete();
}
FutureImpl.prototype._setException = function(exception) {
  if (null == exception) {
    $throw(new IllegalArgumentException(null));
  }
  if (this._isComplete) {
    $throw(new FutureAlreadyCompleteException());
  }
  this._exception = exception;
  this._complete();
}
// ********** Code for CompleterImpl **************
function CompleterImpl() {}
CompleterImpl.prototype.get$future = function() {
  return this._futureImpl;
}
CompleterImpl.prototype.complete = function(value) {
  this._futureImpl._setValue(value);
}
CompleterImpl.prototype.completeException = function(exception) {
  this._futureImpl._setException(exception);
}
// ********** Code for CompleterImpl_List **************
$inherits(CompleterImpl_List, CompleterImpl);
function CompleterImpl_List() {
  this._futureImpl = new FutureImpl();
}
// ********** Code for CompleterImpl_ElementRect **************
$inherits(CompleterImpl_ElementRect, CompleterImpl);
function CompleterImpl_ElementRect() {
  this._futureImpl = new FutureImpl();
}
// ********** Code for HashMapImplementation **************
function HashMapImplementation() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation.prototype.is$Map = function(){return true};
HashMapImplementation._computeLoadLimit = function(capacity) {
  return $truncdiv$((capacity * (3)), (4));
}
HashMapImplementation._firstProbe = function(hashCode, length) {
  return hashCode & (length - (1));
}
HashMapImplementation._nextProbe = function(currentProbe, numberOfProbes, length) {
  return (currentProbe + numberOfProbes) & (length - (1));
}
HashMapImplementation.prototype._probeForAdding = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  var insertionIndex = (-1);
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) {
      if (insertionIndex < (0)) return hash;
      return insertionIndex;
    }
    else if ($eq$(existingKey, key)) {
      return hash;
    }
    else if ((insertionIndex < (0)) && ((null == const$0000 ? null == (existingKey) : const$0000 === existingKey))) {
      insertionIndex = hash;
    }
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._probeForLookup = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) return (-1);
    if ($eq$(existingKey, key)) return hash;
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._ensureCapacity = function() {
  var newNumberOfEntries = this._numberOfEntries + (1);
  if (newNumberOfEntries >= this._loadLimit) {
    this._grow(this._keys.get$length() * (2));
    return;
  }
  var capacity = this._keys.get$length();
  var numberOfFreeOrDeleted = capacity - newNumberOfEntries;
  var numberOfFree = numberOfFreeOrDeleted - this._numberOfDeleted;
  if (this._numberOfDeleted > numberOfFree) {
    this._grow(this._keys.get$length());
  }
}
HashMapImplementation._isPowerOfTwo = function(x) {
  return ((x & (x - (1))) == (0));
}
HashMapImplementation.prototype._grow = function(newCapacity) {
  var capacity = this._keys.get$length();
  this._loadLimit = HashMapImplementation._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  var oldValues = this._values;
  this._keys = new Array(newCapacity);
  this._values = new Array(newCapacity);
  for (var i = (0);
   i < capacity; i++) {
    var key = oldKeys.$index(i);
    if (null == key || (null == key ? null == (const$0000) : key === const$0000)) {
      continue;
    }
    var value = oldValues.$index(i);
    var newIndex = this._probeForAdding(key);
    this._keys.$setindex(newIndex, key);
    this._values.$setindex(newIndex, value);
  }
  this._numberOfDeleted = (0);
}
HashMapImplementation.prototype.clear = function() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    this._keys.$setindex(i);
    this._values.$setindex(i);
  }
}
HashMapImplementation.prototype.$setindex = function(key, value) {
  var $0;
  this._ensureCapacity();
  var index = this._probeForAdding(key);
  if ((null == this._keys.$index(index)) || ((($0 = this._keys.$index(index)) == null ? null == (const$0000) : $0 === const$0000))) {
    this._numberOfEntries++;
  }
  this._keys.$setindex(index, key);
  this._values.$setindex(index, value);
}
HashMapImplementation.prototype.$index = function(key) {
  var index = this._probeForLookup(key);
  if (index < (0)) return null;
  return this._values.$index(index);
}
HashMapImplementation.prototype.remove = function(key) {
  var index = this._probeForLookup(key);
  if (index >= (0)) {
    this._numberOfEntries--;
    var value = this._values.$index(index);
    this._values.$setindex(index);
    this._keys.$setindex(index, const$0000);
    this._numberOfDeleted++;
    return value;
  }
  return null;
}
HashMapImplementation.prototype.isEmpty = function() {
  return this._numberOfEntries == (0);
}
HashMapImplementation.prototype.get$length = function() {
  return this._numberOfEntries;
}
HashMapImplementation.prototype.forEach = function(f) {
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    var key = this._keys.$index(i);
    if ((null != key) && ((null == key ? null != (const$0000) : key !== const$0000))) {
      f(key, this._values.$index(i));
    }
  }
}
HashMapImplementation.prototype.getKeys = function() {
  var list = new Array(this.get$length());
  var i = (0);
  this.forEach(function _(key, value) {
    list.$setindex(i++, key);
  }
  );
  return list;
}
HashMapImplementation.prototype.getValues = function() {
  var list = new Array(this.get$length());
  var i = (0);
  this.forEach(function _(key, value) {
    list.$setindex(i++, value);
  }
  );
  return list;
}
HashMapImplementation.prototype.containsKey = function(key) {
  return (this._probeForLookup(key) != (-1));
}
HashMapImplementation.prototype.toString = function() {
  return Maps.mapToString(this);
}
HashMapImplementation.prototype.clear$0 = HashMapImplementation.prototype.clear;
// ********** Code for HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair **************
$inherits(HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair, HashMapImplementation);
function HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair.prototype.is$Map = function(){return true};
// ********** Code for HashMapImplementation_dart_core_String$dart_core_String **************
$inherits(HashMapImplementation_dart_core_String$dart_core_String, HashMapImplementation);
function HashMapImplementation_dart_core_String$dart_core_String() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_dart_core_String$dart_core_String.prototype.is$Map = function(){return true};
// ********** Code for HashSetImplementation **************
function HashSetImplementation() {
  this._backingMap = new HashMapImplementation();
}
HashSetImplementation.prototype.is$Collection = function(){return true};
HashSetImplementation.prototype.clear = function() {
  this._backingMap.clear();
}
HashSetImplementation.prototype.add = function(value) {
  this._backingMap.$setindex(value, value);
}
HashSetImplementation.prototype.contains = function(value) {
  return this._backingMap.containsKey(value);
}
HashSetImplementation.prototype.addAll = function(collection) {
  var $this = this; // closure support
  collection.forEach(function _(value) {
    $this.add(value);
  }
  );
}
HashSetImplementation.prototype.forEach = function(f) {
  this._backingMap.forEach(function _(key, value) {
    f(key);
  }
  );
}
HashSetImplementation.prototype.filter = function(f) {
  var result = new HashSetImplementation();
  this._backingMap.forEach(function _(key, value) {
    if (f(key)) result.add(key);
  }
  );
  return result;
}
HashSetImplementation.prototype.isEmpty = function() {
  return this._backingMap.isEmpty();
}
HashSetImplementation.prototype.get$length = function() {
  return this._backingMap.get$length();
}
HashSetImplementation.prototype.iterator = function() {
  return new HashSetIterator(this);
}
HashSetImplementation.prototype.toString = function() {
  return Collections.collectionToString(this);
}
HashSetImplementation.prototype.add$1 = HashSetImplementation.prototype.add;
HashSetImplementation.prototype.clear$0 = HashSetImplementation.prototype.clear;
HashSetImplementation.prototype.contains$1 = HashSetImplementation.prototype.contains;
HashSetImplementation.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
// ********** Code for HashSetImplementation_dart_core_String **************
$inherits(HashSetImplementation_dart_core_String, HashSetImplementation);
function HashSetImplementation_dart_core_String() {
  this._backingMap = new HashMapImplementation_dart_core_String$dart_core_String();
}
HashSetImplementation_dart_core_String.prototype.is$Collection = function(){return true};
HashSetImplementation_dart_core_String.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
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
  if ((($0 = this._entries.$index(this._nextValidIndex)) == null ? null == (const$0000) : $0 === const$0000)) {
    this._advance();
  }
  return this._nextValidIndex < this._entries.get$length();
}
HashSetIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  var res = this._entries.$index(this._nextValidIndex);
  this._advance();
  return res;
}
HashSetIterator.prototype._advance = function() {
  var length = this._entries.get$length();
  var entry;
  var deletedKey = const$0000;
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
// ********** Code for KeyValuePair **************
function KeyValuePair(key, value) {
  this.key = key;
  this.value = value;
}
KeyValuePair.prototype.get$value = function() { return this.value; };
KeyValuePair.prototype.set$value = function(value) { return this.value = value; };
// ********** Code for LinkedHashMapImplementation **************
function LinkedHashMapImplementation() {
  this._map = new HashMapImplementation_Dynamic$DoubleLinkedQueueEntry_KeyValuePair();
  this._list = new DoubleLinkedQueue_KeyValuePair();
}
LinkedHashMapImplementation.prototype.is$Map = function(){return true};
LinkedHashMapImplementation.prototype.$setindex = function(key, value) {
  if (this._map.containsKey(key)) {
    this._map.$index(key).get$element().set$value(value);
  }
  else {
    this._list.addLast(new KeyValuePair(key, value));
    this._map.$setindex(key, this._list.lastEntry());
  }
}
LinkedHashMapImplementation.prototype.$index = function(key) {
  var entry = this._map.$index(key);
  if (null == entry) return null;
  return entry.get$element().get$value();
}
LinkedHashMapImplementation.prototype.remove = function(key) {
  var entry = this._map.remove(key);
  if (null == entry) return null;
  entry.remove();
  return entry.get$element().get$value();
}
LinkedHashMapImplementation.prototype.getKeys = function() {
  var list = new Array(this.get$length());
  var index = (0);
  this._list.forEach(function _(entry) {
    list.$setindex(index++, entry.key);
  }
  );
  return list;
}
LinkedHashMapImplementation.prototype.getValues = function() {
  var list = new Array(this.get$length());
  var index = (0);
  this._list.forEach(function _(entry) {
    list.$setindex(index++, entry.value);
  }
  );
  return list;
}
LinkedHashMapImplementation.prototype.forEach = function(f) {
  this._list.forEach(function _(entry) {
    f(entry.key, entry.value);
  }
  );
}
LinkedHashMapImplementation.prototype.containsKey = function(key) {
  return this._map.containsKey(key);
}
LinkedHashMapImplementation.prototype.get$length = function() {
  return this._map.get$length();
}
LinkedHashMapImplementation.prototype.isEmpty = function() {
  return this.get$length() == (0);
}
LinkedHashMapImplementation.prototype.clear = function() {
  this._map.clear();
  this._list.clear();
}
LinkedHashMapImplementation.prototype.toString = function() {
  return Maps.mapToString(this);
}
LinkedHashMapImplementation.prototype.clear$0 = LinkedHashMapImplementation.prototype.clear;
// ********** Code for Maps **************
function Maps() {}
Maps.mapToString = function(m) {
  var result = new StringBufferImpl("");
  Maps._emitMap(m, result, new Array());
  return result.toString();
}
Maps._emitMap = function(m, result, visiting) {
  visiting.add(m);
  result.add("{");
  var first = true;
  m.forEach((function (k, v) {
    if (!first) {
      result.add(", ");
    }
    first = false;
    Collections._emitObject(k, result, visiting);
    result.add(": ");
    Collections._emitObject(v, result, visiting);
  })
  );
  result.add("}");
  visiting.removeLast();
}
// ********** Code for DoubleLinkedQueueEntry **************
function DoubleLinkedQueueEntry(e) {
  this._element = e;
}
DoubleLinkedQueueEntry.prototype._link = function(p, n) {
  this._next = n;
  this._previous = p;
  p._next = this;
  n._previous = this;
}
DoubleLinkedQueueEntry.prototype.prepend = function(e) {
  new DoubleLinkedQueueEntry(e)._link(this._previous, this);
}
DoubleLinkedQueueEntry.prototype.remove = function() {
  this._previous._next = this._next;
  this._next._previous = this._previous;
  this._next = null;
  this._previous = null;
  return this._element;
}
DoubleLinkedQueueEntry.prototype._asNonSentinelEntry = function() {
  return this;
}
DoubleLinkedQueueEntry.prototype.previousEntry = function() {
  return this._previous._asNonSentinelEntry();
}
DoubleLinkedQueueEntry.prototype.get$element = function() {
  return this._element;
}
DoubleLinkedQueueEntry.prototype.remove$0 = DoubleLinkedQueueEntry.prototype.remove;
// ********** Code for DoubleLinkedQueueEntry_KeyValuePair **************
$inherits(DoubleLinkedQueueEntry_KeyValuePair, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry_KeyValuePair(e) {
  this._element = e;
}
DoubleLinkedQueueEntry_KeyValuePair.prototype.remove$0 = DoubleLinkedQueueEntry_KeyValuePair.prototype.remove;
// ********** Code for DoubleLinkedQueueEntry__IsolateEvent **************
$inherits(DoubleLinkedQueueEntry__IsolateEvent, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry__IsolateEvent(e) {
  this._element = e;
}
// ********** Code for _DoubleLinkedQueueEntrySentinel **************
$inherits(_DoubleLinkedQueueEntrySentinel, DoubleLinkedQueueEntry);
function _DoubleLinkedQueueEntrySentinel() {
  DoubleLinkedQueueEntry.call(this, null);
  this._link(this, this);
}
_DoubleLinkedQueueEntrySentinel.prototype.remove = function() {
  $throw(const$0002);
}
_DoubleLinkedQueueEntrySentinel.prototype._asNonSentinelEntry = function() {
  return null;
}
_DoubleLinkedQueueEntrySentinel.prototype.get$element = function() {
  $throw(const$0002);
}
_DoubleLinkedQueueEntrySentinel.prototype.remove$0 = _DoubleLinkedQueueEntrySentinel.prototype.remove;
// ********** Code for _DoubleLinkedQueueEntrySentinel_KeyValuePair **************
$inherits(_DoubleLinkedQueueEntrySentinel_KeyValuePair, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel_KeyValuePair() {
  DoubleLinkedQueueEntry_KeyValuePair.call(this, null);
  this._link(this, this);
}
// ********** Code for _DoubleLinkedQueueEntrySentinel__IsolateEvent **************
$inherits(_DoubleLinkedQueueEntrySentinel__IsolateEvent, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel__IsolateEvent() {
  DoubleLinkedQueueEntry__IsolateEvent.call(this, null);
  this._link(this, this);
}
// ********** Code for DoubleLinkedQueue **************
function DoubleLinkedQueue() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel();
}
DoubleLinkedQueue.prototype.is$Collection = function(){return true};
DoubleLinkedQueue.prototype.addLast = function(value) {
  this._sentinel.prepend(value);
}
DoubleLinkedQueue.prototype.add = function(value) {
  this.addLast(value);
}
DoubleLinkedQueue.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    this.add(e);
  }
}
DoubleLinkedQueue.prototype.removeFirst = function() {
  return this._sentinel._next.remove();
}
DoubleLinkedQueue.prototype.first = function() {
  return this._sentinel._next.get$element();
}
DoubleLinkedQueue.prototype.lastEntry = function() {
  return this._sentinel.previousEntry();
}
DoubleLinkedQueue.prototype.get$length = function() {
  var counter = (0);
  this.forEach(function _(element) {
    counter++;
  }
  );
  return counter;
}
DoubleLinkedQueue.prototype.isEmpty = function() {
  var $0;
  return ((($0 = this._sentinel._next) == null ? null == (this._sentinel) : $0 === this._sentinel));
}
DoubleLinkedQueue.prototype.clear = function() {
  this._sentinel._next = this._sentinel;
  this._sentinel._previous = this._sentinel;
}
DoubleLinkedQueue.prototype.forEach = function(f) {
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    f(entry._element);
    entry = nextEntry;
  }
}
DoubleLinkedQueue.prototype.filter = function(f) {
  var other = new DoubleLinkedQueue();
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    if (f(entry._element)) other.addLast(entry._element);
    entry = nextEntry;
  }
  return other;
}
DoubleLinkedQueue.prototype.iterator = function() {
  return new _DoubleLinkedQueueIterator(this._sentinel);
}
DoubleLinkedQueue.prototype.toString = function() {
  return Collections.collectionToString(this);
}
DoubleLinkedQueue.prototype.add$1 = DoubleLinkedQueue.prototype.add;
DoubleLinkedQueue.prototype.clear$0 = DoubleLinkedQueue.prototype.clear;
DoubleLinkedQueue.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
// ********** Code for DoubleLinkedQueue_KeyValuePair **************
$inherits(DoubleLinkedQueue_KeyValuePair, DoubleLinkedQueue);
function DoubleLinkedQueue_KeyValuePair() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel_KeyValuePair();
}
DoubleLinkedQueue_KeyValuePair.prototype.is$Collection = function(){return true};
DoubleLinkedQueue_KeyValuePair.prototype.clear$0 = DoubleLinkedQueue_KeyValuePair.prototype.clear;
DoubleLinkedQueue_KeyValuePair.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
// ********** Code for DoubleLinkedQueue__IsolateEvent **************
$inherits(DoubleLinkedQueue__IsolateEvent, DoubleLinkedQueue);
function DoubleLinkedQueue__IsolateEvent() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel__IsolateEvent();
}
DoubleLinkedQueue__IsolateEvent.prototype.is$Collection = function(){return true};
DoubleLinkedQueue__IsolateEvent.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
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
    $throw(const$0001);
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
StringBufferImpl.prototype.get$length = function() {
  return this._length;
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString();
  if (null == str || str.isEmpty()) return this;
  this._buffer.add(str);
  this._length = this._length + str.length;
  return this;
}
StringBufferImpl.prototype.addAll = function(objects) {
  for (var $$i = objects.iterator(); $$i.hasNext(); ) {
    var obj = $$i.next$0();
    this.add(obj);
  }
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
StringBufferImpl.prototype.add$1 = StringBufferImpl.prototype.add;
StringBufferImpl.prototype.clear$0 = StringBufferImpl.prototype.clear;
// ********** Code for StringBase **************
function StringBase() {}
StringBase.join = function(strings, separator) {
  if (strings.get$length() == (0)) return "";
  var s = strings.$index((0));
  for (var i = (1);
   i < strings.get$length(); i++) {
    s = $add$($add$(s, separator), strings.$index(i));
  }
  return s;
}
StringBase.concatAll = function(strings) {
  return StringBase.join(strings, "");
}
// ********** Code for StringImplementation **************
StringImplementation = String;
StringImplementation.prototype.get$length = function() { return this.length; };
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
StringImplementation.prototype.contains = function(pattern, startIndex) {
  'use strict'; return this.indexOf(pattern, startIndex) >= 0;
}
StringImplementation.prototype._replaceRegExp = function(from, to) {
  'use strict';return this.replace(from.re, to);
}
StringImplementation.prototype._replaceAll = function(from, to) {
  'use strict';
  from = new RegExp(from.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'g');
  to = to.replace(/\$/g, '$$$$'); // Escape sequences are fun!
  return this.replace(from, to);
}
StringImplementation.prototype.replaceAll = function(from, to) {
  if ((typeof(from) == 'string')) return this._replaceAll(from, to);
  if (!!(from && from.is$RegExp())) return this._replaceRegExp(from.get$dynamic().get$_global(), to);
  var buffer = new StringBufferImpl("");
  var lastMatchEnd = (0);
  var $$list = from.allMatches(this);
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var match = $$i.next$0();
    buffer.add$1(this.substring(lastMatchEnd, match.start$0()));
    buffer.add$1(to);
    lastMatchEnd = match.end$0();
  }
  buffer.add$1(this.substring(lastMatchEnd));
}
StringImplementation.prototype.split_ = function(pattern) {
  if ((typeof(pattern) == 'string')) return this._split(pattern);
  if (!!(pattern && pattern.is$RegExp())) return this._splitRegExp(pattern);
  $throw("String.split(Pattern) unimplemented.");
}
StringImplementation.prototype._split = function(pattern) {
  'use strict'; return this.split(pattern);
}
StringImplementation.prototype._splitRegExp = function(pattern) {
  'use strict'; return this.split(pattern.re);
}
StringImplementation.prototype.hashCode = function() {
      'use strict';
      var hash = 0;
      for (var i = 0; i < this.length; i++) {
        hash = 0x1fffffff & (hash + this.charCodeAt(i));
        hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
        hash ^= hash >> 6;
      }

      hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
      hash ^= hash >> 11;
      return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
}
StringImplementation.prototype.contains$1 = StringImplementation.prototype.contains;
StringImplementation.prototype.indexOf$1 = StringImplementation.prototype.indexOf;
// ********** Code for _ArgumentMismatchException **************
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
      // Fast path #1: if no named arguments and arg count matches.
      var thisLength = this.$length || this.length;
      if (thisLength == argsLength && !names) {
        return this;
      }

      var paramsNamed = this.$optional ? (this.$optional.length / 2) : 0;
      var paramsBare = thisLength - paramsNamed;
      var argsNamed = names ? names.length : 0;
      var argsBare = argsLength - argsNamed;

      // Check we got the right number of arguments
      if (argsBare < paramsBare || argsLength > thisLength ||
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

      if (thisLength == argsLength && namesInOrder) {
        // Fast path #2: named arguments, but they're in order and all supplied.
        return this;
      }

      // Note: using Function instead of 'eval' to get a clean scope.
      // TODO(jmesserly): evaluate the performance of these stubs.
      var f = 'function(' + a.join(',') + '){return $f(' + p.join(',') + ');}';
      return new Function('$f', 'return ' + f + '').call(null, this);
    
}
// ********** Code for top level **************
function _constList(other) {
  
    other.__proto__ = ImmutableList.prototype;
    return other;
}
function _map(itemsAndKeys) {
  var ret = new LinkedHashMapImplementation();
  for (var i = (0);
   i < itemsAndKeys.get$length(); ) {
    ret.$setindex(itemsAndKeys.$index(i++), itemsAndKeys.$index(i++));
  }
  return ret;
}
function _constMap(itemsAndKeys) {
  return new ImmutableMap(itemsAndKeys);
}
//  ********** Library html **************
// ********** Code for _EventTargetImpl **************
$defProp(Object.prototype, '$typeNameOf', (function() {
  function constructorNameWithFallback(obj) {
    var constructor = obj.constructor;
    if (typeof(constructor) == 'function') {
      // The constructor isn't null or undefined at this point. Try
      // to grab hold of its name.
      var name = constructor.name;
      // If the name is a non-empty string, we use that as the type
      // name of this object. On Firefox, we often get 'Object' as
      // the constructor name even for more specialized objects so
      // we have to fall through to the toString() based implementation
      // below in that case.
      if (typeof(name) == 'string' && name && name != 'Object') return name;
    }
    var string = Object.prototype.toString.call(obj);
    return string.substring(8, string.length - 1);
  }

  function chrome$typeNameOf() {
    var name = this.constructor.name;
    if (name == 'Window') return 'DOMWindow';
    return name;
  }

  function firefox$typeNameOf() {
    var name = constructorNameWithFallback(this);
    if (name == 'Window') return 'DOMWindow';
    if (name == 'Document') return 'HTMLDocument';
    if (name == 'XMLDocument') return 'Document';
    return name;
  }

  function ie$typeNameOf() {
    var name = constructorNameWithFallback(this);
    if (name == 'Window') return 'DOMWindow';
    // IE calls both HTML and XML documents 'Document', so we check for the
    // xmlVersion property, which is the empty string on HTML documents.
    if (name == 'Document' && this.xmlVersion) return 'Document';
    if (name == 'Document') return 'HTMLDocument';
    return name;
  }

  // If we're not in the browser, we're almost certainly running on v8.
  if (typeof(navigator) != 'object') return chrome$typeNameOf;

  var userAgent = navigator.userAgent;
  if (/Chrome|DumpRenderTree/.test(userAgent)) return chrome$typeNameOf;
  if (/Firefox/.test(userAgent)) return firefox$typeNameOf;
  if (/MSIE/.test(userAgent)) return ie$typeNameOf;
  return function() { return constructorNameWithFallback(this); };
})());
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
$dynamic("_addEventListener").EventTarget = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _NodeImpl **************
$dynamic("get$nodes").Node = function() {
  var list = this.get$_childNodes();
  list.set$_parent(this);
  return list;
}
$dynamic("remove").Node = function() {
  if ($ne$(this.get$parent())) {
    var parent = this.get$parent();
    parent._removeChild(this);
  }
  return this;
}
$dynamic("replaceWith").Node = function(otherNode) {
  try {
    var parent = this.get$parent();
    parent._replaceChild(otherNode, this);
  } catch (e) {
    e = _toDartException(e);
  }
  ;
  return this;
}
$dynamic("get$_attributes").Node = function() {
  return this.attributes;
}
$dynamic("get$_childNodes").Node = function() {
  return this.childNodes;
}
$dynamic("get$parent").Node = function() {
  return this.parentNode;
}
$dynamic("get$text").Node = function() {
  return this.textContent;
}
$dynamic("set$text").Node = function(value) {
  this.textContent = value;
}
$dynamic("_appendChild").Node = function(newChild) {
  return this.appendChild(newChild);
}
$dynamic("_removeChild").Node = function(oldChild) {
  return this.removeChild(oldChild);
}
$dynamic("_replaceChild").Node = function(newChild, oldChild) {
  return this.replaceChild(newChild, oldChild);
}
$dynamic("contains$1").Node = function($0) {
  return this.contains($0);
};
$dynamic("remove$0").Node = function() {
  return this.remove();
};
// ********** Code for _ElementImpl **************
$dynamic("is$html_Element").Element = function(){return true};
$dynamic("get$attributes").Element = function() {
  if (null == this._elementAttributeMap) {
    this._elementAttributeMap = new ElementAttributeMap._wrap$ctor(this);
  }
  return this._elementAttributeMap;
}
$dynamic("get$elements").Element = function() {
  return new _ChildrenElementList._wrap$ctor(this);
}
$dynamic("get$classes").Element = function() {
  if (null == this._cssClassSet) {
    this._cssClassSet = new _CssClassSet(this);
  }
  return this._cssClassSet;
}
$dynamic("get$rect").Element = function() {
  var $this = this; // closure support
  return _createMeasurementFuture((function () {
    return new _ElementRectImpl($this);
  })
  , new CompleterImpl_ElementRect());
}
$dynamic("get$_children").Element = function() {
  return this.children;
}
$dynamic("get$_className").Element = function() {
  return this.className;
}
$dynamic("set$_className").Element = function(value) {
  this.className = value;
}
$dynamic("get$_clientHeight").Element = function() {
  return this.clientHeight;
}
$dynamic("get$_clientLeft").Element = function() {
  return this.clientLeft;
}
$dynamic("get$_clientTop").Element = function() {
  return this.clientTop;
}
$dynamic("get$_clientWidth").Element = function() {
  return this.clientWidth;
}
$dynamic("get$_firstElementChild").Element = function() {
  return this.firstElementChild;
}
$dynamic("get$id").Element = function() { return this.id; };
$dynamic("set$id").Element = function(value) { return this.id = value; };
$dynamic("set$innerHTML").Element = function(value) { return this.innerHTML = value; };
$dynamic("get$_offsetHeight").Element = function() {
  return this.offsetHeight;
}
$dynamic("get$_offsetLeft").Element = function() {
  return this.offsetLeft;
}
$dynamic("get$_offsetTop").Element = function() {
  return this.offsetTop;
}
$dynamic("get$_offsetWidth").Element = function() {
  return this.offsetWidth;
}
$dynamic("get$_scrollHeight").Element = function() {
  return this.scrollHeight;
}
$dynamic("get$_scrollLeft").Element = function() {
  return this.scrollLeft;
}
$dynamic("get$_scrollTop").Element = function() {
  return this.scrollTop;
}
$dynamic("get$_scrollWidth").Element = function() {
  return this.scrollWidth;
}
$dynamic("get$style").Element = function() { return this.style; };
$dynamic("_getAttribute").Element = function(name) {
  return this.getAttribute(name);
}
$dynamic("_getBoundingClientRect").Element = function() {
  return this.getBoundingClientRect();
}
$dynamic("_getClientRects").Element = function() {
  return this.getClientRects();
}
$dynamic("_hasAttribute").Element = function(name) {
  return this.hasAttribute(name);
}
$dynamic("query").Element = function(selectors) {
  return this.querySelector(selectors);
}
$dynamic("_removeAttribute").Element = function(name) {
  this.removeAttribute(name);
}
$dynamic("_setAttribute").Element = function(name, value) {
  this.setAttribute(name, value);
}
// ********** Code for _HTMLElementImpl **************
// ********** Code for _AbstractWorkerImpl **************
$dynamic("_addEventListener").AbstractWorker = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _AnchorElementImpl **************
$dynamic("is$html_Element").HTMLAnchorElement = function(){return true};
$dynamic("get$name").HTMLAnchorElement = function() { return this.name; };
// ********** Code for _AnimationImpl **************
$dynamic("get$name").WebKitAnimation = function() { return this.name; };
// ********** Code for _EventImpl **************
// ********** Code for _AnimationEventImpl **************
// ********** Code for _AnimationListImpl **************
$dynamic("get$length").WebKitAnimationList = function() { return this.length; };
// ********** Code for _AppletElementImpl **************
$dynamic("is$html_Element").HTMLAppletElement = function(){return true};
$dynamic("get$height").HTMLAppletElement = function() { return this.height; };
$dynamic("get$name").HTMLAppletElement = function() { return this.name; };
// ********** Code for _AreaElementImpl **************
$dynamic("is$html_Element").HTMLAreaElement = function(){return true};
// ********** Code for _ArrayBufferImpl **************
// ********** Code for _ArrayBufferViewImpl **************
// ********** Code for _AttrImpl **************
$dynamic("get$name").Attr = function() { return this.name; };
$dynamic("get$value").Attr = function() { return this.value; };
$dynamic("set$value").Attr = function(value) { return this.value = value; };
// ********** Code for _AudioBufferImpl **************
$dynamic("get$length").AudioBuffer = function() { return this.length; };
// ********** Code for _AudioNodeImpl **************
// ********** Code for _AudioSourceNodeImpl **************
// ********** Code for _AudioBufferSourceNodeImpl **************
// ********** Code for _AudioChannelMergerImpl **************
// ********** Code for _AudioChannelSplitterImpl **************
// ********** Code for _AudioContextImpl **************
// ********** Code for _AudioDestinationNodeImpl **************
// ********** Code for _MediaElementImpl **************
$dynamic("is$html_Element").HTMLMediaElement = function(){return true};
// ********** Code for _AudioElementImpl **************
$dynamic("is$html_Element").HTMLAudioElement = function(){return true};
// ********** Code for _AudioParamImpl **************
$dynamic("get$name").AudioParam = function() { return this.name; };
$dynamic("get$value").AudioParam = function() { return this.value; };
$dynamic("set$value").AudioParam = function(value) { return this.value = value; };
// ********** Code for _AudioGainImpl **************
// ********** Code for _AudioGainNodeImpl **************
// ********** Code for _AudioListenerImpl **************
// ********** Code for _AudioPannerNodeImpl **************
// ********** Code for _AudioProcessingEventImpl **************
// ********** Code for _BRElementImpl **************
$dynamic("is$html_Element").HTMLBRElement = function(){return true};
// ********** Code for _BarInfoImpl **************
// ********** Code for _BaseElementImpl **************
$dynamic("is$html_Element").HTMLBaseElement = function(){return true};
// ********** Code for _BaseFontElementImpl **************
$dynamic("is$html_Element").HTMLBaseFontElement = function(){return true};
$dynamic("set$color").HTMLBaseFontElement = function(value) { return this.color = value; };
// ********** Code for _BeforeLoadEventImpl **************
// ********** Code for _BiquadFilterNodeImpl **************
// ********** Code for _BlobImpl **************
// ********** Code for _BlobBuilderImpl **************
// ********** Code for _BodyElementImpl **************
$dynamic("is$html_Element").HTMLBodyElement = function(){return true};
// ********** Code for _ButtonElementImpl **************
$dynamic("is$html_Element").HTMLButtonElement = function(){return true};
$dynamic("get$name").HTMLButtonElement = function() { return this.name; };
$dynamic("get$value").HTMLButtonElement = function() { return this.value; };
$dynamic("set$value").HTMLButtonElement = function(value) { return this.value = value; };
// ********** Code for _CharacterDataImpl **************
$dynamic("get$length").CharacterData = function() { return this.length; };
// ********** Code for _TextImpl **************
// ********** Code for _CDATASectionImpl **************
// ********** Code for _CSSRuleImpl **************
// ********** Code for _CSSCharsetRuleImpl **************
// ********** Code for _CSSFontFaceRuleImpl **************
$dynamic("get$style").CSSFontFaceRule = function() { return this.style; };
// ********** Code for _CSSImportRuleImpl **************
// ********** Code for _CSSKeyframeRuleImpl **************
$dynamic("get$style").WebKitCSSKeyframeRule = function() { return this.style; };
// ********** Code for _CSSKeyframesRuleImpl **************
$dynamic("get$name").WebKitCSSKeyframesRule = function() { return this.name; };
// ********** Code for _CSSMatrixImpl **************
// ********** Code for _CSSMediaRuleImpl **************
// ********** Code for _CSSPageRuleImpl **************
$dynamic("get$style").CSSPageRule = function() { return this.style; };
// ********** Code for _CSSValueImpl **************
// ********** Code for _CSSPrimitiveValueImpl **************
// ********** Code for _CSSRuleListImpl **************
$dynamic("get$length").CSSRuleList = function() { return this.length; };
// ********** Code for _CSSStyleDeclarationImpl **************
$dynamic("get$length").CSSStyleDeclaration = function() { return this.length; };
$dynamic("set$color").CSSStyleDeclaration = function(value) {
  this.setProperty("color", value, "");
}
$dynamic("set$fontSize").CSSStyleDeclaration = function(value) {
  this.setProperty("font-size", value, "");
}
$dynamic("get$height").CSSStyleDeclaration = function() {
  return this.getPropertyValue("height");
}
$dynamic("set$left").CSSStyleDeclaration = function(value) {
  this.setProperty("left", value, "");
}
$dynamic("set$opacity").CSSStyleDeclaration = function(value) {
  this.setProperty("opacity", value, "");
}
$dynamic("get$top").CSSStyleDeclaration = function() {
  return this.getPropertyValue("top");
}
$dynamic("set$top").CSSStyleDeclaration = function(value) {
  this.setProperty("top", value, "");
}
// ********** Code for _CSSStyleRuleImpl **************
$dynamic("get$style").CSSStyleRule = function() { return this.style; };
// ********** Code for _StyleSheetImpl **************
// ********** Code for _CSSStyleSheetImpl **************
// ********** Code for _CSSValueListImpl **************
$dynamic("get$length").CSSValueList = function() { return this.length; };
// ********** Code for _CSSTransformValueImpl **************
// ********** Code for _CSSUnknownRuleImpl **************
// ********** Code for _CanvasElementImpl **************
$dynamic("is$html_Element").HTMLCanvasElement = function(){return true};
$dynamic("get$height").HTMLCanvasElement = function() { return this.height; };
// ********** Code for _CanvasGradientImpl **************
// ********** Code for _CanvasPatternImpl **************
// ********** Code for _CanvasPixelArrayImpl **************
$dynamic("is$List").CanvasPixelArray = function(){return true};
$dynamic("is$Collection").CanvasPixelArray = function(){return true};
$dynamic("get$length").CanvasPixelArray = function() { return this.length; };
$dynamic("$index").CanvasPixelArray = function(index) {
  return this[index];
}
$dynamic("$setindex").CanvasPixelArray = function(index, value) {
  this[index] = value
}
$dynamic("iterator").CanvasPixelArray = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").CanvasPixelArray = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").CanvasPixelArray = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").CanvasPixelArray = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").CanvasPixelArray = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("isEmpty").CanvasPixelArray = function() {
  return this.length == (0);
}
$dynamic("indexOf").CanvasPixelArray = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").CanvasPixelArray = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").CanvasPixelArray = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").CanvasPixelArray = function(start, length) {
  return _Lists.getRange(this, start, length, []);
}
$dynamic("add$1").CanvasPixelArray = function($0) {
  return this.add($0);
};
$dynamic("filter$1").CanvasPixelArray = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").CanvasPixelArray = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _CanvasRenderingContextImpl **************
// ********** Code for _CanvasRenderingContext2DImpl **************
// ********** Code for _ClientRectImpl **************
$dynamic("get$height").ClientRect = function() { return this.height; };
$dynamic("get$top").ClientRect = function() { return this.top; };
// ********** Code for _ClientRectListImpl **************
$dynamic("get$length").ClientRectList = function() { return this.length; };
// ********** Code for _ClipboardImpl **************
// ********** Code for _CloseEventImpl **************
// ********** Code for _CommentImpl **************
// ********** Code for _UIEventImpl **************
$dynamic("get$charCode").UIEvent = function() { return this.charCode; };
// ********** Code for _CompositionEventImpl **************
// ********** Code for _ConsoleImpl **************
_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.error$1 = _ConsoleImpl.error;
// ********** Code for _ContentElementImpl **************
$dynamic("is$html_Element").HTMLContentElement = function(){return true};
// ********** Code for _ConvolverNodeImpl **************
// ********** Code for _CoordinatesImpl **************
// ********** Code for _CounterImpl **************
// ********** Code for _CryptoImpl **************
// ********** Code for _CustomEventImpl **************
// ********** Code for _DListElementImpl **************
$dynamic("is$html_Element").HTMLDListElement = function(){return true};
// ********** Code for _DOMApplicationCacheImpl **************
$dynamic("_addEventListener").DOMApplicationCache = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _DOMExceptionImpl **************
$dynamic("get$name").DOMException = function() { return this.name; };
// ********** Code for _DOMFileSystemImpl **************
$dynamic("get$name").DOMFileSystem = function() { return this.name; };
// ********** Code for _DOMFileSystemSyncImpl **************
$dynamic("get$name").DOMFileSystemSync = function() { return this.name; };
// ********** Code for _DOMFormDataImpl **************
// ********** Code for _DOMImplementationImpl **************
// ********** Code for _DOMMimeTypeImpl **************
// ********** Code for _DOMMimeTypeArrayImpl **************
$dynamic("get$length").DOMMimeTypeArray = function() { return this.length; };
// ********** Code for _DOMParserImpl **************
// ********** Code for _DOMPluginImpl **************
$dynamic("get$length").DOMPlugin = function() { return this.length; };
$dynamic("get$name").DOMPlugin = function() { return this.name; };
// ********** Code for _DOMPluginArrayImpl **************
$dynamic("get$length").DOMPluginArray = function() { return this.length; };
// ********** Code for _DOMSelectionImpl **************
// ********** Code for _DOMTokenListImpl **************
$dynamic("get$length").DOMTokenList = function() { return this.length; };
$dynamic("add$1").DOMTokenList = function($0) {
  return this.add($0);
};
$dynamic("contains$1").DOMTokenList = function($0) {
  return this.contains($0);
};
// ********** Code for _DOMSettableTokenListImpl **************
$dynamic("get$value").DOMSettableTokenList = function() { return this.value; };
$dynamic("set$value").DOMSettableTokenList = function(value) { return this.value = value; };
// ********** Code for _DOMURLImpl **************
// ********** Code for _DataTransferItemImpl **************
// ********** Code for _DataTransferItemListImpl **************
$dynamic("get$length").DataTransferItemList = function() { return this.length; };
$dynamic("add$1").DataTransferItemList = function($0) {
  return this.add($0);
};
$dynamic("clear$0").DataTransferItemList = function() {
  return this.clear();
};
// ********** Code for _DataViewImpl **************
// ********** Code for _DatabaseImpl **************
// ********** Code for _DatabaseSyncImpl **************
// ********** Code for _WorkerContextImpl **************
// ********** Code for _DedicatedWorkerContextImpl **************
$dynamic("set$onmessage").DedicatedWorkerContext = function(value) { return this.onmessage = value; };
$dynamic("postMessage$1").DedicatedWorkerContext = function($0) {
  return this.postMessage($0);
};
// ********** Code for _DelayNodeImpl **************
// ********** Code for _DeprecatedPeerConnectionImpl **************
$dynamic("set$onmessage").DeprecatedPeerConnection = function(value) { return this.onmessage = value; };
// ********** Code for _DetailsElementImpl **************
$dynamic("is$html_Element").HTMLDetailsElement = function(){return true};
// ********** Code for _DeviceMotionEventImpl **************
// ********** Code for _DeviceOrientationEventImpl **************
// ********** Code for _DirectoryElementImpl **************
$dynamic("is$html_Element").HTMLDirectoryElement = function(){return true};
// ********** Code for _EntryImpl **************
$dynamic("get$name").Entry = function() { return this.name; };
// ********** Code for _DirectoryEntryImpl **************
// ********** Code for _EntrySyncImpl **************
$dynamic("get$name").EntrySync = function() { return this.name; };
$dynamic("remove$0").EntrySync = function() {
  return this.remove();
};
// ********** Code for _DirectoryEntrySyncImpl **************
// ********** Code for _DirectoryReaderImpl **************
// ********** Code for _DirectoryReaderSyncImpl **************
// ********** Code for _DivElementImpl **************
$dynamic("is$html_Element").HTMLDivElement = function(){return true};
// ********** Code for _DocumentImpl **************
$dynamic("is$html_Element").HTMLHtmlElement = function(){return true};
$dynamic("_createElement").HTMLHtmlElement = function(tagName) {
  return this.parentNode.createElement(tagName);
}
$dynamic("get$parent").HTMLHtmlElement = function() {
  return null;
}
// ********** Code for _SecretHtmlDocumentImpl **************
// ********** Code for FilteredElementList **************
function FilteredElementList(node) {
  this._node = node;
  this._childNodes = node.get$nodes();
}
FilteredElementList.prototype.is$List = function(){return true};
FilteredElementList.prototype.is$Collection = function(){return true};
FilteredElementList.prototype.get$_filtered = function() {
  return ListFactory.ListFactory$from$factory(this._childNodes.filter((function (n) {
    return !!(n && n.is$html_Element());
  })
  ));
}
FilteredElementList.prototype.get$first = function() {
  var $$list = this._childNodes;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var node = $$i.next$0();
    if (!!(node && node.is$html_Element())) {
      return node;
    }
  }
  return null;
}
FilteredElementList.prototype.forEach = function(f) {
  this.get$_filtered().forEach(f);
}
FilteredElementList.prototype.$setindex = function(index, value) {
  this.$index(index).replaceWith(value);
}
FilteredElementList.prototype.add = function(value) {
  this._childNodes.add(value);
}
FilteredElementList.prototype.get$add = function() {
  return this.add.bind(this);
}
FilteredElementList.prototype.addAll = function(collection) {
  collection.forEach(this.get$add());
}
FilteredElementList.prototype.removeRange = function(start, length) {
  this.get$_filtered().getRange(start, length).forEach((function (el) {
    return el.remove$0();
  })
  );
}
FilteredElementList.prototype.clear = function() {
  this._childNodes.clear();
}
FilteredElementList.prototype.removeLast = function() {
  var last = this.last();
  if ($ne$(last)) {
    last.remove$0();
  }
  return last;
}
FilteredElementList.prototype.filter = function(f) {
  return this.get$_filtered().filter(f);
}
FilteredElementList.prototype.isEmpty = function() {
  return this.get$_filtered().isEmpty();
}
FilteredElementList.prototype.get$length = function() {
  return this.get$_filtered().get$length();
}
FilteredElementList.prototype.$index = function(index) {
  return this.get$_filtered().$index(index);
}
FilteredElementList.prototype.iterator = function() {
  return this.get$_filtered().iterator();
}
FilteredElementList.prototype.getRange = function(start, length) {
  return this.get$_filtered().getRange(start, length);
}
FilteredElementList.prototype.indexOf = function(element, start) {
  return this.get$_filtered().indexOf(element, start);
}
FilteredElementList.prototype.last = function() {
  return this.get$_filtered().last();
}
FilteredElementList.prototype.add$1 = FilteredElementList.prototype.add;
FilteredElementList.prototype.clear$0 = FilteredElementList.prototype.clear;
FilteredElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
FilteredElementList.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for EmptyElementRect **************
function EmptyElementRect() {
  this.client = const$0010;
  this.offset = const$0010;
  this.scroll = const$0010;
  this.bounding = const$0010;
  this.clientRects = const$0012;
}
EmptyElementRect.prototype.get$bounding = function() { return this.bounding; };
// ********** Code for _DocumentFragmentImpl **************
$dynamic("is$html_Element").DocumentFragment = function(){return true};
$dynamic("get$elements").DocumentFragment = function() {
  if (this._elements == null) {
    this._elements = new FilteredElementList(this);
  }
  return this._elements;
}
$dynamic("set$innerHTML").DocumentFragment = function(value) {
  this.get$nodes().clear();
  var e = _ElementFactoryProvider.Element$tag$factory("div");
  e.set$innerHTML(value);
  var nodes = ListFactory.ListFactory$from$factory(e.get$nodes());
  this.get$nodes().addAll(nodes);
}
$dynamic("get$rect").DocumentFragment = function() {
  return _createMeasurementFuture((function () {
    return const$0013;
  })
  , new CompleterImpl_ElementRect());
}
$dynamic("get$id").DocumentFragment = function() {
  return "";
}
$dynamic("set$id").DocumentFragment = function(value) {
  $throw(new UnsupportedOperationException("ID can't be set for document fragments."));
}
$dynamic("get$parent").DocumentFragment = function() {
  return null;
}
$dynamic("get$classes").DocumentFragment = function() {
  return new HashSetImplementation_dart_core_String();
}
$dynamic("get$style").DocumentFragment = function() {
  return _ElementFactoryProvider.Element$tag$factory("div").get$style();
}
$dynamic("query").DocumentFragment = function(selectors) {
  return this.querySelector(selectors);
}
// ********** Code for _DocumentTypeImpl **************
$dynamic("get$name").DocumentType = function() { return this.name; };
// ********** Code for _DynamicsCompressorNodeImpl **************
// ********** Code for _EXTTextureFilterAnisotropicImpl **************
// ********** Code for _ChildrenElementList **************
_ChildrenElementList._wrap$ctor = function(element) {
  this._html_element = element;
  this._childElements = element.get$_children();
}
_ChildrenElementList._wrap$ctor.prototype = _ChildrenElementList.prototype;
function _ChildrenElementList() {}
_ChildrenElementList.prototype.is$List = function(){return true};
_ChildrenElementList.prototype.is$Collection = function(){return true};
_ChildrenElementList.prototype._toList = function() {
  var output = new Array(this._childElements.get$length());
  for (var i = (0), len = this._childElements.get$length();
   i < len; i++) {
    output.$setindex(i, this._childElements.$index(i));
  }
  return output;
}
_ChildrenElementList.prototype.get$first = function() {
  return this._html_element.get$_firstElementChild();
}
_ChildrenElementList.prototype.forEach = function(f) {
  var $$list = this._childElements;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var element = $$i.next();
    f(element);
  }
}
_ChildrenElementList.prototype.filter = function(f) {
  var output = [];
  this.forEach((function (element) {
    if (f(element)) {
      output.add$1(element);
    }
  })
  );
  return new _FrozenElementList._wrap$ctor(output);
}
_ChildrenElementList.prototype.isEmpty = function() {
  return this._html_element.get$_firstElementChild() == null;
}
_ChildrenElementList.prototype.get$length = function() {
  return this._childElements.get$length();
}
_ChildrenElementList.prototype.$index = function(index) {
  return this._childElements.$index(index);
}
_ChildrenElementList.prototype.$setindex = function(index, value) {
  this._html_element._replaceChild(value, this._childElements.$index(index));
}
_ChildrenElementList.prototype.add = function(value) {
  this._html_element._appendChild(value);
  return value;
}
_ChildrenElementList.prototype.iterator = function() {
  return this._toList().iterator();
}
_ChildrenElementList.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var element = $$i.next$0();
    this._html_element._appendChild(element);
  }
}
_ChildrenElementList.prototype.removeRange = function(start, length) {
  $throw(const$0015);
}
_ChildrenElementList.prototype.getRange = function(start, length) {
  return new _FrozenElementList._wrap$ctor(_Lists.getRange(this, start, length, []));
}
_ChildrenElementList.prototype.indexOf = function(element, start) {
  return _Lists.indexOf(this, element, start, this.get$length());
}
_ChildrenElementList.prototype.clear = function() {
  this._html_element.set$text("");
}
_ChildrenElementList.prototype.removeLast = function() {
  var last = this.last();
  if ($ne$(last)) {
    this._html_element._removeChild(last);
  }
  return last;
}
_ChildrenElementList.prototype.last = function() {
  return this._html_element.lastElementChild;
}
_ChildrenElementList.prototype.add$1 = _ChildrenElementList.prototype.add;
_ChildrenElementList.prototype.clear$0 = _ChildrenElementList.prototype.clear;
_ChildrenElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ChildrenElementList.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _FrozenElementList **************
_FrozenElementList._wrap$ctor = function(_nodeList) {
  this._nodeList = _nodeList;
}
_FrozenElementList._wrap$ctor.prototype = _FrozenElementList.prototype;
function _FrozenElementList() {}
_FrozenElementList.prototype.is$List = function(){return true};
_FrozenElementList.prototype.is$Collection = function(){return true};
_FrozenElementList.prototype.get$first = function() {
  return this._nodeList.$index((0));
}
_FrozenElementList.prototype.forEach = function(f) {
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var el = $$i.next();
    f(el);
  }
}
_FrozenElementList.prototype.filter = function(f) {
  var out = new _ElementList([]);
  for (var $$i = this.iterator(); $$i.hasNext(); ) {
    var el = $$i.next();
    if (f(el)) out.add$1(el);
  }
  return out;
}
_FrozenElementList.prototype.isEmpty = function() {
  return this._nodeList.isEmpty();
}
_FrozenElementList.prototype.get$length = function() {
  return this._nodeList.get$length();
}
_FrozenElementList.prototype.$index = function(index) {
  return this._nodeList.$index(index);
}
_FrozenElementList.prototype.$setindex = function(index, value) {
  $throw(const$0003);
}
_FrozenElementList.prototype.add = function(value) {
  $throw(const$0003);
}
_FrozenElementList.prototype.iterator = function() {
  return new _FrozenElementListIterator(this);
}
_FrozenElementList.prototype.addAll = function(collection) {
  $throw(const$0003);
}
_FrozenElementList.prototype.removeRange = function(start, length) {
  $throw(const$0003);
}
_FrozenElementList.prototype.getRange = function(start, length) {
  return new _FrozenElementList._wrap$ctor(this._nodeList.getRange(start, length));
}
_FrozenElementList.prototype.indexOf = function(element, start) {
  return this._nodeList.indexOf(element, start);
}
_FrozenElementList.prototype.clear = function() {
  $throw(const$0003);
}
_FrozenElementList.prototype.removeLast = function() {
  $throw(const$0003);
}
_FrozenElementList.prototype.last = function() {
  return this._nodeList.last();
}
_FrozenElementList.prototype.add$1 = _FrozenElementList.prototype.add;
_FrozenElementList.prototype.clear$0 = _FrozenElementList.prototype.clear;
_FrozenElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_FrozenElementList.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _FrozenElementListIterator **************
function _FrozenElementListIterator(_list) {
  this._html_list = _list;
  this._html_index = (0);
}
_FrozenElementListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._html_list.$index(this._html_index++);
}
_FrozenElementListIterator.prototype.hasNext = function() {
  return this._html_index < this._html_list.get$length();
}
_FrozenElementListIterator.prototype.next$0 = _FrozenElementListIterator.prototype.next;
// ********** Code for _ListWrapper **************
function _ListWrapper() {}
_ListWrapper.prototype.is$List = function(){return true};
_ListWrapper.prototype.is$Collection = function(){return true};
_ListWrapper.prototype.iterator = function() {
  return this._html_list.iterator();
}
_ListWrapper.prototype.forEach = function(f) {
  return this._html_list.forEach(f);
}
_ListWrapper.prototype.filter = function(f) {
  return this._html_list.filter(f);
}
_ListWrapper.prototype.isEmpty = function() {
  return this._html_list.isEmpty();
}
_ListWrapper.prototype.get$length = function() {
  return this._html_list.get$length();
}
_ListWrapper.prototype.$index = function(index) {
  return this._html_list.$index(index);
}
_ListWrapper.prototype.$setindex = function(index, value) {
  this._html_list.$setindex(index, value);
}
_ListWrapper.prototype.add = function(value) {
  return this._html_list.add(value);
}
_ListWrapper.prototype.addAll = function(collection) {
  return this._html_list.addAll(collection);
}
_ListWrapper.prototype.indexOf = function(element, start) {
  return this._html_list.indexOf(element, start);
}
_ListWrapper.prototype.clear = function() {
  return this._html_list.clear();
}
_ListWrapper.prototype.removeLast = function() {
  return this._html_list.removeLast();
}
_ListWrapper.prototype.last = function() {
  return this._html_list.last();
}
_ListWrapper.prototype.getRange = function(start, length) {
  return this._html_list.getRange(start, length);
}
_ListWrapper.prototype.removeRange = function(start, length) {
  return this._html_list.removeRange(start, length);
}
_ListWrapper.prototype.get$first = function() {
  return this._html_list.$index((0));
}
_ListWrapper.prototype.add$1 = _ListWrapper.prototype.add;
_ListWrapper.prototype.clear$0 = _ListWrapper.prototype.clear;
_ListWrapper.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ListWrapper.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _ListWrapper_Element **************
$inherits(_ListWrapper_Element, _ListWrapper);
function _ListWrapper_Element(_list) {
  this._html_list = _list;
}
_ListWrapper_Element.prototype.is$List = function(){return true};
_ListWrapper_Element.prototype.is$Collection = function(){return true};
_ListWrapper_Element.prototype.add$1 = _ListWrapper_Element.prototype.add;
_ListWrapper_Element.prototype.clear$0 = _ListWrapper_Element.prototype.clear;
_ListWrapper_Element.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ListWrapper_Element.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _ElementList **************
$inherits(_ElementList, _ListWrapper_Element);
function _ElementList(list) {
  _ListWrapper_Element.call(this, list);
}
_ElementList.prototype.is$List = function(){return true};
_ElementList.prototype.is$Collection = function(){return true};
_ElementList.prototype.filter = function(f) {
  return new _ElementList(_ListWrapper_Element.prototype.filter.call(this, f));
}
_ElementList.prototype.getRange = function(start, length) {
  return new _ElementList(_ListWrapper_Element.prototype.getRange.call(this, start, length));
}
_ElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
// ********** Code for ElementAttributeMap **************
ElementAttributeMap._wrap$ctor = function(_element) {
  this._html_element = _element;
}
ElementAttributeMap._wrap$ctor.prototype = ElementAttributeMap.prototype;
function ElementAttributeMap() {}
ElementAttributeMap.prototype.is$Map = function(){return true};
ElementAttributeMap.prototype.containsKey = function(key) {
  return this._html_element._hasAttribute(key);
}
ElementAttributeMap.prototype.$index = function(key) {
  return this._html_element._getAttribute(key);
}
ElementAttributeMap.prototype.$setindex = function(key, value) {
  this._html_element._setAttribute(key, value);
}
ElementAttributeMap.prototype.remove = function(key) {
  this._html_element._removeAttribute(key);
}
ElementAttributeMap.prototype.clear = function() {
  var attributes = this._html_element.get$_attributes();
  for (var i = attributes.get$length() - (1);
   i >= (0); i--) {
    this.remove(attributes.$index(i).get$name());
  }
}
ElementAttributeMap.prototype.forEach = function(f) {
  var attributes = this._html_element.get$_attributes();
  for (var i = (0), len = attributes.get$length();
   i < len; i++) {
    var item = attributes.$index(i);
    f(item.get$name(), item.get$value());
  }
}
ElementAttributeMap.prototype.getKeys = function() {
  var attributes = this._html_element.get$_attributes();
  var keys = new Array(attributes.get$length());
  for (var i = (0), len = attributes.get$length();
   i < len; i++) {
    keys.$setindex(i, attributes.$index(i).get$name());
  }
  return keys;
}
ElementAttributeMap.prototype.getValues = function() {
  var attributes = this._html_element.get$_attributes();
  var values = new Array(attributes.get$length());
  for (var i = (0), len = attributes.get$length();
   i < len; i++) {
    values.$setindex(i, attributes.$index(i).get$value());
  }
  return values;
}
ElementAttributeMap.prototype.get$length = function() {
  return this._html_element.get$_attributes().length;
}
ElementAttributeMap.prototype.isEmpty = function() {
  return this.get$length() == (0);
}
ElementAttributeMap.prototype.clear$0 = ElementAttributeMap.prototype.clear;
// ********** Code for _SimpleClientRect **************
function _SimpleClientRect(left, top, width, height) {
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;
}
_SimpleClientRect.prototype.get$top = function() { return this.top; };
_SimpleClientRect.prototype.get$height = function() { return this.height; };
_SimpleClientRect.prototype.$eq = function(other) {
  return null != other && this.left == other.left && this.top == other.top && this.width == other.width && this.height == other.height;
}
_SimpleClientRect.prototype.toString = function() {
  return ("(" + this.left + ", " + this.top + ", " + this.width + ", " + this.height + ")");
}
// ********** Code for _ElementRectImpl **************
function _ElementRectImpl(element) {
  this.client = new _SimpleClientRect(element.get$_clientLeft(), element.get$_clientTop(), element.get$_clientWidth(), element.get$_clientHeight());
  this.offset = new _SimpleClientRect(element.get$_offsetLeft(), element.get$_offsetTop(), element.get$_offsetWidth(), element.get$_offsetHeight());
  this.scroll = new _SimpleClientRect(element.get$_scrollLeft(), element.get$_scrollTop(), element.get$_scrollWidth(), element.get$_scrollHeight());
  this._boundingClientRect = element._getBoundingClientRect();
  this._clientRects = element._getClientRects();
}
_ElementRectImpl.prototype.get$bounding = function() {
  return this._boundingClientRect;
}
// ********** Code for _ElementTimeControlImpl **************
// ********** Code for _ElementTraversalImpl **************
// ********** Code for _EmbedElementImpl **************
$dynamic("is$html_Element").HTMLEmbedElement = function(){return true};
$dynamic("get$height").HTMLEmbedElement = function() { return this.height; };
$dynamic("get$name").HTMLEmbedElement = function() { return this.name; };
// ********** Code for _EntityImpl **************
// ********** Code for _EntityReferenceImpl **************
// ********** Code for _EntryArrayImpl **************
$dynamic("get$length").EntryArray = function() { return this.length; };
// ********** Code for _EntryArraySyncImpl **************
$dynamic("get$length").EntryArraySync = function() { return this.length; };
// ********** Code for _ErrorEventImpl **************
// ********** Code for _EventExceptionImpl **************
$dynamic("get$name").EventException = function() { return this.name; };
// ********** Code for _EventSourceImpl **************
$dynamic("_addEventListener").EventSource = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _EventsImpl **************
function _EventsImpl(_ptr) {
  this._ptr = _ptr;
}
_EventsImpl.prototype.get$_ptr = function() { return this._ptr; };
_EventsImpl.prototype.$index = function(type) {
  return this._get(type.toLowerCase());
}
_EventsImpl.prototype._get = function(type) {
  return new _EventListenerListImpl(this._ptr, type);
}
// ********** Code for _EventListenerListImpl **************
function _EventListenerListImpl(_ptr, _type) {
  this._ptr = _ptr;
  this._type = _type;
}
_EventListenerListImpl.prototype.get$_ptr = function() { return this._ptr; };
_EventListenerListImpl.prototype.add = function(listener, useCapture) {
  this._add(listener, useCapture);
  return this;
}
_EventListenerListImpl.prototype._add = function(listener, useCapture) {
  this._ptr._addEventListener(this._type, listener, useCapture);
}
_EventListenerListImpl.prototype.add$1 = function($0) {
  return this.add(to$call$1($0), false);
};
// ********** Code for _FieldSetElementImpl **************
$dynamic("is$html_Element").HTMLFieldSetElement = function(){return true};
$dynamic("get$name").HTMLFieldSetElement = function() { return this.name; };
// ********** Code for _FileImpl **************
$dynamic("get$name").File = function() { return this.name; };
// ********** Code for _FileEntryImpl **************
// ********** Code for _FileEntrySyncImpl **************
// ********** Code for _FileErrorImpl **************
// ********** Code for _FileExceptionImpl **************
$dynamic("get$name").FileException = function() { return this.name; };
// ********** Code for _FileListImpl **************
$dynamic("get$length").FileList = function() { return this.length; };
// ********** Code for _FileReaderImpl **************
// ********** Code for _FileReaderSyncImpl **************
// ********** Code for _FileWriterImpl **************
$dynamic("get$length").FileWriter = function() { return this.length; };
// ********** Code for _FileWriterSyncImpl **************
$dynamic("get$length").FileWriterSync = function() { return this.length; };
// ********** Code for _Float32ArrayImpl **************
var _Float32ArrayImpl = {};
$dynamic("is$List").Float32Array = function(){return true};
$dynamic("is$Collection").Float32Array = function(){return true};
$dynamic("get$length").Float32Array = function() { return this.length; };
$dynamic("$index").Float32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float32Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Float32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Float32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("isEmpty").Float32Array = function() {
  return this.length == (0);
}
$dynamic("indexOf").Float32Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Float32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").Float32Array = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").Float32Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
}
$dynamic("add$1").Float32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Float32Array = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").Float32Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _Float64ArrayImpl **************
var _Float64ArrayImpl = {};
$dynamic("is$List").Float64Array = function(){return true};
$dynamic("is$Collection").Float64Array = function(){return true};
$dynamic("get$length").Float64Array = function() { return this.length; };
$dynamic("$index").Float64Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float64Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float64Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float64Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Float64Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float64Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Float64Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("isEmpty").Float64Array = function() {
  return this.length == (0);
}
$dynamic("indexOf").Float64Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Float64Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").Float64Array = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").Float64Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
}
$dynamic("add$1").Float64Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Float64Array = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").Float64Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _FontElementImpl **************
$dynamic("is$html_Element").HTMLFontElement = function(){return true};
$dynamic("set$color").HTMLFontElement = function(value) { return this.color = value; };
// ********** Code for _FormElementImpl **************
$dynamic("is$html_Element").HTMLFormElement = function(){return true};
$dynamic("get$length").HTMLFormElement = function() { return this.length; };
$dynamic("get$name").HTMLFormElement = function() { return this.name; };
// ********** Code for _FrameElementImpl **************
$dynamic("is$html_Element").HTMLFrameElement = function(){return true};
$dynamic("get$height").HTMLFrameElement = function() { return this.height; };
$dynamic("get$name").HTMLFrameElement = function() { return this.name; };
// ********** Code for _FrameSetElementImpl **************
$dynamic("is$html_Element").HTMLFrameSetElement = function(){return true};
// ********** Code for _GeolocationImpl **************
// ********** Code for _GeopositionImpl **************
// ********** Code for _HRElementImpl **************
$dynamic("is$html_Element").HTMLHRElement = function(){return true};
// ********** Code for _HTMLAllCollectionImpl **************
$dynamic("get$length").HTMLAllCollection = function() { return this.length; };
// ********** Code for _HTMLCollectionImpl **************
$dynamic("is$List").HTMLCollection = function(){return true};
$dynamic("is$Collection").HTMLCollection = function(){return true};
$dynamic("get$length").HTMLCollection = function() { return this.length; };
$dynamic("$index").HTMLCollection = function(index) {
  return this[index];
}
$dynamic("$setindex").HTMLCollection = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").HTMLCollection = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").HTMLCollection = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").HTMLCollection = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").HTMLCollection = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").HTMLCollection = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("isEmpty").HTMLCollection = function() {
  return this.get$length() == (0);
}
$dynamic("indexOf").HTMLCollection = function(element, start) {
  return _Lists.indexOf(this, element, start, this.get$length());
}
$dynamic("last").HTMLCollection = function() {
  return this.$index(this.get$length() - (1));
}
$dynamic("removeRange").HTMLCollection = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").HTMLCollection = function(start, length) {
  return _Lists.getRange(this, start, length, []);
}
$dynamic("add$1").HTMLCollection = function($0) {
  return this.add($0);
};
$dynamic("filter$1").HTMLCollection = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").HTMLCollection = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _HTMLOptionsCollectionImpl **************
$dynamic("is$List").HTMLOptionsCollection = function(){return true};
$dynamic("is$Collection").HTMLOptionsCollection = function(){return true};
$dynamic("get$length").HTMLOptionsCollection = function() {
  return this.length;
}
// ********** Code for _HashChangeEventImpl **************
// ********** Code for _HeadElementImpl **************
$dynamic("is$html_Element").HTMLHeadElement = function(){return true};
// ********** Code for _HeadingElementImpl **************
$dynamic("is$html_Element").HTMLHeadingElement = function(){return true};
// ********** Code for _HighPass2FilterNodeImpl **************
// ********** Code for _HistoryImpl **************
$dynamic("get$length").History = function() { return this.length; };
// ********** Code for _HtmlElementImpl **************
$dynamic("is$html_Element").IntentionallyInvalid = function(){return true};
// ********** Code for _IDBAnyImpl **************
// ********** Code for _IDBCursorImpl **************
// ********** Code for _IDBCursorWithValueImpl **************
$dynamic("get$value").IDBCursorWithValue = function() { return this.value; };
// ********** Code for _IDBDatabaseImpl **************
$dynamic("get$name").IDBDatabase = function() { return this.name; };
// ********** Code for _IDBDatabaseErrorImpl **************
// ********** Code for _IDBDatabaseExceptionImpl **************
$dynamic("get$name").IDBDatabaseException = function() { return this.name; };
// ********** Code for _IDBFactoryImpl **************
// ********** Code for _IDBIndexImpl **************
$dynamic("get$name").IDBIndex = function() { return this.name; };
// ********** Code for _IDBKeyImpl **************
// ********** Code for _IDBKeyRangeImpl **************
// ********** Code for _IDBObjectStoreImpl **************
$dynamic("get$name").IDBObjectStore = function() { return this.name; };
$dynamic("add$1").IDBObjectStore = function($0) {
  return this.add($0);
};
$dynamic("clear$0").IDBObjectStore = function() {
  return this.clear();
};
// ********** Code for _IDBRequestImpl **************
// ********** Code for _IDBTransactionImpl **************
// ********** Code for _IDBVersionChangeEventImpl **************
// ********** Code for _IDBVersionChangeRequestImpl **************
// ********** Code for _IFrameElementImpl **************
$dynamic("is$html_Element").HTMLIFrameElement = function(){return true};
$dynamic("get$height").HTMLIFrameElement = function() { return this.height; };
$dynamic("get$name").HTMLIFrameElement = function() { return this.name; };
// ********** Code for _ImageDataImpl **************
$dynamic("get$height").ImageData = function() { return this.height; };
// ********** Code for _ImageElementImpl **************
$dynamic("is$html_Element").HTMLImageElement = function(){return true};
$dynamic("get$height").HTMLImageElement = function() { return this.height; };
$dynamic("get$name").HTMLImageElement = function() { return this.name; };
// ********** Code for _InputElementImpl **************
$dynamic("is$html_Element").HTMLInputElement = function(){return true};
$dynamic("get$name").HTMLInputElement = function() { return this.name; };
$dynamic("get$value").HTMLInputElement = function() { return this.value; };
$dynamic("set$value").HTMLInputElement = function(value) { return this.value = value; };
// ********** Code for _Int16ArrayImpl **************
var _Int16ArrayImpl = {};
$dynamic("is$List").Int16Array = function(){return true};
$dynamic("is$Collection").Int16Array = function(){return true};
$dynamic("get$length").Int16Array = function() { return this.length; };
$dynamic("$index").Int16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int16Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int16Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Int16Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("isEmpty").Int16Array = function() {
  return this.length == (0);
}
$dynamic("indexOf").Int16Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Int16Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").Int16Array = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").Int16Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
}
$dynamic("add$1").Int16Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int16Array = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").Int16Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _Int32ArrayImpl **************
var _Int32ArrayImpl = {};
$dynamic("is$List").Int32Array = function(){return true};
$dynamic("is$Collection").Int32Array = function(){return true};
$dynamic("get$length").Int32Array = function() { return this.length; };
$dynamic("$index").Int32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Int32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("isEmpty").Int32Array = function() {
  return this.length == (0);
}
$dynamic("indexOf").Int32Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Int32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").Int32Array = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").Int32Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
}
$dynamic("add$1").Int32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int32Array = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").Int32Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _Int8ArrayImpl **************
var _Int8ArrayImpl = {};
$dynamic("is$List").Int8Array = function(){return true};
$dynamic("is$Collection").Int8Array = function(){return true};
$dynamic("get$length").Int8Array = function() { return this.length; };
$dynamic("$index").Int8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int8Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int8Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Int8Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("isEmpty").Int8Array = function() {
  return this.length == (0);
}
$dynamic("indexOf").Int8Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Int8Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").Int8Array = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").Int8Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
}
$dynamic("add$1").Int8Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int8Array = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").Int8Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _JavaScriptAudioNodeImpl **************
// ********** Code for _JavaScriptCallFrameImpl **************
// ********** Code for _KeyboardEventImpl **************
// ********** Code for _KeygenElementImpl **************
$dynamic("is$html_Element").HTMLKeygenElement = function(){return true};
$dynamic("get$name").HTMLKeygenElement = function() { return this.name; };
// ********** Code for _LIElementImpl **************
$dynamic("is$html_Element").HTMLLIElement = function(){return true};
$dynamic("get$value").HTMLLIElement = function() { return this.value; };
$dynamic("set$value").HTMLLIElement = function(value) { return this.value = value; };
// ********** Code for _LabelElementImpl **************
$dynamic("is$html_Element").HTMLLabelElement = function(){return true};
// ********** Code for _LegendElementImpl **************
$dynamic("is$html_Element").HTMLLegendElement = function(){return true};
// ********** Code for _LinkElementImpl **************
$dynamic("is$html_Element").HTMLLinkElement = function(){return true};
// ********** Code for _MediaStreamImpl **************
// ********** Code for _LocalMediaStreamImpl **************
// ********** Code for _LocationImpl **************
// ********** Code for _LowPass2FilterNodeImpl **************
// ********** Code for _MapElementImpl **************
$dynamic("is$html_Element").HTMLMapElement = function(){return true};
$dynamic("get$name").HTMLMapElement = function() { return this.name; };
// ********** Code for _MarqueeElementImpl **************
$dynamic("is$html_Element").HTMLMarqueeElement = function(){return true};
$dynamic("get$height").HTMLMarqueeElement = function() { return this.height; };
$dynamic("start$0").HTMLMarqueeElement = function() {
  return this.start();
};
// ********** Code for _MediaControllerImpl **************
// ********** Code for _MediaElementAudioSourceNodeImpl **************
// ********** Code for _MediaErrorImpl **************
// ********** Code for _MediaListImpl **************
$dynamic("is$List").MediaList = function(){return true};
$dynamic("is$Collection").MediaList = function(){return true};
$dynamic("get$length").MediaList = function() { return this.length; };
$dynamic("$index").MediaList = function(index) {
  return this[index];
}
$dynamic("$setindex").MediaList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").MediaList = function() {
  return new _FixedSizeListIterator_dart_core_String(this);
}
$dynamic("add").MediaList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").MediaList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").MediaList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").MediaList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("isEmpty").MediaList = function() {
  return this.length == (0);
}
$dynamic("indexOf").MediaList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").MediaList = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").MediaList = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").MediaList = function(start, length) {
  return _Lists.getRange(this, start, length, []);
}
$dynamic("add$1").MediaList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").MediaList = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").MediaList = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _MediaQueryListImpl **************
// ********** Code for _MediaQueryListListenerImpl **************
// ********** Code for _MediaStreamEventImpl **************
// ********** Code for _MediaStreamListImpl **************
$dynamic("get$length").MediaStreamList = function() { return this.length; };
// ********** Code for _MediaStreamTrackImpl **************
// ********** Code for _MediaStreamTrackListImpl **************
$dynamic("get$length").MediaStreamTrackList = function() { return this.length; };
// ********** Code for _MemoryInfoImpl **************
// ********** Code for _MenuElementImpl **************
$dynamic("is$html_Element").HTMLMenuElement = function(){return true};
// ********** Code for _MessageChannelImpl **************
// ********** Code for _MessageEventImpl **************
$dynamic("get$ports").MessageEvent = function() { return this.ports; };
// ********** Code for _MessagePortImpl **************
$dynamic("_addEventListener").MessagePort = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
$dynamic("postMessage$1").MessagePort = function($0) {
  return this.postMessage($0);
};
$dynamic("start$0").MessagePort = function() {
  return this.start();
};
// ********** Code for _MetaElementImpl **************
$dynamic("is$html_Element").HTMLMetaElement = function(){return true};
$dynamic("get$name").HTMLMetaElement = function() { return this.name; };
// ********** Code for _MetadataImpl **************
// ********** Code for _MeterElementImpl **************
$dynamic("is$html_Element").HTMLMeterElement = function(){return true};
$dynamic("get$value").HTMLMeterElement = function() { return this.value; };
$dynamic("set$value").HTMLMeterElement = function(value) { return this.value = value; };
// ********** Code for _ModElementImpl **************
$dynamic("is$html_Element").HTMLModElement = function(){return true};
// ********** Code for _MouseEventImpl **************
// ********** Code for _MutationEventImpl **************
// ********** Code for _NamedNodeMapImpl **************
$dynamic("is$List").NamedNodeMap = function(){return true};
$dynamic("is$Collection").NamedNodeMap = function(){return true};
$dynamic("get$length").NamedNodeMap = function() { return this.length; };
$dynamic("$index").NamedNodeMap = function(index) {
  return this[index];
}
$dynamic("$setindex").NamedNodeMap = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NamedNodeMap = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").NamedNodeMap = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").NamedNodeMap = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").NamedNodeMap = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").NamedNodeMap = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("isEmpty").NamedNodeMap = function() {
  return this.length == (0);
}
$dynamic("indexOf").NamedNodeMap = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").NamedNodeMap = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").NamedNodeMap = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").NamedNodeMap = function(start, length) {
  return _Lists.getRange(this, start, length, []);
}
$dynamic("add$1").NamedNodeMap = function($0) {
  return this.add($0);
};
$dynamic("filter$1").NamedNodeMap = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").NamedNodeMap = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _NavigatorImpl **************
// ********** Code for _NavigatorUserMediaErrorImpl **************
// ********** Code for _NodeFilterImpl **************
// ********** Code for _NodeIteratorImpl **************
// ********** Code for _ListWrapper_Node **************
$inherits(_ListWrapper_Node, _ListWrapper);
function _ListWrapper_Node(_list) {
  this._html_list = _list;
}
_ListWrapper_Node.prototype.is$List = function(){return true};
_ListWrapper_Node.prototype.is$Collection = function(){return true};
_ListWrapper_Node.prototype.add$1 = _ListWrapper_Node.prototype.add;
_ListWrapper_Node.prototype.clear$0 = _ListWrapper_Node.prototype.clear;
_ListWrapper_Node.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ListWrapper_Node.prototype.indexOf$1 = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _NodeListWrapper **************
$inherits(_NodeListWrapper, _ListWrapper_Node);
function _NodeListWrapper(list) {
  _ListWrapper_Node.call(this, list);
}
_NodeListWrapper.prototype.is$List = function(){return true};
_NodeListWrapper.prototype.is$Collection = function(){return true};
_NodeListWrapper.prototype.filter = function(f) {
  return new _NodeListWrapper(this._html_list.filter(f));
}
_NodeListWrapper.prototype.getRange = function(start, length) {
  return new _NodeListWrapper(this._html_list.getRange(start, length));
}
_NodeListWrapper.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
// ********** Code for _NodeListImpl **************
$dynamic("is$List").NodeList = function(){return true};
$dynamic("is$Collection").NodeList = function(){return true};
$dynamic("set$_parent").NodeList = function(value) { return this._parent = value; };
$dynamic("iterator").NodeList = function() {
  return new _FixedSizeListIterator_html_Node(this);
}
$dynamic("add").NodeList = function(value) {
  this._parent._appendChild(value);
}
$dynamic("addAll").NodeList = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var node = $$i.next$0();
    this._parent._appendChild(node);
  }
}
$dynamic("removeLast").NodeList = function() {
  var last = this.last();
  if ($ne$(last)) {
    this._parent._removeChild(last);
  }
  return last;
}
$dynamic("clear").NodeList = function() {
  this._parent.set$text("");
}
$dynamic("$setindex").NodeList = function(index, value) {
  this._parent._replaceChild(value, this.$index(index));
}
$dynamic("forEach").NodeList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").NodeList = function(f) {
  return new _NodeListWrapper(_Collections.filter(this, [], f));
}
$dynamic("isEmpty").NodeList = function() {
  return this.length == (0);
}
$dynamic("indexOf").NodeList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").NodeList = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").NodeList = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").NodeList = function(start, length) {
  return new _NodeListWrapper(_Lists.getRange(this, start, length, []));
}
$dynamic("get$length").NodeList = function() { return this.length; };
$dynamic("$index").NodeList = function(index) {
  return this[index];
}
$dynamic("add$1").NodeList = function($0) {
  return this.add($0);
};
$dynamic("clear$0").NodeList = function() {
  return this.clear();
};
$dynamic("filter$1").NodeList = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").NodeList = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _NodeSelectorImpl **************
// ********** Code for _NotationImpl **************
// ********** Code for _NotificationImpl **************
// ********** Code for _NotificationCenterImpl **************
// ********** Code for _OESStandardDerivativesImpl **************
// ********** Code for _OESTextureFloatImpl **************
// ********** Code for _OESVertexArrayObjectImpl **************
// ********** Code for _OListElementImpl **************
$dynamic("is$html_Element").HTMLOListElement = function(){return true};
// ********** Code for _ObjectElementImpl **************
$dynamic("is$html_Element").HTMLObjectElement = function(){return true};
$dynamic("get$height").HTMLObjectElement = function() { return this.height; };
$dynamic("get$name").HTMLObjectElement = function() { return this.name; };
// ********** Code for _OfflineAudioCompletionEventImpl **************
// ********** Code for _OperationNotAllowedExceptionImpl **************
$dynamic("get$name").OperationNotAllowedException = function() { return this.name; };
// ********** Code for _OptGroupElementImpl **************
$dynamic("is$html_Element").HTMLOptGroupElement = function(){return true};
// ********** Code for _OptionElementImpl **************
$dynamic("is$html_Element").HTMLOptionElement = function(){return true};
$dynamic("get$value").HTMLOptionElement = function() { return this.value; };
$dynamic("set$value").HTMLOptionElement = function(value) { return this.value = value; };
// ********** Code for _OutputElementImpl **************
$dynamic("is$html_Element").HTMLOutputElement = function(){return true};
$dynamic("get$name").HTMLOutputElement = function() { return this.name; };
$dynamic("get$value").HTMLOutputElement = function() { return this.value; };
$dynamic("set$value").HTMLOutputElement = function(value) { return this.value = value; };
// ********** Code for _OverflowEventImpl **************
// ********** Code for _PageTransitionEventImpl **************
// ********** Code for _ParagraphElementImpl **************
$dynamic("is$html_Element").HTMLParagraphElement = function(){return true};
// ********** Code for _ParamElementImpl **************
$dynamic("is$html_Element").HTMLParamElement = function(){return true};
$dynamic("get$name").HTMLParamElement = function() { return this.name; };
$dynamic("get$value").HTMLParamElement = function() { return this.value; };
$dynamic("set$value").HTMLParamElement = function(value) { return this.value = value; };
// ********** Code for _PerformanceImpl **************
// ********** Code for _PerformanceNavigationImpl **************
// ********** Code for _PerformanceTimingImpl **************
// ********** Code for _PointImpl **************
// ********** Code for _PopStateEventImpl **************
// ********** Code for _PositionErrorImpl **************
// ********** Code for _PreElementImpl **************
$dynamic("is$html_Element").HTMLPreElement = function(){return true};
// ********** Code for _ProcessingInstructionImpl **************
// ********** Code for _ProgressElementImpl **************
$dynamic("is$html_Element").HTMLProgressElement = function(){return true};
$dynamic("get$value").HTMLProgressElement = function() { return this.value; };
$dynamic("set$value").HTMLProgressElement = function(value) { return this.value = value; };
// ********** Code for _ProgressEventImpl **************
// ********** Code for _QuoteElementImpl **************
$dynamic("is$html_Element").HTMLQuoteElement = function(){return true};
// ********** Code for _RGBColorImpl **************
// ********** Code for _RangeImpl **************
// ********** Code for _RangeExceptionImpl **************
$dynamic("get$name").RangeException = function() { return this.name; };
// ********** Code for _RealtimeAnalyserNodeImpl **************
// ********** Code for _RectImpl **************
$dynamic("get$top").Rect = function() { return this.top; };
// ********** Code for _SQLErrorImpl **************
// ********** Code for _SQLExceptionImpl **************
// ********** Code for _SQLResultSetImpl **************
// ********** Code for _SQLResultSetRowListImpl **************
$dynamic("get$length").SQLResultSetRowList = function() { return this.length; };
// ********** Code for _SQLTransactionImpl **************
// ********** Code for _SQLTransactionSyncImpl **************
// ********** Code for _SVGElementImpl **************
$dynamic("is$html_Element").SVGElement = function(){return true};
$dynamic("get$classes").SVGElement = function() {
  if (null == this._cssClassSet) {
    this._cssClassSet = new _AttributeClassSet(this.get$_ptr());
  }
  return this._cssClassSet;
}
$dynamic("get$elements").SVGElement = function() {
  return new FilteredElementList(this);
}
$dynamic("set$elements").SVGElement = function(value) {
  var elements = this.get$elements();
  elements.clear$0();
  elements.addAll(value);
}
$dynamic("set$innerHTML").SVGElement = function(svg) {
  var container = _ElementFactoryProvider.Element$tag$factory("div");
  container.set$innerHTML(("<svg version=\"1.1\">" + svg + "</svg>"));
  this.set$elements(container.get$elements().get$first().get$elements());
}
$dynamic("get$id").SVGElement = function() {
  return this.id;
}
$dynamic("set$id").SVGElement = function(value) {
  this.id = value;
}
// ********** Code for _SVGAElementImpl **************
$dynamic("is$html_Element").SVGAElement = function(){return true};
// ********** Code for _SVGAltGlyphDefElementImpl **************
$dynamic("is$html_Element").SVGAltGlyphDefElement = function(){return true};
// ********** Code for _SVGTextContentElementImpl **************
$dynamic("is$html_Element").SVGTextContentElement = function(){return true};
// ********** Code for _SVGTextPositioningElementImpl **************
$dynamic("is$html_Element").SVGTextPositioningElement = function(){return true};
// ********** Code for _SVGAltGlyphElementImpl **************
$dynamic("is$html_Element").SVGAltGlyphElement = function(){return true};
// ********** Code for _SVGAltGlyphItemElementImpl **************
$dynamic("is$html_Element").SVGAltGlyphItemElement = function(){return true};
// ********** Code for _SVGAngleImpl **************
$dynamic("get$value").SVGAngle = function() { return this.value; };
$dynamic("set$value").SVGAngle = function(value) { return this.value = value; };
// ********** Code for _SVGAnimationElementImpl **************
$dynamic("is$html_Element").SVGAnimationElement = function(){return true};
// ********** Code for _SVGAnimateColorElementImpl **************
$dynamic("is$html_Element").SVGAnimateColorElement = function(){return true};
// ********** Code for _SVGAnimateElementImpl **************
$dynamic("is$html_Element").SVGAnimateElement = function(){return true};
// ********** Code for _SVGAnimateMotionElementImpl **************
$dynamic("is$html_Element").SVGAnimateMotionElement = function(){return true};
// ********** Code for _SVGAnimateTransformElementImpl **************
$dynamic("is$html_Element").SVGAnimateTransformElement = function(){return true};
// ********** Code for _SVGAnimatedAngleImpl **************
// ********** Code for _SVGAnimatedBooleanImpl **************
// ********** Code for _SVGAnimatedEnumerationImpl **************
// ********** Code for _SVGAnimatedIntegerImpl **************
// ********** Code for _SVGAnimatedLengthImpl **************
// ********** Code for _SVGAnimatedLengthListImpl **************
// ********** Code for _SVGAnimatedNumberImpl **************
// ********** Code for _SVGAnimatedNumberListImpl **************
// ********** Code for _SVGAnimatedPreserveAspectRatioImpl **************
// ********** Code for _SVGAnimatedRectImpl **************
// ********** Code for _SVGAnimatedStringImpl **************
// ********** Code for _SVGAnimatedTransformListImpl **************
// ********** Code for _SVGCircleElementImpl **************
$dynamic("is$html_Element").SVGCircleElement = function(){return true};
// ********** Code for _SVGClipPathElementImpl **************
$dynamic("is$html_Element").SVGClipPathElement = function(){return true};
// ********** Code for _SVGColorImpl **************
// ********** Code for _SVGComponentTransferFunctionElementImpl **************
$dynamic("is$html_Element").SVGComponentTransferFunctionElement = function(){return true};
// ********** Code for _SVGCursorElementImpl **************
$dynamic("is$html_Element").SVGCursorElement = function(){return true};
// ********** Code for _SVGDefsElementImpl **************
$dynamic("is$html_Element").SVGDefsElement = function(){return true};
// ********** Code for _SVGDescElementImpl **************
$dynamic("is$html_Element").SVGDescElement = function(){return true};
// ********** Code for _SVGDocumentImpl **************
$dynamic("is$html_Element").SVGDocument = function(){return true};
// ********** Code for _CssClassSet **************
function _CssClassSet(_element) {
  this._html_element = _element;
}
_CssClassSet.prototype.is$Collection = function(){return true};
_CssClassSet.prototype.toString = function() {
  return this._formatSet(this._read());
}
_CssClassSet.prototype.iterator = function() {
  return this._read().iterator();
}
_CssClassSet.prototype.forEach = function(f) {
  this._read().forEach(f);
}
_CssClassSet.prototype.filter = function(f) {
  return this._read().filter(f);
}
_CssClassSet.prototype.isEmpty = function() {
  return this._read().isEmpty();
}
_CssClassSet.prototype.get$length = function() {
  return this._read().get$length();
}
_CssClassSet.prototype.contains = function(value) {
  return this._read().contains(value);
}
_CssClassSet.prototype.add = function(value) {
  this._modify((function (s) {
    return s.add$1(value);
  })
  );
}
_CssClassSet.prototype.addAll = function(collection) {
  this._modify((function (s) {
    return s.addAll(collection);
  })
  );
}
_CssClassSet.prototype.clear = function() {
  this._modify((function (s) {
    return s.clear$0();
  })
  );
}
_CssClassSet.prototype._modify = function(f) {
  var s = this._read();
  f(s);
  this._write(s);
}
_CssClassSet.prototype._read = function() {
  var s = new HashSetImplementation_dart_core_String();
  var $$list = this._className().split_(" ");
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var name = $$i.next$0();
    var trimmed = name.trim();
    if (!trimmed.isEmpty()) {
      s.add(trimmed);
    }
  }
  return s;
}
_CssClassSet.prototype._className = function() {
  return this._html_element.get$_className();
}
_CssClassSet.prototype._write = function(s) {
  this._html_element.set$_className(this._formatSet(s));
}
_CssClassSet.prototype._formatSet = function(s) {
  var list = ListFactory.ListFactory$from$factory(s);
  return Strings.join(list, " ");
}
_CssClassSet.prototype.add$1 = _CssClassSet.prototype.add;
_CssClassSet.prototype.clear$0 = _CssClassSet.prototype.clear;
_CssClassSet.prototype.contains$1 = _CssClassSet.prototype.contains;
_CssClassSet.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
// ********** Code for _AttributeClassSet **************
$inherits(_AttributeClassSet, _CssClassSet);
function _AttributeClassSet(element) {
  _CssClassSet.call(this, element);
}
_AttributeClassSet.prototype._className = function() {
  return this._html_element.get$attributes().$index("class");
}
_AttributeClassSet.prototype._write = function(s) {
  this._html_element.get$attributes().$setindex("class", this._formatSet(s));
}
// ********** Code for _SVGElementInstanceImpl **************
$dynamic("_addEventListener").SVGElementInstance = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _SVGElementInstanceListImpl **************
$dynamic("get$length").SVGElementInstanceList = function() { return this.length; };
// ********** Code for _SVGEllipseElementImpl **************
$dynamic("is$html_Element").SVGEllipseElement = function(){return true};
// ********** Code for _SVGExceptionImpl **************
$dynamic("get$name").SVGException = function() { return this.name; };
// ********** Code for _SVGExternalResourcesRequiredImpl **************
// ********** Code for _SVGFEBlendElementImpl **************
$dynamic("is$html_Element").SVGFEBlendElement = function(){return true};
$dynamic("get$height").SVGFEBlendElement = function() { return this.height; };
// ********** Code for _SVGFEColorMatrixElementImpl **************
$dynamic("is$html_Element").SVGFEColorMatrixElement = function(){return true};
$dynamic("get$height").SVGFEColorMatrixElement = function() { return this.height; };
// ********** Code for _SVGFEComponentTransferElementImpl **************
$dynamic("is$html_Element").SVGFEComponentTransferElement = function(){return true};
$dynamic("get$height").SVGFEComponentTransferElement = function() { return this.height; };
// ********** Code for _SVGFECompositeElementImpl **************
$dynamic("is$html_Element").SVGFECompositeElement = function(){return true};
$dynamic("get$height").SVGFECompositeElement = function() { return this.height; };
// ********** Code for _SVGFEConvolveMatrixElementImpl **************
$dynamic("is$html_Element").SVGFEConvolveMatrixElement = function(){return true};
$dynamic("get$height").SVGFEConvolveMatrixElement = function() { return this.height; };
// ********** Code for _SVGFEDiffuseLightingElementImpl **************
$dynamic("is$html_Element").SVGFEDiffuseLightingElement = function(){return true};
$dynamic("get$height").SVGFEDiffuseLightingElement = function() { return this.height; };
// ********** Code for _SVGFEDisplacementMapElementImpl **************
$dynamic("is$html_Element").SVGFEDisplacementMapElement = function(){return true};
$dynamic("get$height").SVGFEDisplacementMapElement = function() { return this.height; };
// ********** Code for _SVGFEDistantLightElementImpl **************
$dynamic("is$html_Element").SVGFEDistantLightElement = function(){return true};
// ********** Code for _SVGFEDropShadowElementImpl **************
$dynamic("is$html_Element").SVGFEDropShadowElement = function(){return true};
$dynamic("get$height").SVGFEDropShadowElement = function() { return this.height; };
// ********** Code for _SVGFEFloodElementImpl **************
$dynamic("is$html_Element").SVGFEFloodElement = function(){return true};
$dynamic("get$height").SVGFEFloodElement = function() { return this.height; };
// ********** Code for _SVGFEFuncAElementImpl **************
$dynamic("is$html_Element").SVGFEFuncAElement = function(){return true};
// ********** Code for _SVGFEFuncBElementImpl **************
$dynamic("is$html_Element").SVGFEFuncBElement = function(){return true};
// ********** Code for _SVGFEFuncGElementImpl **************
$dynamic("is$html_Element").SVGFEFuncGElement = function(){return true};
// ********** Code for _SVGFEFuncRElementImpl **************
$dynamic("is$html_Element").SVGFEFuncRElement = function(){return true};
// ********** Code for _SVGFEGaussianBlurElementImpl **************
$dynamic("is$html_Element").SVGFEGaussianBlurElement = function(){return true};
$dynamic("get$height").SVGFEGaussianBlurElement = function() { return this.height; };
// ********** Code for _SVGFEImageElementImpl **************
$dynamic("is$html_Element").SVGFEImageElement = function(){return true};
$dynamic("get$height").SVGFEImageElement = function() { return this.height; };
// ********** Code for _SVGFEMergeElementImpl **************
$dynamic("is$html_Element").SVGFEMergeElement = function(){return true};
$dynamic("get$height").SVGFEMergeElement = function() { return this.height; };
// ********** Code for _SVGFEMergeNodeElementImpl **************
$dynamic("is$html_Element").SVGFEMergeNodeElement = function(){return true};
// ********** Code for _SVGFEMorphologyElementImpl **************
$dynamic("is$html_Element").SVGFEMorphologyElement = function(){return true};
$dynamic("get$height").SVGFEMorphologyElement = function() { return this.height; };
// ********** Code for _SVGFEOffsetElementImpl **************
$dynamic("is$html_Element").SVGFEOffsetElement = function(){return true};
$dynamic("get$height").SVGFEOffsetElement = function() { return this.height; };
// ********** Code for _SVGFEPointLightElementImpl **************
$dynamic("is$html_Element").SVGFEPointLightElement = function(){return true};
// ********** Code for _SVGFESpecularLightingElementImpl **************
$dynamic("is$html_Element").SVGFESpecularLightingElement = function(){return true};
$dynamic("get$height").SVGFESpecularLightingElement = function() { return this.height; };
// ********** Code for _SVGFESpotLightElementImpl **************
$dynamic("is$html_Element").SVGFESpotLightElement = function(){return true};
// ********** Code for _SVGFETileElementImpl **************
$dynamic("is$html_Element").SVGFETileElement = function(){return true};
$dynamic("get$height").SVGFETileElement = function() { return this.height; };
// ********** Code for _SVGFETurbulenceElementImpl **************
$dynamic("is$html_Element").SVGFETurbulenceElement = function(){return true};
$dynamic("get$height").SVGFETurbulenceElement = function() { return this.height; };
// ********** Code for _SVGFilterElementImpl **************
$dynamic("is$html_Element").SVGFilterElement = function(){return true};
$dynamic("get$height").SVGFilterElement = function() { return this.height; };
// ********** Code for _SVGStylableImpl **************
$dynamic("get$style").SVGStylable = function() { return this.style; };
// ********** Code for _SVGFilterPrimitiveStandardAttributesImpl **************
$dynamic("get$height").SVGFilterPrimitiveStandardAttributes = function() { return this.height; };
// ********** Code for _SVGFitToViewBoxImpl **************
// ********** Code for _SVGFontElementImpl **************
$dynamic("is$html_Element").SVGFontElement = function(){return true};
// ********** Code for _SVGFontFaceElementImpl **************
$dynamic("is$html_Element").SVGFontFaceElement = function(){return true};
// ********** Code for _SVGFontFaceFormatElementImpl **************
$dynamic("is$html_Element").SVGFontFaceFormatElement = function(){return true};
// ********** Code for _SVGFontFaceNameElementImpl **************
$dynamic("is$html_Element").SVGFontFaceNameElement = function(){return true};
// ********** Code for _SVGFontFaceSrcElementImpl **************
$dynamic("is$html_Element").SVGFontFaceSrcElement = function(){return true};
// ********** Code for _SVGFontFaceUriElementImpl **************
$dynamic("is$html_Element").SVGFontFaceUriElement = function(){return true};
// ********** Code for _SVGForeignObjectElementImpl **************
$dynamic("is$html_Element").SVGForeignObjectElement = function(){return true};
$dynamic("get$height").SVGForeignObjectElement = function() { return this.height; };
// ********** Code for _SVGGElementImpl **************
$dynamic("is$html_Element").SVGGElement = function(){return true};
// ********** Code for _SVGGlyphElementImpl **************
$dynamic("is$html_Element").SVGGlyphElement = function(){return true};
// ********** Code for _SVGGlyphRefElementImpl **************
$dynamic("is$html_Element").SVGGlyphRefElement = function(){return true};
// ********** Code for _SVGGradientElementImpl **************
$dynamic("is$html_Element").SVGGradientElement = function(){return true};
// ********** Code for _SVGHKernElementImpl **************
$dynamic("is$html_Element").SVGHKernElement = function(){return true};
// ********** Code for _SVGImageElementImpl **************
$dynamic("is$html_Element").SVGImageElement = function(){return true};
$dynamic("get$height").SVGImageElement = function() { return this.height; };
// ********** Code for _SVGLangSpaceImpl **************
// ********** Code for _SVGLengthImpl **************
$dynamic("get$value").SVGLength = function() { return this.value; };
$dynamic("set$value").SVGLength = function(value) { return this.value = value; };
// ********** Code for _SVGLengthListImpl **************
$dynamic("clear$0").SVGLengthList = function() {
  return this.clear();
};
// ********** Code for _SVGLineElementImpl **************
$dynamic("is$html_Element").SVGLineElement = function(){return true};
// ********** Code for _SVGLinearGradientElementImpl **************
$dynamic("is$html_Element").SVGLinearGradientElement = function(){return true};
// ********** Code for _SVGLocatableImpl **************
// ********** Code for _SVGMPathElementImpl **************
$dynamic("is$html_Element").SVGMPathElement = function(){return true};
// ********** Code for _SVGMarkerElementImpl **************
$dynamic("is$html_Element").SVGMarkerElement = function(){return true};
// ********** Code for _SVGMaskElementImpl **************
$dynamic("is$html_Element").SVGMaskElement = function(){return true};
$dynamic("get$height").SVGMaskElement = function() { return this.height; };
// ********** Code for _SVGMatrixImpl **************
// ********** Code for _SVGMetadataElementImpl **************
$dynamic("is$html_Element").SVGMetadataElement = function(){return true};
// ********** Code for _SVGMissingGlyphElementImpl **************
$dynamic("is$html_Element").SVGMissingGlyphElement = function(){return true};
// ********** Code for _SVGNumberImpl **************
$dynamic("get$value").SVGNumber = function() { return this.value; };
$dynamic("set$value").SVGNumber = function(value) { return this.value = value; };
// ********** Code for _SVGNumberListImpl **************
$dynamic("clear$0").SVGNumberList = function() {
  return this.clear();
};
// ********** Code for _SVGPaintImpl **************
// ********** Code for _SVGPathElementImpl **************
$dynamic("is$html_Element").SVGPathElement = function(){return true};
// ********** Code for _SVGPathSegImpl **************
// ********** Code for _SVGPathSegArcAbsImpl **************
// ********** Code for _SVGPathSegArcRelImpl **************
// ********** Code for _SVGPathSegClosePathImpl **************
// ********** Code for _SVGPathSegCurvetoCubicAbsImpl **************
// ********** Code for _SVGPathSegCurvetoCubicRelImpl **************
// ********** Code for _SVGPathSegCurvetoCubicSmoothAbsImpl **************
// ********** Code for _SVGPathSegCurvetoCubicSmoothRelImpl **************
// ********** Code for _SVGPathSegCurvetoQuadraticAbsImpl **************
// ********** Code for _SVGPathSegCurvetoQuadraticRelImpl **************
// ********** Code for _SVGPathSegCurvetoQuadraticSmoothAbsImpl **************
// ********** Code for _SVGPathSegCurvetoQuadraticSmoothRelImpl **************
// ********** Code for _SVGPathSegLinetoAbsImpl **************
// ********** Code for _SVGPathSegLinetoHorizontalAbsImpl **************
// ********** Code for _SVGPathSegLinetoHorizontalRelImpl **************
// ********** Code for _SVGPathSegLinetoRelImpl **************
// ********** Code for _SVGPathSegLinetoVerticalAbsImpl **************
// ********** Code for _SVGPathSegLinetoVerticalRelImpl **************
// ********** Code for _SVGPathSegListImpl **************
$dynamic("clear$0").SVGPathSegList = function() {
  return this.clear();
};
// ********** Code for _SVGPathSegMovetoAbsImpl **************
// ********** Code for _SVGPathSegMovetoRelImpl **************
// ********** Code for _SVGPatternElementImpl **************
$dynamic("is$html_Element").SVGPatternElement = function(){return true};
$dynamic("get$height").SVGPatternElement = function() { return this.height; };
// ********** Code for _SVGPointImpl **************
// ********** Code for _SVGPointListImpl **************
$dynamic("clear$0").SVGPointList = function() {
  return this.clear();
};
// ********** Code for _SVGPolygonElementImpl **************
$dynamic("is$html_Element").SVGPolygonElement = function(){return true};
// ********** Code for _SVGPolylineElementImpl **************
$dynamic("is$html_Element").SVGPolylineElement = function(){return true};
// ********** Code for _SVGPreserveAspectRatioImpl **************
// ********** Code for _SVGRadialGradientElementImpl **************
$dynamic("is$html_Element").SVGRadialGradientElement = function(){return true};
// ********** Code for _SVGRectImpl **************
$dynamic("get$height").SVGRect = function() { return this.height; };
// ********** Code for _SVGRectElementImpl **************
$dynamic("is$html_Element").SVGRectElement = function(){return true};
$dynamic("get$height").SVGRectElement = function() { return this.height; };
// ********** Code for _SVGRenderingIntentImpl **************
// ********** Code for _SVGSVGElementImpl **************
$dynamic("is$html_Element").SVGSVGElement = function(){return true};
$dynamic("get$height").SVGSVGElement = function() { return this.height; };
// ********** Code for _SVGScriptElementImpl **************
$dynamic("is$html_Element").SVGScriptElement = function(){return true};
// ********** Code for _SVGSetElementImpl **************
$dynamic("is$html_Element").SVGSetElement = function(){return true};
// ********** Code for _SVGStopElementImpl **************
$dynamic("is$html_Element").SVGStopElement = function(){return true};
// ********** Code for _SVGStringListImpl **************
$dynamic("clear$0").SVGStringList = function() {
  return this.clear();
};
// ********** Code for _SVGStyleElementImpl **************
$dynamic("is$html_Element").SVGStyleElement = function(){return true};
// ********** Code for _SVGSwitchElementImpl **************
$dynamic("is$html_Element").SVGSwitchElement = function(){return true};
// ********** Code for _SVGSymbolElementImpl **************
$dynamic("is$html_Element").SVGSymbolElement = function(){return true};
// ********** Code for _SVGTRefElementImpl **************
$dynamic("is$html_Element").SVGTRefElement = function(){return true};
// ********** Code for _SVGTSpanElementImpl **************
$dynamic("is$html_Element").SVGTSpanElement = function(){return true};
// ********** Code for _SVGTestsImpl **************
// ********** Code for _SVGTextElementImpl **************
$dynamic("is$html_Element").SVGTextElement = function(){return true};
// ********** Code for _SVGTextPathElementImpl **************
$dynamic("is$html_Element").SVGTextPathElement = function(){return true};
// ********** Code for _SVGTitleElementImpl **************
$dynamic("is$html_Element").SVGTitleElement = function(){return true};
// ********** Code for _SVGTransformImpl **************
// ********** Code for _SVGTransformListImpl **************
$dynamic("clear$0").SVGTransformList = function() {
  return this.clear();
};
// ********** Code for _SVGTransformableImpl **************
// ********** Code for _SVGURIReferenceImpl **************
// ********** Code for _SVGUnitTypesImpl **************
// ********** Code for _SVGUseElementImpl **************
$dynamic("is$html_Element").SVGUseElement = function(){return true};
$dynamic("get$height").SVGUseElement = function() { return this.height; };
// ********** Code for _SVGVKernElementImpl **************
$dynamic("is$html_Element").SVGVKernElement = function(){return true};
// ********** Code for _SVGViewElementImpl **************
$dynamic("is$html_Element").SVGViewElement = function(){return true};
// ********** Code for _SVGZoomAndPanImpl **************
// ********** Code for _SVGViewSpecImpl **************
// ********** Code for _SVGZoomEventImpl **************
// ********** Code for _ScreenImpl **************
$dynamic("get$height").Screen = function() { return this.height; };
// ********** Code for _ScriptElementImpl **************
$dynamic("is$html_Element").HTMLScriptElement = function(){return true};
// ********** Code for _ScriptProfileImpl **************
// ********** Code for _ScriptProfileNodeImpl **************
// ********** Code for _SelectElementImpl **************
$dynamic("is$html_Element").HTMLSelectElement = function(){return true};
$dynamic("get$length").HTMLSelectElement = function() { return this.length; };
$dynamic("get$name").HTMLSelectElement = function() { return this.name; };
$dynamic("get$value").HTMLSelectElement = function() { return this.value; };
$dynamic("set$value").HTMLSelectElement = function(value) { return this.value = value; };
// ********** Code for _ShadowElementImpl **************
$dynamic("is$html_Element").HTMLShadowElement = function(){return true};
// ********** Code for _ShadowRootImpl **************
$dynamic("is$html_Element").ShadowRoot = function(){return true};
$dynamic("set$innerHTML").ShadowRoot = function(value) { return this.innerHTML = value; };
// ********** Code for _SharedWorkerImpl **************
// ********** Code for _SharedWorkerContextImpl **************
$dynamic("get$name").SharedWorkerContext = function() { return this.name; };
// ********** Code for _SourceElementImpl **************
$dynamic("is$html_Element").HTMLSourceElement = function(){return true};
// ********** Code for _SpanElementImpl **************
$dynamic("is$html_Element").HTMLSpanElement = function(){return true};
// ********** Code for _SpeechGrammarImpl **************
// ********** Code for _SpeechGrammarListImpl **************
$dynamic("get$length").SpeechGrammarList = function() { return this.length; };
// ********** Code for _SpeechInputEventImpl **************
// ********** Code for _SpeechInputResultImpl **************
// ********** Code for _SpeechInputResultListImpl **************
$dynamic("get$length").SpeechInputResultList = function() { return this.length; };
// ********** Code for _SpeechRecognitionAlternativeImpl **************
// ********** Code for _SpeechRecognitionErrorImpl **************
// ********** Code for _SpeechRecognitionEventImpl **************
// ********** Code for _SpeechRecognitionResultImpl **************
$dynamic("get$length").SpeechRecognitionResult = function() { return this.length; };
// ********** Code for _SpeechRecognitionResultListImpl **************
$dynamic("get$length").SpeechRecognitionResultList = function() { return this.length; };
// ********** Code for _StorageImpl **************
$dynamic("get$length").Storage = function() { return this.length; };
$dynamic("clear$0").Storage = function() {
  return this.clear();
};
// ********** Code for _StorageEventImpl **************
// ********** Code for _StorageInfoImpl **************
// ********** Code for _StyleElementImpl **************
$dynamic("is$html_Element").HTMLStyleElement = function(){return true};
// ********** Code for _StyleMediaImpl **************
// ********** Code for _StyleSheetListImpl **************
$dynamic("is$List").StyleSheetList = function(){return true};
$dynamic("is$Collection").StyleSheetList = function(){return true};
$dynamic("get$length").StyleSheetList = function() { return this.length; };
$dynamic("$index").StyleSheetList = function(index) {
  return this[index];
}
$dynamic("$setindex").StyleSheetList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").StyleSheetList = function() {
  return new _FixedSizeListIterator_html_StyleSheet(this);
}
$dynamic("add").StyleSheetList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").StyleSheetList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").StyleSheetList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").StyleSheetList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("isEmpty").StyleSheetList = function() {
  return this.length == (0);
}
$dynamic("indexOf").StyleSheetList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").StyleSheetList = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").StyleSheetList = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").StyleSheetList = function(start, length) {
  return _Lists.getRange(this, start, length, []);
}
$dynamic("add$1").StyleSheetList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").StyleSheetList = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").StyleSheetList = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _TableCaptionElementImpl **************
$dynamic("is$html_Element").HTMLTableCaptionElement = function(){return true};
// ********** Code for _TableCellElementImpl **************
$dynamic("is$html_Element").HTMLTableCellElement = function(){return true};
$dynamic("get$height").HTMLTableCellElement = function() { return this.height; };
// ********** Code for _TableColElementImpl **************
$dynamic("is$html_Element").HTMLTableColElement = function(){return true};
// ********** Code for _TableElementImpl **************
$dynamic("is$html_Element").HTMLTableElement = function(){return true};
// ********** Code for _TableRowElementImpl **************
$dynamic("is$html_Element").HTMLTableRowElement = function(){return true};
// ********** Code for _TableSectionElementImpl **************
$dynamic("is$html_Element").HTMLTableSectionElement = function(){return true};
// ********** Code for _TextAreaElementImpl **************
$dynamic("is$html_Element").HTMLTextAreaElement = function(){return true};
$dynamic("get$name").HTMLTextAreaElement = function() { return this.name; };
$dynamic("get$value").HTMLTextAreaElement = function() { return this.value; };
$dynamic("set$value").HTMLTextAreaElement = function(value) { return this.value = value; };
// ********** Code for _TextEventImpl **************
// ********** Code for _TextMetricsImpl **************
// ********** Code for _TextTrackImpl **************
// ********** Code for _TextTrackCueImpl **************
$dynamic("get$id").TextTrackCue = function() { return this.id; };
$dynamic("set$id").TextTrackCue = function(value) { return this.id = value; };
$dynamic("get$text").TextTrackCue = function() { return this.text; };
$dynamic("set$text").TextTrackCue = function(value) { return this.text = value; };
// ********** Code for _TextTrackCueListImpl **************
$dynamic("get$length").TextTrackCueList = function() { return this.length; };
// ********** Code for _TextTrackListImpl **************
$dynamic("get$length").TextTrackList = function() { return this.length; };
// ********** Code for _TimeRangesImpl **************
$dynamic("get$length").TimeRanges = function() { return this.length; };
// ********** Code for _TitleElementImpl **************
$dynamic("is$html_Element").HTMLTitleElement = function(){return true};
// ********** Code for _TouchImpl **************
// ********** Code for _TouchEventImpl **************
// ********** Code for _TouchListImpl **************
$dynamic("is$List").TouchList = function(){return true};
$dynamic("is$Collection").TouchList = function(){return true};
$dynamic("get$length").TouchList = function() { return this.length; };
$dynamic("$index").TouchList = function(index) {
  return this[index];
}
$dynamic("$setindex").TouchList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").TouchList = function() {
  return new _FixedSizeListIterator_html_Touch(this);
}
$dynamic("add").TouchList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").TouchList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").TouchList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").TouchList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("isEmpty").TouchList = function() {
  return this.length == (0);
}
$dynamic("indexOf").TouchList = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").TouchList = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").TouchList = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").TouchList = function(start, length) {
  return _Lists.getRange(this, start, length, []);
}
$dynamic("add$1").TouchList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").TouchList = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").TouchList = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _TrackElementImpl **************
$dynamic("is$html_Element").HTMLTrackElement = function(){return true};
// ********** Code for _TrackEventImpl **************
// ********** Code for _TransitionEventImpl **************
// ********** Code for _TreeWalkerImpl **************
// ********** Code for _UListElementImpl **************
$dynamic("is$html_Element").HTMLUListElement = function(){return true};
// ********** Code for _Uint16ArrayImpl **************
var _Uint16ArrayImpl = {};
$dynamic("is$List").Uint16Array = function(){return true};
$dynamic("is$Collection").Uint16Array = function(){return true};
$dynamic("get$length").Uint16Array = function() { return this.length; };
$dynamic("$index").Uint16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint16Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint16Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Uint16Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("isEmpty").Uint16Array = function() {
  return this.length == (0);
}
$dynamic("indexOf").Uint16Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Uint16Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").Uint16Array = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").Uint16Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
}
$dynamic("add$1").Uint16Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint16Array = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").Uint16Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _Uint32ArrayImpl **************
var _Uint32ArrayImpl = {};
$dynamic("is$List").Uint32Array = function(){return true};
$dynamic("is$Collection").Uint32Array = function(){return true};
$dynamic("get$length").Uint32Array = function() { return this.length; };
$dynamic("$index").Uint32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Uint32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("isEmpty").Uint32Array = function() {
  return this.length == (0);
}
$dynamic("indexOf").Uint32Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Uint32Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").Uint32Array = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").Uint32Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
}
$dynamic("add$1").Uint32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint32Array = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").Uint32Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _Uint8ArrayImpl **************
var _Uint8ArrayImpl = {};
$dynamic("is$List").Uint8Array = function(){return true};
$dynamic("is$Collection").Uint8Array = function(){return true};
$dynamic("get$length").Uint8Array = function() { return this.length; };
$dynamic("$index").Uint8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint8Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint8Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Uint8Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("isEmpty").Uint8Array = function() {
  return this.length == (0);
}
$dynamic("indexOf").Uint8Array = function(element, start) {
  return _Lists.indexOf(this, element, start, this.length);
}
$dynamic("last").Uint8Array = function() {
  return this.$index(this.length - (1));
}
$dynamic("removeRange").Uint8Array = function(start, length) {
  $throw(new UnsupportedOperationException("Cannot removeRange on immutable List."));
}
$dynamic("getRange").Uint8Array = function(start, length) {
  return _Lists.getRange(this, start, length, []);
}
$dynamic("add$1").Uint8Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint8Array = function($0) {
  return this.filter(to$call$1($0));
};
$dynamic("indexOf$1").Uint8Array = function($0) {
  return this.indexOf($0, (0));
};
// ********** Code for _Uint8ClampedArrayImpl **************
var _Uint8ClampedArrayImpl = {};
$dynamic("is$List").Uint8ClampedArray = function(){return true};
$dynamic("is$Collection").Uint8ClampedArray = function(){return true};
// ********** Code for _UnknownElementImpl **************
$dynamic("is$html_Element").HTMLUnknownElement = function(){return true};
// ********** Code for _ValidityStateImpl **************
// ********** Code for _VideoElementImpl **************
$dynamic("is$html_Element").HTMLVideoElement = function(){return true};
$dynamic("get$height").HTMLVideoElement = function() { return this.height; };
// ********** Code for _WaveShaperNodeImpl **************
// ********** Code for _WebGLActiveInfoImpl **************
$dynamic("get$name").WebGLActiveInfo = function() { return this.name; };
// ********** Code for _WebGLBufferImpl **************
// ********** Code for _WebGLCompressedTextureS3TCImpl **************
// ********** Code for _WebGLContextAttributesImpl **************
// ********** Code for _WebGLContextEventImpl **************
// ********** Code for _WebGLDebugRendererInfoImpl **************
// ********** Code for _WebGLDebugShadersImpl **************
// ********** Code for _WebGLFramebufferImpl **************
// ********** Code for _WebGLLoseContextImpl **************
// ********** Code for _WebGLProgramImpl **************
// ********** Code for _WebGLRenderbufferImpl **************
// ********** Code for _WebGLRenderingContextImpl **************
// ********** Code for _WebGLShaderImpl **************
// ********** Code for _WebGLTextureImpl **************
// ********** Code for _WebGLUniformLocationImpl **************
// ********** Code for _WebGLVertexArrayObjectOESImpl **************
// ********** Code for _WebKitCSSRegionRuleImpl **************
// ********** Code for _WebKitNamedFlowImpl **************
// ********** Code for _WebSocketImpl **************
$dynamic("_addEventListener").WebSocket = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _WheelEventImpl **************
// ********** Code for _WindowImpl **************
$dynamic("get$on").DOMWindow = function() {
  return new _WindowEventsImpl(this);
}
$dynamic("get$length").DOMWindow = function() { return this.length; };
$dynamic("get$name").DOMWindow = function() { return this.name; };
$dynamic("get$top").DOMWindow = function() { return this.top; };
$dynamic("_addEventListener").DOMWindow = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _WindowEventsImpl **************
$inherits(_WindowEventsImpl, _EventsImpl);
function _WindowEventsImpl(_ptr) {
  _EventsImpl.call(this, _ptr);
}
_WindowEventsImpl.prototype.get$keyPress = function() {
  return this._get("keypress");
}
_WindowEventsImpl.prototype.get$message = function() {
  return this._get("message");
}
_WindowEventsImpl.prototype.get$resize = function() {
  return this._get("resize");
}
// ********** Code for _WorkerImpl **************
$dynamic("postMessage$1").Worker = function($0) {
  return this.postMessage($0);
};
// ********** Code for _WorkerLocationImpl **************
// ********** Code for _WorkerNavigatorImpl **************
// ********** Code for _XMLHttpRequestImpl **************
$dynamic("_addEventListener").XMLHttpRequest = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _XMLHttpRequestExceptionImpl **************
$dynamic("get$name").XMLHttpRequestException = function() { return this.name; };
// ********** Code for _XMLHttpRequestProgressEventImpl **************
// ********** Code for _XMLHttpRequestUploadImpl **************
$dynamic("_addEventListener").XMLHttpRequestUpload = function(type, listener, useCapture) {
  this.addEventListener(type, listener, useCapture);
}
// ********** Code for _XMLSerializerImpl **************
// ********** Code for _XPathEvaluatorImpl **************
// ********** Code for _XPathExceptionImpl **************
$dynamic("get$name").XPathException = function() { return this.name; };
// ********** Code for _XPathExpressionImpl **************
// ********** Code for _XPathNSResolverImpl **************
// ********** Code for _XPathResultImpl **************
// ********** Code for _XSLTProcessorImpl **************
// ********** Code for _Collections **************
function _Collections() {}
_Collections.forEach = function(iterable, f) {
  for (var $$i = iterable.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    f(e);
  }
}
_Collections.filter = function(source, destination, f) {
  for (var $$i = source.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    if (f(e)) destination.add(e);
  }
  return destination;
}
// ********** Code for _MeasurementRequest **************
function _MeasurementRequest(computeValue, completer) {
  this.computeValue = computeValue;
  this.completer = completer;
  this.exception = false;
}
_MeasurementRequest.prototype.get$value = function() { return this.value; };
_MeasurementRequest.prototype.set$value = function(value) { return this.value = value; };
// ********** Code for _ElementFactoryProvider **************
function _ElementFactoryProvider() {}
_ElementFactoryProvider.Element$tag$factory = function(tag) {
  return get$$_document()._createElement(tag);
}
// ********** Code for _VariableSizeListIterator **************
function _VariableSizeListIterator() {}
_VariableSizeListIterator.prototype.hasNext = function() {
  return this._html_array.get$length() > this._html_pos;
}
_VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._html_array.$index(this._html_pos++);
}
_VariableSizeListIterator.prototype.next$0 = _VariableSizeListIterator.prototype.next;
// ********** Code for _FixedSizeListIterator **************
$inherits(_FixedSizeListIterator, _VariableSizeListIterator);
function _FixedSizeListIterator() {}
_FixedSizeListIterator.prototype.hasNext = function() {
  return this._html_length > this._html_pos;
}
// ********** Code for _VariableSizeListIterator_dart_core_String **************
$inherits(_VariableSizeListIterator_dart_core_String, _VariableSizeListIterator);
function _VariableSizeListIterator_dart_core_String(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dart_core_String **************
$inherits(_FixedSizeListIterator_dart_core_String, _FixedSizeListIterator);
function _FixedSizeListIterator_dart_core_String(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_dart_core_String.call(this, array);
}
// ********** Code for _VariableSizeListIterator_int **************
$inherits(_VariableSizeListIterator_int, _VariableSizeListIterator);
function _VariableSizeListIterator_int(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_int **************
$inherits(_FixedSizeListIterator_int, _FixedSizeListIterator);
function _FixedSizeListIterator_int(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_int.call(this, array);
}
// ********** Code for _VariableSizeListIterator_num **************
$inherits(_VariableSizeListIterator_num, _VariableSizeListIterator);
function _VariableSizeListIterator_num(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_num **************
$inherits(_FixedSizeListIterator_num, _FixedSizeListIterator);
function _FixedSizeListIterator_num(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_num.call(this, array);
}
// ********** Code for _VariableSizeListIterator_html_Node **************
$inherits(_VariableSizeListIterator_html_Node, _VariableSizeListIterator);
function _VariableSizeListIterator_html_Node(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_html_Node **************
$inherits(_FixedSizeListIterator_html_Node, _FixedSizeListIterator);
function _FixedSizeListIterator_html_Node(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_Node.call(this, array);
}
// ********** Code for _VariableSizeListIterator_html_StyleSheet **************
$inherits(_VariableSizeListIterator_html_StyleSheet, _VariableSizeListIterator);
function _VariableSizeListIterator_html_StyleSheet(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_html_StyleSheet **************
$inherits(_FixedSizeListIterator_html_StyleSheet, _FixedSizeListIterator);
function _FixedSizeListIterator_html_StyleSheet(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_StyleSheet.call(this, array);
}
// ********** Code for _VariableSizeListIterator_html_Touch **************
$inherits(_VariableSizeListIterator_html_Touch, _VariableSizeListIterator);
function _VariableSizeListIterator_html_Touch(array) {
  this._html_array = array;
  this._html_pos = (0);
}
// ********** Code for _FixedSizeListIterator_html_Touch **************
$inherits(_FixedSizeListIterator_html_Touch, _FixedSizeListIterator);
function _FixedSizeListIterator_html_Touch(array) {
  this._html_length = array.get$length();
  _VariableSizeListIterator_html_Touch.call(this, array);
}
// ********** Code for _Lists **************
function _Lists() {}
_Lists.indexOf = function(a, element, startIndex, endIndex) {
  if (startIndex >= a.get$length()) {
    return (-1);
  }
  if (startIndex < (0)) {
    startIndex = (0);
  }
  for (var i = startIndex;
   i < endIndex; i++) {
    if ($eq$(a.$index(i), element)) {
      return i;
    }
  }
  return (-1);
}
_Lists.getRange = function(a, start, length, accumulator) {
  if (length < (0)) $throw(new IllegalArgumentException("length"));
  if (start < (0)) $throw(new IndexOutOfRangeException(start));
  var end = start + length;
  if (end > a.get$length()) $throw(new IndexOutOfRangeException(end));
  for (var i = start;
   i < end; i++) {
    accumulator.add(a.$index(i));
  }
  return accumulator;
}
// ********** Code for top level **************
var _cachedWindow;
var _cachedDocument;
function _init() {
  $globals._cachedDocument = get$$_document();
  $globals._cachedWindow = get$$_window();
  var element = _ElementFactoryProvider.Element$tag$factory("body");
  element.set$innerHTML("f");
  if (element.get$text() == "") {
    $globals._cachedWindow.console.error("Cannot import dart:html and dart:dom within the same application.");
    $throw(new UnsupportedOperationException("Cannot import dart:html and dart:dom within the same application."));
  }
}
function get$$window() {
  if ($globals._cachedWindow == null) {
    _init();
  }
  return $globals._cachedWindow;
}
function get$$_window() {
  return window;
}
function get$$document() {
  if ($globals._cachedDocument == null) {
    _init();
  }
  return $globals._cachedDocument;
}
function get$$_document() {
  return window.document.documentElement;
}
var _cachedBrowserPrefix;
var _pendingRequests;
var _pendingMeasurementFrameCallbacks;
function _maybeScheduleMeasurementFrame() {
  if ($globals._nextMeasurementFrameScheduled) return;
  $globals._nextMeasurementFrameScheduled = true;
  if ($globals._firstMeasurementRequest) {
    get$$window().get$on().get$message().add((function (e) {
      return _completeMeasurementFutures();
    })
    , false);
    $globals._firstMeasurementRequest = false;
  }
  get$$window().postMessage("DART-MEASURE", "*");
}
function _createMeasurementFuture(computeValue, completer) {
  if (null == $globals._pendingRequests) {
    $globals._pendingRequests = [];
    _maybeScheduleMeasurementFrame();
  }
  $globals._pendingRequests.add(new _MeasurementRequest(computeValue, completer));
  return completer.get$future();
}
function _completeMeasurementFutures() {
  if ($eq$($globals._nextMeasurementFrameScheduled, false)) {
    return;
  }
  $globals._nextMeasurementFrameScheduled = false;
  if (null != $globals._pendingRequests) {
    var $$list = $globals._pendingRequests;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var request = $$i.next$0();
      try {
        request.value = request.computeValue();
      } catch (e) {
        e = _toDartException(e);
        request.value = e;
        request.exception = true;
      }
    }
  }
  var completedRequests = $globals._pendingRequests;
  var readyMeasurementFrameCallbacks = $globals._pendingMeasurementFrameCallbacks;
  $globals._pendingRequests = null;
  $globals._pendingMeasurementFrameCallbacks = null;
  if (null != completedRequests) {
    for (var $$i = completedRequests.iterator(); $$i.hasNext(); ) {
      var request = $$i.next$0();
      if (request.exception) {
        request.completer.completeException(request.value);
      }
      else {
        request.completer.complete(request.value);
      }
    }
  }
  if (null != readyMeasurementFrameCallbacks) {
    for (var $$i = readyMeasurementFrameCallbacks.iterator(); $$i.hasNext(); ) {
      var handler = $$i.next$0();
      handler();
    }
  }
}
//  ********** Library json **************
// ********** Code for top level **************
//  ********** Library uri **************
// ********** Code for Uri **************
Uri.fromString$ctor = function(uri) {
  Uri._fromMatch$ctor.call(this, const$0039.firstMatch(uri));
}
Uri.fromString$ctor.prototype = Uri.prototype;
Uri._fromMatch$ctor = function(m) {
  Uri.call(this, Uri._emptyIfNull(m.$index((1))), Uri._emptyIfNull(m.$index((2))), Uri._emptyIfNull(m.$index((3))), Uri._parseIntOrZero(m.$index((4))), Uri._emptyIfNull(m.$index((5))), Uri._emptyIfNull(m.$index((6))), Uri._emptyIfNull(m.$index((7))));
}
Uri._fromMatch$ctor.prototype = Uri.prototype;
function Uri(scheme, userInfo, domain, port, path, query, fragment) {
  this.scheme = scheme;
  this.userInfo = userInfo;
  this.domain = domain;
  this.port = port;
  this.path = path;
  this.query = query;
  this.fragment = fragment;
}
Uri._emptyIfNull = function(val) {
  return val != null ? val : "";
}
Uri._parseIntOrZero = function(val) {
  if (null != val && val != "") {
    return Math.parseInt(val);
  }
  else {
    return (0);
  }
}
Uri.prototype.isAbsolute = function() {
  if ("" == this.scheme) return false;
  if ("" != this.fragment) return false;
  return true;
}
Uri.prototype.hasAuthority = function() {
  return (this.userInfo != "") || (this.domain != "") || (this.port != (0));
}
Uri.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  Uri._addIfNonEmpty(sb, this.scheme, this.scheme, ":");
  if (this.hasAuthority() || (this.scheme == "file")) {
    sb.add("//");
    Uri._addIfNonEmpty(sb, this.userInfo, this.userInfo, "@");
    sb.add(null == this.domain ? "null" : this.domain);
    if (this.port != (0)) {
      sb.add(":");
      sb.add(this.port.toString());
    }
  }
  sb.add(null == this.path ? "null" : this.path);
  Uri._addIfNonEmpty(sb, this.query, "?", this.query);
  Uri._addIfNonEmpty(sb, this.fragment, "#", this.fragment);
  return sb.toString();
}
Uri._addIfNonEmpty = function(sb, test, first, second) {
  if ("" != test) {
    sb.add(null == first ? "null" : first);
    sb.add(null == second ? "null" : second);
  }
}
// ********** Code for top level **************
//  ********** Library dart:isolate **************
//  ********** Natives natives.js **************
// Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// Top-level native code needed by the frog compiler

var $globalThis = this;
var $globals = null;
var $globalState = null;
function $initGlobals(context) { context.isolateStatics = {}; }
function $setGlobals(context) { $globals = context.isolateStatics; }

// Wrap a 0-arg dom-callback to bind it with the current isolate:
function $wrap_call$0(fn) { return fn && fn.wrap$call$0(); }

Function.prototype.wrap$call$0 = function() {
  var isolateContext = $globalState.currentContext;
  var self = this;
  this.wrap$0 = function() {
    isolateContext.eval(self);
    $globalState.topEventLoop.run();
  };
  this.wrap$call$0 = function() { return this.wrap$0; };
  return this.wrap$0;
};

// Wrap a 1-arg dom-callback to bind it with the current isolate:
function $wrap_call$1(fn) { return fn && fn.wrap$call$1(); }

Function.prototype.wrap$call$1 = function() {
  var isolateContext = $globalState.currentContext;
  var self = this;
  this.wrap$1 = function(arg) {
    isolateContext.eval(function() { self(arg); });
    $globalState.topEventLoop.run();
  };
  this.wrap$call$1 = function() { return this.wrap$1; };
  return this.wrap$1;
};
// ********** Code for _GlobalState **************
function _GlobalState() {
  this.nextIsolateId = (0);
  this.currentWorkerId = (0);
  this.nextWorkerId = (1);
  this.currentContext = null;
  this.rootContext = null;
  this.topEventLoop = new _EventLoop();
  this.isolates = new HashMapImplementation();
  this.workers = new HashMapImplementation();
  this.mainWorker = new _MainWorker();
  this._nativeInit();
}
_GlobalState.prototype.get$useWorkers = function() {
  return this.supportsWorkers;
}
_GlobalState.prototype.get$needSerialization = function() {
  return this.get$useWorkers();
}
_GlobalState.prototype._nativeInit = function() {
      this.isWorker = typeof ($globalThis['importScripts']) != 'undefined';
      this.inWindow = typeof(window) !== 'undefined';
      this.supportsWorkers = this.isWorker ||
          ((typeof $globalThis['Worker']) != 'undefined');
      if (this.isWorker) {
        $globalThis.onmessage = function (e) {
          _IsolateNatives._processWorkerMessage(this.mainWorker, e);
        };
      }
    
}
_GlobalState.prototype.closeWorker = function() {
  if (this.isWorker) {
    if (!this.isolates.isEmpty()) return;
    this.mainWorker.postMessage(_serializeMessage(_map(["command", "close"])));
  }
  else if (this.isolates.containsKey(this.rootContext.id) && this.workers.isEmpty() && !this.supportsWorkers && !this.inWindow) {
    $throw(new ExceptionImplementation("Program exited with open ReceivePorts."));
  }
}
// ********** Code for _IsolateContext **************
function _IsolateContext() {
  var $0, $1;
  this.id = (($0 = get$$_globalState()).nextIsolateId = ($1 = $0.nextIsolateId) + (1), $1);
  this.ports = new HashMapImplementation();
  this.initGlobals();
}
_IsolateContext.prototype.get$id = function() { return this.id; };
_IsolateContext.prototype.set$id = function(value) { return this.id = value; };
_IsolateContext.prototype.get$ports = function() { return this.ports; };
_IsolateContext.prototype.initGlobals = function() {
  $initGlobals(this);
}
_IsolateContext.prototype.eval = function(code) {
  var old = get$$_globalState().currentContext;
  get$$_globalState().currentContext = this;
  this._setGlobals();
  var result = null;
  try {
    result = code.call$0();
  } finally {
    get$$_globalState().currentContext = old;
    if ($ne$(old)) old._setGlobals();
  }
  return result;
}
_IsolateContext.prototype._setGlobals = function() {
  $setGlobals(this);
}
_IsolateContext.prototype.lookup = function(id) {
  return this.ports.$index(id);
}
_IsolateContext.prototype.register = function(portId, port) {
  if (this.ports.containsKey(portId)) {
    $throw(new ExceptionImplementation("Registry: ports must be registered only once."));
  }
  this.ports.$setindex(portId, port);
  get$$_globalState().isolates.$setindex(this.id, this);
}
// ********** Code for _Window **************
// ********** Code for _EventLoop **************
function _EventLoop() {
  this.events = new DoubleLinkedQueue__IsolateEvent();
}
_EventLoop.prototype.enqueue = function(isolate, fn, msg) {
  this.events.addLast(new _IsolateEvent(isolate, fn, msg));
}
_EventLoop.prototype.dequeue = function() {
  if (this.events.isEmpty()) return null;
  return this.events.removeFirst();
}
_EventLoop.prototype.runIteration = function() {
  var event = this.dequeue();
  if ($eq$(event)) {
    get$$_globalState().closeWorker();
    return false;
  }
  event.process();
  return true;
}
_EventLoop.prototype._runHelper = function() {
  var $this = this; // closure support
  if (get$$_window() != null) {
    function next() {
      if (!$this.runIteration()) return;
      get$$_window().setTimeout(next, (0));
    }
    next();
  }
  else {
    while (this.runIteration()) {
    }
  }
}
_EventLoop.prototype.run = function() {
  if (!get$$_globalState().isWorker) {
    this._runHelper();
  }
  else {
    try {
      this._runHelper();
    } catch (e) {
      var trace = _stackTraceOf(e);
      e = _toDartException(e);
      get$$_globalState().mainWorker.postMessage(_serializeMessage(_map(["command", "error", "msg", ("" + e + "\n" + trace)])));
    }
  }
}
// ********** Code for _IsolateEvent **************
function _IsolateEvent(isolate, fn, message) {
  this.isolate = isolate;
  this.fn = fn;
  this.message = message;
}
_IsolateEvent.prototype.process = function() {
  this.isolate.eval(this.fn);
}
// ********** Code for _MainWorker **************
function _MainWorker() {
  this.id = (0);
}
_MainWorker.prototype.get$id = function() { return this.id; };
_MainWorker.prototype.set$id = function(value) { return this.id = value; };
_MainWorker.prototype.postMessage = function(msg) {
  $globalThis.postMessage(msg);
}
_MainWorker.prototype.terminate = function() {

}
_MainWorker.prototype.postMessage$1 = _MainWorker.prototype.postMessage;
// ********** Code for _Worker **************
$dynamic("get$id").Worker = function() {
  return this.id;
}
$dynamic("set$id").Worker = function(i) {
  this.id = i;
}
$dynamic("postMessage").Worker = function(msg) {
  return this.postMessage(msg);
}
$dynamic("set$onmessage").Worker = function(f) {
  this.onmessage = f;
}
$dynamic("postMessage$1").Worker = function($0) {
  return this.postMessage($0);
};
// ********** Code for _IsolateNatives **************
function _IsolateNatives() {}
_IsolateNatives.get$_thisScript = function() {
  if ($globals._IsolateNatives__thisScriptCache == null) {
    $globals._IsolateNatives__thisScriptCache = _IsolateNatives._computeThisScript();
  }
  return $globals._IsolateNatives__thisScriptCache;
}
_IsolateNatives._computeThisScript = function() {
      if (!$globalState.supportsWorkers || $globalState.isWorker) return (void 0);

      // TODO(5334778): Find a cross-platform non-brittle way of getting the
      // currently running script.
      var scripts = document.getElementsByTagName('script');
      // The scripts variable only contains the scripts that have already been
      // executed. The last one is the currently running script.
      var script = scripts[scripts.length - 1];
      var src = script && script.src;
      if (!src) {
        // TODO()
        src = "FIXME:5407062" + "_" + Math.random().toString();
        if (script) script.src = src;
      }
      return src;
    
}
_IsolateNatives._newWorker = function(url) {
  return new Worker(url);
}
_IsolateNatives._spawnWorker = function(factoryName, serializedReplyPort) {
  var $0, $1;
  var worker = _IsolateNatives._newWorker(_IsolateNatives.get$_thisScript());
  worker.set$onmessage((function (e) {
    _IsolateNatives._processWorkerMessage(worker, e);
  })
  );
  var workerId = (($0 = get$$_globalState()).nextWorkerId = ($1 = $0.nextWorkerId) + (1), $1);
  worker.set$id(workerId);
  get$$_globalState().workers.$setindex(workerId, worker);
  worker.postMessage$1(_serializeMessage(_map(["command", "start", "id", workerId, "replyTo", serializedReplyPort, "factoryName", factoryName])));
}
_IsolateNatives._getEventData = function(e) {
  return e.data
}
_IsolateNatives._processWorkerMessage = function(sender, e) {
  var msg = _deserializeMessage(_IsolateNatives._getEventData(e));
  switch (msg.$index("command")) {
    case "start":

      get$$_globalState().currentWorkerId = msg.$index("id");
      var runnerObject = _IsolateNatives._allocate(_IsolateNatives._getJSConstructorFromName(msg.$index("factoryName")));
      var serializedReplyTo = msg.$index("replyTo");
      get$$_globalState().topEventLoop.enqueue(new _IsolateContext(), function function_() {
        var replyTo = _deserializeMessage(serializedReplyTo);
        _IsolateNatives._startIsolate(runnerObject, replyTo);
      }
      , "worker-start");
      get$$_globalState().topEventLoop.run();
      break;

    case "start2":

      get$$_globalState().currentWorkerId = msg.$index("id");
      var entryPoint = _IsolateNatives._getJSFunctionFromName(msg.$index("functionName"));
      var replyTo = _deserializeMessage(msg.$index("replyTo"));
      get$$_globalState().topEventLoop.enqueue(new _IsolateContext(), function function_() {
        _IsolateNatives._startIsolate2(entryPoint, replyTo);
      }
      , "worker-start");
      get$$_globalState().topEventLoop.run();
      break;

    case "spawn-worker":

      _IsolateNatives._spawnWorker(msg.$index("factoryName"), msg.$index("replyPort"));
      break;

    case "spawn-worker2":

      _IsolateNatives._spawnWorker2(msg.$index("functionName"), msg.$index("uri"), msg.$index("replyPort"));
      break;

    case "message":

      msg.$index("port").send$2(msg.$index("msg"), msg.$index("replyTo"));
      get$$_globalState().topEventLoop.run();
      break;

    case "close":

      _IsolateNatives._log("Closing Worker");
      get$$_globalState().workers.remove(sender.get$id());
      sender.terminate();
      get$$_globalState().topEventLoop.run();
      break;

    case "log":

      _IsolateNatives._log(msg.$index("msg"));
      break;

    case "print":

      if (get$$_globalState().isWorker) {
        get$$_globalState().mainWorker.postMessage(_serializeMessage(_map(["command", "print", "msg", msg])));
      }
      else {
        print$(msg.$index("msg"));
      }
      break;

    case "error":

      $throw(msg.$index("msg"));

  }
}
_IsolateNatives._log = function(msg) {
  if (get$$_globalState().isWorker) {
    get$$_globalState().mainWorker.postMessage(_serializeMessage(_map(["command", "log", "msg", msg])));
  }
  else {
    try {
      _IsolateNatives._consoleLog(msg);
    } catch (e) {
      var trace = _stackTraceOf(e);
      e = _toDartException(e);
      $throw(new ExceptionImplementation(trace));
    }
  }
}
_IsolateNatives._consoleLog = function(msg) {
  $globalThis.console.log(msg);
}
_IsolateNatives._getJSConstructorFromName = function(factoryName) {
      return $globalThis[factoryName];
    
}
_IsolateNatives._getJSFunctionFromName = function(functionName) {
      return $globalThis[functionName];
    
}
_IsolateNatives._allocate = function(ctor) {
  return new ctor();
}
_IsolateNatives._startIsolate = function(isolate, replyTo) {
  _fillStatics(get$$_globalState().currentContext);
  var port0 = _ReceivePortFactory.ReceivePort$factory();
  replyTo.send("spawned", port0.toSendPort());
  isolate._run(port0);
}
_IsolateNatives._startIsolate2 = function(topLevel, replyTo) {
  _fillStatics(get$$_globalState().currentContext);
  $globals._port = _ReceivePortFactory.ReceivePort$factory();
  replyTo.send("spawned", get$$port().toSendPort());
  topLevel.call$0();
}
_IsolateNatives._spawnWorker2 = function(functionName, uri, replyPort) {
  var $0, $1;
  if ($eq$(functionName)) functionName = "main";
  if ($eq$(uri)) uri = _IsolateNatives.get$_thisScript();
  if (!(new Uri.fromString$ctor(uri).isAbsolute())) {
    var prefix = _IsolateNatives.get$_thisScript().substring((0), _IsolateNatives.get$_thisScript().lastIndexOf("/"));
    uri = ("" + prefix + "/" + uri);
  }
  var worker = _IsolateNatives._newWorker(uri);
  worker.set$onmessage((function (e) {
    _IsolateNatives._processWorkerMessage(worker, e);
  })
  );
  var workerId = (($0 = get$$_globalState()).nextWorkerId = ($1 = $0.nextWorkerId) + (1), $1);
  worker.set$id(workerId);
  get$$_globalState().workers.$setindex(workerId, worker);
  worker.postMessage$1(_serializeMessage(_map(["command", "start2", "id", workerId, "replyTo", _serializeMessage(replyPort), "functionName", functionName])));
}
// ********** Code for _BaseSendPort **************
function _BaseSendPort(_isolateId) {
  this._isolateId = _isolateId;
}
_BaseSendPort.prototype.get$_isolateId = function() { return this._isolateId; };
_BaseSendPort.checkReplyTo = function(replyTo) {
  if (null != replyTo && !(replyTo instanceof _NativeJsSendPort) && !(replyTo instanceof _WorkerSendPort) && !(replyTo instanceof _BufferingSendPort)) {
    $throw(new ExceptionImplementation("SendPort.send: Illegal replyTo port type"));
  }
}
_BaseSendPort.prototype.send$2 = _BaseSendPort.prototype.send;
// ********** Code for _NativeJsSendPort **************
$inherits(_NativeJsSendPort, _BaseSendPort);
function _NativeJsSendPort(_receivePort, isolateId) {
  this._receivePort = _receivePort;
  _BaseSendPort.call(this, isolateId);
}
_NativeJsSendPort.prototype.get$_receivePort = function() { return this._receivePort; };
_NativeJsSendPort.prototype.send = function(message, replyTo) {
  var $this = this; // closure support
  _waitForPendingPorts([message, replyTo], (function () {
    _BaseSendPort.checkReplyTo(replyTo);
    var isolate = get$$_globalState().isolates.$index($this._isolateId);
    if ($eq$(isolate)) return;
    if ($this._receivePort._callback == null) return;
    var shouldSerialize = get$$_globalState().currentContext != null && get$$_globalState().currentContext.id != $this._isolateId;
    var msg = message;
    var reply = replyTo;
    if (shouldSerialize) {
      msg = _serializeMessage(msg);
      reply = _serializeMessage(reply);
    }
    get$$_globalState().topEventLoop.enqueue(isolate, (function () {
      if ($this._receivePort._callback != null) {
        if (shouldSerialize) {
          msg = _deserializeMessage(msg);
          reply = _deserializeMessage(reply);
        }
        $this._receivePort._callback.call$2(msg, reply);
      }
    })
    , $add$("receive ", message));
  })
  );
}
_NativeJsSendPort.prototype.$eq = function(other) {
  return ((other instanceof _NativeJsSendPort)) && ($eq$(this._receivePort, other.get$_receivePort()));
}
_NativeJsSendPort.prototype.hashCode = function() {
  return this._receivePort._id;
}
_NativeJsSendPort.prototype.send$2 = _NativeJsSendPort.prototype.send;
// ********** Code for _WorkerSendPort **************
$inherits(_WorkerSendPort, _BaseSendPort);
function _WorkerSendPort(_workerId, isolateId, _receivePortId) {
  this._workerId = _workerId;
  this._receivePortId = _receivePortId;
  _BaseSendPort.call(this, isolateId);
}
_WorkerSendPort.prototype.get$_workerId = function() { return this._workerId; };
_WorkerSendPort.prototype.get$_receivePortId = function() { return this._receivePortId; };
_WorkerSendPort.prototype.send = function(message, replyTo) {
  var $this = this; // closure support
  _waitForPendingPorts([message, replyTo], (function () {
    _BaseSendPort.checkReplyTo(replyTo);
    var workerMessage = _serializeMessage(_map(["command", "message", "port", $this, "msg", message, "replyTo", replyTo]));
    if (get$$_globalState().isWorker) {
      get$$_globalState().mainWorker.postMessage(workerMessage);
    }
    else {
      get$$_globalState().workers.$index($this._workerId).postMessage$1(workerMessage);
    }
  })
  );
}
_WorkerSendPort.prototype.$eq = function(other) {
  return ((other instanceof _WorkerSendPort)) && (this._workerId == other.get$_workerId()) && (this._isolateId == other.get$_isolateId()) && (this._receivePortId == other.get$_receivePortId());
}
_WorkerSendPort.prototype.hashCode = function() {
  return (this._workerId << (16)) ^ (this._isolateId << (8)) ^ this._receivePortId;
}
_WorkerSendPort.prototype.send$2 = _WorkerSendPort.prototype.send;
// ********** Code for _BufferingSendPort **************
$inherits(_BufferingSendPort, _BaseSendPort);
function _BufferingSendPort() {}
_BufferingSendPort.prototype.get$_id = function() { return this._id; };
_BufferingSendPort.prototype.send = function(message, replyTo) {
  if (this._port != null) {
    this._port.send(message, replyTo);
  }
  else {
    this.pending.add(_map(["message", message, "replyTo", replyTo]));
  }
}
_BufferingSendPort.prototype.$eq = function(other) {
  return (other instanceof _BufferingSendPort) && this._id == other.get$_id();
}
_BufferingSendPort.prototype.hashCode = function() {
  return this._id;
}
_BufferingSendPort.prototype.send$2 = _BufferingSendPort.prototype.send;
// ********** Code for _ReceivePortFactory **************
function _ReceivePortFactory() {}
_ReceivePortFactory.ReceivePort$factory = function() {
  return new _ReceivePortImpl();
}
// ********** Code for _ReceivePortImpl **************
function _ReceivePortImpl() {
  this._id = $globals._ReceivePortImpl__nextFreeId++;
  get$$_globalState().currentContext.register(this._id, this);
}
_ReceivePortImpl.prototype.get$_id = function() { return this._id; };
_ReceivePortImpl.prototype.toSendPort = function() {
  return new _NativeJsSendPort(this, get$$_globalState().currentContext.id);
}
// ********** Code for _MessageTraverser **************
function _MessageTraverser() {

}
_MessageTraverser.prototype.traverse = function(x) {
  if (_MessageTraverser.isPrimitive(x)) return this.visitPrimitive(x);
  this._taggedObjects = new Array();
  var result;
  try {
    result = this._dispatch(x);
  } finally {
    this._cleanup();
  }
  return result;
}
_MessageTraverser.prototype._cleanup = function() {
  var len = this._taggedObjects.get$length();
  for (var i = (0);
   i < len; i++) {
    this._clearAttachedInfo(this._taggedObjects.$index(i));
  }
  this._taggedObjects = null;
}
_MessageTraverser.prototype._attachInfo = function(o, info) {
  this._taggedObjects.add(o);
  this._setAttachedInfo(o, info);
}
_MessageTraverser.prototype._getInfo = function(o) {
  return this._getAttachedInfo(o);
}
_MessageTraverser.prototype._dispatch = function(x) {
  if (_MessageTraverser.isPrimitive(x)) return this.visitPrimitive(x);
  if (!!(x && x.is$List())) return this.visitList(x);
  if (!!(x && x.is$Map())) return this.visitMap(x);
  if ((x instanceof _NativeJsSendPort)) return this.visitNativeJsSendPort(x);
  if ((x instanceof _WorkerSendPort)) return this.visitWorkerSendPort(x);
  if ((x instanceof _BufferingSendPort)) return this.visitBufferingSendPort(x);
  $throw(("Message serialization: Illegal value " + x + " passed"));
}
_MessageTraverser.prototype._clearAttachedInfo = function(o) {
  o['__MessageTraverser__attached_info__'] = (void 0);
}
_MessageTraverser.prototype._setAttachedInfo = function(o, info) {
  o['__MessageTraverser__attached_info__'] = info;
}
_MessageTraverser.prototype._getAttachedInfo = function(o) {
  return o['__MessageTraverser__attached_info__'];
}
_MessageTraverser.prototype._visitNativeOrWorkerPort = function(p) {
  if ((p instanceof _NativeJsSendPort)) return this.visitNativeJsSendPort(p);
  if ((p instanceof _WorkerSendPort)) return this.visitWorkerSendPort(p);
  $throw(("Illegal underlying port " + p));
}
_MessageTraverser.isPrimitive = function(x) {
  return (null == x) || ((typeof(x) == 'string')) || ((typeof(x) == 'number')) || ((typeof(x) == 'boolean'));
}
// ********** Code for _PendingSendPortFinder **************
$inherits(_PendingSendPortFinder, _MessageTraverser);
function _PendingSendPortFinder() {
  this.ports = [];
  _MessageTraverser.call(this);
}
_PendingSendPortFinder.prototype.get$ports = function() { return this.ports; };
_PendingSendPortFinder.prototype.visitPrimitive = function(x) {

}
_PendingSendPortFinder.prototype.visitNativeJsSendPort = function(port) {

}
_PendingSendPortFinder.prototype.visitWorkerSendPort = function(port) {

}
_PendingSendPortFinder.prototype.visitList = function(list) {
  var $this = this; // closure support
  var visited = this._getInfo(list);
  if (null != visited) return;
  this._attachInfo(list, true);
  list.forEach((function (e) {
    return $this._dispatch(e);
  })
  );
}
_PendingSendPortFinder.prototype.visitMap = function(map) {
  var $this = this; // closure support
  var visited = this._getInfo(map);
  if (null != visited) return;
  this._attachInfo(map, true);
  map.getValues().forEach((function (e) {
    return $this._dispatch(e);
  })
  );
}
_PendingSendPortFinder.prototype.visitBufferingSendPort = function(port) {
  if ($eq$(port._port)) {
    this.ports.add(port._futurePort);
  }
}
// ********** Code for _Copier **************
$inherits(_Copier, _MessageTraverser);
function _Copier() {
  _MessageTraverser.call(this);
}
_Copier.prototype.visitPrimitive = function(x) {
  return x;
}
_Copier.prototype.visitList = function(list) {
  var copy = this._getInfo(list);
  if (null != copy) return copy;
  var len = list.get$length();
  copy = new Array(len);
  this._attachInfo(list, copy);
  for (var i = (0);
   i < len; i++) {
    copy.$setindex(i, this._dispatch(list.$index(i)));
  }
  return copy;
}
_Copier.prototype.visitMap = function(map) {
  var $this = this; // closure support
  var copy = this._getInfo(map);
  if (null != copy) return copy;
  copy = new HashMapImplementation();
  this._attachInfo(map, copy);
  map.forEach((function (key, val) {
    copy.$setindex($this._dispatch(key), $this._dispatch(val));
  })
  );
  return copy;
}
_Copier.prototype.visitNativeJsSendPort = function(port) {
  return new _NativeJsSendPort(port._receivePort, port._isolateId);
}
_Copier.prototype.visitWorkerSendPort = function(port) {
  return new _WorkerSendPort(port._workerId, port._isolateId, port._receivePortId);
}
_Copier.prototype.visitBufferingSendPort = function(port) {
  if (port._port != null) {
    return this._visitNativeOrWorkerPort(port._port);
  }
  else {
    $throw("internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.");
  }
}
// ********** Code for _Serializer **************
$inherits(_Serializer, _MessageTraverser);
function _Serializer() {
  this._nextFreeRefId = (0);
  _MessageTraverser.call(this);
}
_Serializer.prototype.visitPrimitive = function(x) {
  return x;
}
_Serializer.prototype.visitList = function(list) {
  var copyId = this._getInfo(list);
  if (null != copyId) return ["ref", copyId];
  var id = this._nextFreeRefId++;
  this._attachInfo(list, id);
  var jsArray = this._serializeList(list);
  return ["list", id, jsArray];
}
_Serializer.prototype.visitMap = function(map) {
  var copyId = this._getInfo(map);
  if (null != copyId) return ["ref", copyId];
  var id = this._nextFreeRefId++;
  this._attachInfo(map, id);
  var keys = this._serializeList(map.getKeys());
  var values = this._serializeList(map.getValues());
  return ["map", id, keys, values];
}
_Serializer.prototype.visitNativeJsSendPort = function(port) {
  return ["sendport", get$$_globalState().currentWorkerId, port._isolateId, port._receivePort._id];
}
_Serializer.prototype.visitWorkerSendPort = function(port) {
  return ["sendport", port._workerId, port._isolateId, port._receivePortId];
}
_Serializer.prototype.visitBufferingSendPort = function(port) {
  if (port._port != null) {
    return this._visitNativeOrWorkerPort(port._port);
  }
  else {
    $throw("internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.");
  }
}
_Serializer.prototype._serializeList = function(list) {
  var len = list.get$length();
  var result = new Array(len);
  for (var i = (0);
   i < len; i++) {
    result.$setindex(i, this._dispatch(list.$index(i)));
  }
  return result;
}
// ********** Code for _Deserializer **************
function _Deserializer() {

}
_Deserializer.isPrimitive = function(x) {
  return (null == x) || ((typeof(x) == 'string')) || ((typeof(x) == 'number')) || ((typeof(x) == 'boolean'));
}
_Deserializer.prototype.deserialize = function(x) {
  if (_Deserializer.isPrimitive(x)) return x;
  this._deserialized = new HashMapImplementation();
  return this._deserializeHelper(x);
}
_Deserializer.prototype._deserializeHelper = function(x) {
  if (_Deserializer.isPrimitive(x)) return x;
  switch (x.$index((0))) {
    case "ref":

      return this._deserializeRef(x);

    case "list":

      return this._deserializeList(x);

    case "map":

      return this._deserializeMap(x);

    case "sendport":

      return this._deserializeSendPort(x);

    default:

      $throw("Unexpected serialized object");

  }
}
_Deserializer.prototype._deserializeRef = function(x) {
  var id = x.$index((1));
  var result = this._deserialized.$index(id);
  return result;
}
_Deserializer.prototype._deserializeList = function(x) {
  var id = x.$index((1));
  var dartList = x.$index((2));
  this._deserialized.$setindex(id, dartList);
  var len = dartList.get$length();
  for (var i = (0);
   i < len; i++) {
    dartList.$setindex(i, this._deserializeHelper(dartList.$index(i)));
  }
  return dartList;
}
_Deserializer.prototype._deserializeMap = function(x) {
  var result = new HashMapImplementation();
  var id = x.$index((1));
  this._deserialized.$setindex(id, result);
  var keys = x.$index((2));
  var values = x.$index((3));
  var len = keys.get$length();
  for (var i = (0);
   i < len; i++) {
    var key = this._deserializeHelper(keys.$index(i));
    var value = this._deserializeHelper(values.$index(i));
    result.$setindex(key, value);
  }
  return result;
}
_Deserializer.prototype._deserializeSendPort = function(x) {
  var workerId = x.$index((1));
  var isolateId = x.$index((2));
  var receivePortId = x.$index((3));
  if (workerId == get$$_globalState().currentWorkerId) {
    var isolate = get$$_globalState().isolates.$index(isolateId);
    if ($eq$(isolate)) return null;
    var receivePort = isolate.lookup(receivePortId);
    return new _NativeJsSendPort(receivePort, isolateId);
  }
  else {
    return new _WorkerSendPort(workerId, isolateId, receivePortId);
  }
}
// ********** Code for top level **************
function get$$port() {
  return $globals._port;
}
function startRootIsolate(entry) {
  set$$_globalState(new _GlobalState());
  if (get$$_globalState().isWorker) return;
  var rootContext = new _IsolateContext();
  get$$_globalState().rootContext = rootContext;
  _fillStatics(rootContext);
  get$$_globalState().currentContext = rootContext;
  rootContext.eval(entry);
  get$$_globalState().topEventLoop.run();
}
function get$$_globalState() {
  return $globalState;
}
function set$$_globalState(val) {
  $globalState = val;
}
function _fillStatics(context) {
    $globals = context.isolateStatics;
    $static_init();
}
var _port;
function get$$_window() {
  return typeof window != 'undefined' ? window : (void 0);
}
function _waitForPendingPorts(message, callback) {
  var finder = new _PendingSendPortFinder();
  finder.traverse(message);
  Futures.wait(finder.get$ports()).then((function (_) {
    return callback();
  })
  );
}
function _serializeMessage(message) {
  if (get$$_globalState().get$needSerialization()) {
    return new _Serializer().traverse(message);
  }
  else {
    return new _Copier().traverse(message);
  }
}
function _deserializeMessage(message) {
  if (get$$_globalState().get$needSerialization()) {
    return new _Deserializer().deserialize(message);
  }
  else {
    return message;
  }
}
//  ********** Library Reactive Dart **************
// ********** Code for Observable **************
function Observable() {}
Observable.create = function(f) {
  return new _ChainableIObservableImplementation(f);
}
Observable.randomInt = function(low, high, intervalLow, intervalHigh, howMany, continuation) {
  return Observable.create((function (o) {
    function makeit() {
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
    }
    if (continuation == null) {
      makeit();
    }
    else {
      continuation.subscribe((function (_) {

      })
      , (function () {
        return makeit();
      })
      , (function (e) {
        return o.error(e);
      })
      );
    }
  })
  );
}
Observable.random = function(low, high, intervalLow, intervalHigh, howMany, continuation) {
  if (high <= low) return Observable.throwE(const$0035);
  if (intervalHigh < intervalLow) return Observable.throwE(const$0036);
  if (intervalLow < (1) || intervalHigh < (1)) return Observable.throwE(const$0037);
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
    function makeit() {
      function nextNum() {
        o.next((Math.random() * delta) + low);
        if (howMany == null) {
          get$$window().setTimeout(nextNum, iFunc.call$0());
        }
        else if (howMany != null && ++ticks <= howMany) {
          get$$window().setTimeout(nextNum, iFunc.call$0());
        }
        else {
          o.complete();
        }
      }
      if (howMany == null) {
        get$$window().setTimeout(nextNum, iFunc.call$0());
      }
      else if (howMany != null && ++ticks <= howMany) {
        get$$window().setTimeout(nextNum, iFunc.call$0());
      }
      else {
        o.complete();
      }
    }
    if (continuation == null) {
      makeit();
    }
    else {
      continuation.subscribe((function (_) {

      })
      , (function () {
        return makeit();
      })
      , (function (e) {
        return o.error(e);
      })
      );
    }
  })
  );
}
Observable.fromEvent = function(event, continuation) {
  return Observable.create((function (o) {
    function makeit() {
      return event.add((function (e) {
        return o.next(e);
      })
      , false);
    }
    if (continuation == null) {
      makeit();
    }
    else {
      continuation.subscribe((function (_) {

      })
      , (function () {
        return makeit();
      })
      , (function (e) {
        return o.error(e);
      })
      );
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
Observable.contains = function(source, value) {
  return Observable.create((function (o) {
    source.subscribe((function (v) {
      if ($ne$(v, value)) {
        o.next(false);
      }
      else {
        o.next(true);
        o.complete();
      }
    })
    , (function () {
      o.complete();
    })
    , (function (e) {
      return o.error(e);
    })
    );
  })
  );
}
Observable.fromList = function(l, continuation) {
  if (l == null) return Observable.throwE(const$0033);
  return Observable.create((function (o) {
    function makeit() {
      l.forEach((function (el) {
        return o.next(el);
      })
      );
      o.complete();
    }
    if (continuation == null) {
      makeit();
    }
    else {
      continuation.subscribe((function (_) {

      })
      , (function () {
        return makeit();
      })
      , (function (e) {
        return o.error(e);
      })
      );
    }
  })
  );
}
Observable.timer = function(milliseconds, ticks, continuation) {
  if (milliseconds < (1)) return Observable.throwE(const$0005);
  return Observable.create((function (o) {
    function makeit() {
      if (ticks <= (0)) {
        get$$window().setInterval((function () {
          return o.next(null);
        })
        , milliseconds);
      }
      else {
        var handler;
        var tickCount = (0);
        handler = get$$window().setInterval((function () {
          if ($gt$((tickCount = $add$(tickCount, (1))), ticks)) {
            get$$window().clearInterval(handler);
            o.complete();
            return;
          }
          o.next(tickCount);
        })
        , milliseconds);
      }
    }
    if (continuation == null) {
      makeit();
    }
    else {
      continuation.subscribe((function (_) {

      })
      , (function () {
        return makeit();
      })
      , (function (e) {
        return o.error(e);
      })
      );
    }
  })
  );
}
// ********** Code for _ChainableIObservableImplementation **************
function _ChainableIObservableImplementation(oFunc) {
  var $this = this; // closure support
  this.oFunc = oFunc;
  this.observers = new Array();
  this.mainObserver = new _DefaultObserver((function (n) {
    return $this.observers.forEach((function (o) {
      return o.next$1(n);
    })
    );
  })
  , (function () {
    $this.observers.forEach((function (o) {
      return o.complete$0();
    })
    );
    $this.dispose();
  })
  , (function (e) {
    $this.err = e;
    $this.observers.forEach((function (o) {
      return o.error$1(e);
    })
    );
    $this.dispose();
  })
  );
}
_ChainableIObservableImplementation.prototype.subscribe = function(next, complete, error) {
  if (this.err != null) {
    if (error != null) error(this.err);
    return null;
  }
  if (this.mainObserver == null) {
    if (complete != null) complete();
    return null;
  }
  if ((typeof(next) == 'function')) {
    return this._addObserver(new _DefaultObserver(next, complete, error));
  }
  else if (!!(next && next.is$IObserver())) {
    return this._addObserver(next);
  }
  else {
    $throw(const$0007);
  }
}
_ChainableIObservableImplementation.prototype._addObserver = function(o) {
  this.observers.add(o);
  if (this.observers.get$length() == (1)) this.oFunc.call$1(this.mainObserver);
  return new _UnsubscriberWrapper(this, o);
}
_ChainableIObservableImplementation.prototype.dispose = function() {
  this.mainObserver = null;
  this.observers.clear();
}
_ChainableIObservableImplementation.prototype.contains = function(value) {
  return Observable.contains(this, value);
}
_ChainableIObservableImplementation.prototype.apply = function(applyFunction) {
  return Observable.apply(this, applyFunction);
}
_ChainableIObservableImplementation.prototype.contains$1 = _ChainableIObservableImplementation.prototype.contains;
_ChainableIObservableImplementation.prototype.subscribe$1 = function($0) {
  return this.subscribe($0, to$call$0(null), to$call$1(null));
};
_ChainableIObservableImplementation.prototype.subscribe$2 = function($0, $1) {
  return this.subscribe($0, to$call$0($1), to$call$1(null));
};
// ********** Code for _UnsubscriberWrapper **************
function _UnsubscriberWrapper(factoryObservableReference, observer) {
  this.factoryObservableReference = factoryObservableReference;
  this.observer = observer;
}
_UnsubscriberWrapper.prototype.dispose = function() {
  if ($ne$(this.factoryObservableReference.observers.indexOf$1(this.observer), (-1))) this.factoryObservableReference.observers.removeRange(this.factoryObservableReference.observers.indexOf$1(this.observer), (1));
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
_DefaultObserver.prototype.error = function(err) {
  return this.errorFunc.call$1(err);
}
_DefaultObserver.prototype.complete = function() {
  return this.completeFunc.call$0();
}
_DefaultObserver.prototype.hashCode = function() {
  return this._assignedHash;
}
_DefaultObserver.prototype.complete$0 = _DefaultObserver.prototype.complete;
_DefaultObserver.prototype.error$1 = _DefaultObserver.prototype.error;
_DefaultObserver.prototype.next$1 = _DefaultObserver.prototype.next;
// ********** Code for ObservableException **************
function ObservableException(message) {
  this.message = message;
}
ObservableException.prototype.toString = function() {
  return this.message;
}
// ********** Code for top level **************
//  ********** Library F:\Development\Dart\Projects\reactive\demo\alphabet_invasion\alphabetinvasion **************
// ********** Code for AlphabetInvasion **************
function AlphabetInvasion() {
  this.currentLevel = (1);
  this.CURRENT_SPEED = (0);
  this.LAUNCH_RATE = (1);
  this.HIGH_SCORE_STORAGE_KEY = "_alphabet_attack_high_score_";
  this.enemies = new DoubleLinkedQueue();
  this.modalBox = get$$document().query("#modalmessages");
  this.message = get$$document().query("#message");
  this.score = get$$document().query("#score");
  this.playfield = get$$document().query("#playfield");
  this.level = get$$document().query("#level");
  this.remainingEnemies = get$$document().query("#remaining");
  this.highScore = get$$document().query("#highscore");
}
AlphabetInvasion.prototype.run = function() {
  var $this = this; // closure support
  this.resetGame();
  this.keyboardObservable = Observable.fromEvent(get$$window().get$on().get$keyPress());
  this.keyboardObservable.subscribe$1((function (e) {
    if ($eq$($this.gameState, const$0004)) {
      $this.hideMessage();
      $this.playLevel();
    }
  })
  );
  var hs = get$$window().localStorage.getItem(this.HIGH_SCORE_STORAGE_KEY);
  if (hs != null && !hs.isEmpty()) this.highScore.set$text(hs);
}
AlphabetInvasion.prototype.playLevel = function() {
  var $this = this; // closure support
  if (this.generator != null) this.generator.dispose();
  var title = const$0031.getKeys().filter$1((function (k) {
    return k.contains$1($this.currentLevel.toString());
  })
  ).iterator().next$0();
  var config = const$0031.$index(title);
  this.gameState = const$0032;
  this.level.set$text(this.currentLevel.toString());
  this.showMessage(title);
  function play() {
    $this.hideMessage();
    var enemiesThisLevel = (($this.currentLevel * (2)) + (13));
    $this.remainingEnemies.set$text(enemiesThisLevel.toString());
    var capitalLetterProbability = (1) - (($this.currentLevel * (2.5)) / (100));
    var killed = (0);
    var allEnemiesLaunched = false;
    $this.gameloop = Observable.timer(config.$index($this.CURRENT_SPEED), (-1)).subscribe$1((function (__) {
      return $this.updatePlayfield();
    })
    );
    $this.keyboard = $this.keyboardObservable.subscribe$1((function (e) {
      if ($this.enemies.isEmpty()) return;
      if (e.get$charCode() == $this.enemies.first().get$text().charCodeAt((0))) {
        var enemy = $this.enemies.removeFirst();
        $this.killEnemy(enemy);
        $this.remainingEnemies.set$text((enemiesThisLevel - ++killed).toString());
        if ($this.enemies.isEmpty() && allEnemiesLaunched) {
          $this.nextLevel();
        }
      }
    })
    );
    $this.generator = Observable.randomInt((0), (25), config.$index($this.LAUNCH_RATE), config.$index($this.LAUNCH_RATE), enemiesThisLevel).apply((function (v) {
      return Math.random() <= capitalLetterProbability ? "abcdefghijklmnopqrstuvwxyz"[$sub$(v, (1))] : "abcdefghijklmnopqrstuvwxyz"[$sub$(v, (1))].toUpperCase();
    })
    ).subscribe$2((function (v) {
      return $this.launchNewEnemy(v);
    })
    , (function () {
      return allEnemiesLaunched = true;
    })
    );
  }
  Observable.timer((2500), (1)).subscribe$1((function (_) {
    return play();
  })
  );
}
AlphabetInvasion.prototype.nextLevel = function() {
  var $this = this; // closure support
  if (this.currentLevel == (15)) this.youWin();
  this.gameState = const$0034;
  this.gameloop.dispose();
  this.generator.dispose();
  this.keyboard.dispose();
  this.showMessage(("Level " + this.currentLevel + " Complete"));
  this.currentLevel++;
  Observable.timer((4000), (1)).subscribe$1((function (_) {
    return $this.playLevel();
  })
  );
}
AlphabetInvasion.prototype.youWin = function() {
  var $this = this; // closure support
  if ($eq$(this.gameState, const$0034)) return;
  this.gameState = const$0034;
  this.gameloop.dispose();
  this.generator.dispose();
  this.keyboard.dispose();
  this.showMessage("You win this time Earthling!  We'll be back!");
  Observable.timer((5500), (1)).subscribe$1((function (_) {
    return $this.resetGame();
  })
  );
}
AlphabetInvasion.prototype.youLose = function() {
  var $this = this; // closure support
  if ($eq$(this.gameState, const$0034)) return;
  this.gameState = const$0034;
  this.gameloop.dispose();
  this.generator.dispose();
  this.keyboard.dispose();
  this.enemies.forEach((function (enemy) {
    if ($ne$(enemy, $this.enemies.first())) {
      enemy.set$text(":P");
      enemy.get$classes().add("rotate");
      enemy.get$style().set$fontSize((72));
    }
  })
  );
  this.showMessage("You Lose Earthling.  Prepare to be alphabetized!");
  Observable.timer((4500), (1)).subscribe$1((function (_) {
    return $this.resetGame();
  })
  );
}
AlphabetInvasion.prototype.killEnemy = function(enemy) {
  enemy.get$style().set$color("Red");
  enemy.set$text("@");
  enemy.get$style().set$fontSize((48));
  var v = this.getTopValue(enemy);
  this.addToScore(($sub$($globals.AlphabetInvasion_playfieldDimensions.get$bounding().get$height(), v)) * this.currentLevel);
  Observable.timer((750), (1)).subscribe$1((function (_) {
    return enemy.remove();
  })
  );
}
AlphabetInvasion.prototype.updatePlayfield = function() {
  var $this = this; // closure support
  var factor = ($globals.AlphabetInvasion_playfieldheight / (200)).ceil();
  Observable.fromList(this.enemies.get$dynamic()).subscribe$1((function (enemy) {
    var newPos = ($this.getTopValue(enemy) + factor);
    enemy.get$style().set$top(newPos);
    if (newPos >= $globals.AlphabetInvasion_playfieldheight + (44)) $this.youLose();
  })
  );
}
AlphabetInvasion.prototype.getTopValue = function(e) {
  return Math.parseInt(e.get$style().get$top().toString().replaceAll("px", ""));
}
AlphabetInvasion.prototype.launchNewEnemy = function(v) {
  var r = (Math.random() * (100) + (155)).toInt();
  var g = (Math.random() * (100) + (155)).toInt();
  var b = (Math.random() * (100) + (155)).toInt();
  var l = _ElementFactoryProvider.Element$tag$factory("div");
  l.get$classes().add("enemy");
  l.get$style().set$color(("rgb(" + r + "," + g + "," + b + ")"));
  l.set$text(v);
  l.get$style().set$top($globals.AlphabetInvasion_playfieldDimensions.get$bounding().get$top());
  l.get$style().set$left(Math.random() * ($globals.AlphabetInvasion_playfieldDimensions.client.width - (25)));
  this.enemies.add(l);
  this.playfield.get$elements().add(l);
}
AlphabetInvasion.prototype.addToScore = function(amount) {
  var newScore = (Math.parseInt(this.score.get$text()) + amount);
  this.score.set$text(newScore.toString());
  if (newScore > Math.parseInt(this.highScore.get$text())) {
    this.highScore.set$text(newScore.toString());
    get$$window().localStorage.setItem(this.HIGH_SCORE_STORAGE_KEY, newScore.toString());
  }
}
AlphabetInvasion.prototype.resetGame = function() {
  var $this = this; // closure support
  this.gameState = const$0004;
  this.showMessage("");
  this.currentLevel = (1);
  this.score.set$text("0");
  this.level.set$text("1");
  this.remainingEnemies.set$text("");
  this.clearPlayfield();
  this.updatePlayfieldHeight();
  if (this.windowHeight != null) this.windowHeight.dispose();
  if (this.generator != null) this.generator.dispose();
  if (this.matcher != null) this.matcher.dispose();
  if (this.gameloop != null) this.gameloop.dispose();
  if (this.keyboard != null) this.keyboard.dispose();
  this.windowHeight = Observable.fromEvent(get$$window().get$on().get$resize()).subscribe$1((function (_) {
    return $this.updatePlayfieldHeight();
  })
  );
  this.showMessage("PRESS ANY KEY TO START");
}
AlphabetInvasion.prototype.updatePlayfieldHeight = function() {
  var $this = this; // closure support
  this.playfield.get$rect().then((function (r) {
    $globals.AlphabetInvasion_playfieldDimensions = r;
    $globals.AlphabetInvasion_playfieldheight = r.client.top + r.client.height;
  })
  );
}
AlphabetInvasion.prototype.clearPlayfield = function() {
  this.enemies.forEach((function (e) {
    return e.remove$0();
  })
  );
  this.enemies.clear();
}
AlphabetInvasion.prototype.showMessage = function(msg) {
  var $this = this; // closure support
  if (msg.length == (0)) {
    this.message.set$text("");
    return;
  }
  this.modalBox.get$style().set$opacity("1");
  Observable.timer((30), msg.length).subscribe$1((function (v) {
    var $0;
    return ($this.message.set$text(($0 = msg.substring((0), v))), $0);
  })
  );
}
AlphabetInvasion.prototype.hideMessage = function() {
  this.modalBox.get$style().set$opacity("0");
}
// ********** Code for GameState **************
function GameState(_str) {
  this._str = _str;
}
// ********** Code for top level **************
function main() {
  new AlphabetInvasion().run();
}
// 271 dynamic types.
// 295 types
// 24 !leaf
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
(function(){
  var v0/*SVGTextPositioningElement*/ = 'SVGTextPositioningElement|SVGAltGlyphElement|SVGTRefElement|SVGTSpanElement|SVGTextElement';
  var v1/*SVGAnimationElement*/ = 'SVGAnimationElement|SVGAnimateColorElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGSetElement';
  var v2/*SVGComponentTransferFunctionElement*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement';
  var v3/*SVGGradientElement*/ = 'SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement';
  var v4/*SVGTextContentElement*/ = [v0/*SVGTextPositioningElement*/,'SVGTextContentElement|SVGTextPathElement'].join('|');
  var v5/*HTMLHtmlElement*/ = 'HTMLHtmlElement|SVGDocument';
  var v6/*HTMLMediaElement*/ = 'HTMLMediaElement|HTMLAudioElement|HTMLVideoElement';
  var v7/*SVGElement*/ = [v1/*SVGAnimationElement*/,v2/*SVGComponentTransferFunctionElement*/,v3/*SVGGradientElement*/,v4/*SVGTextContentElement*/,'SVGElement|SVGAElement|SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGCircleElement|SVGClipPathElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGForeignObjectElement|SVGGElement|SVGGlyphElement|SVGGlyphRefElement|SVGHKernElement|SVGImageElement|SVGLineElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGMissingGlyphElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTitleElement|SVGUseElement|SVGVKernElement|SVGViewElement'].join('|');
  var v8/*CharacterData*/ = 'CharacterData|Comment|Text|CDATASection';
  var v9/*DocumentFragment*/ = 'DocumentFragment|ShadowRoot';
  var v10/*Element*/ = [v5/*HTMLHtmlElement*/,v6/*HTMLMediaElement*/,v7/*SVGElement*/,'Element|HTMLElement|HTMLAnchorElement|HTMLAppletElement|HTMLAreaElement|HTMLBRElement|HTMLBaseElement|HTMLBaseFontElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLContentElement|HTMLDListElement|HTMLDetailsElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFormElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|IntentionallyInvalid|HTMLIFrameElement|HTMLImageElement|HTMLInputElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLSelectElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement'].join('|');
  var v11/*AbstractWorker*/ = 'AbstractWorker|SharedWorker|Worker';
  var v12/*Node*/ = [v8/*CharacterData*/,v9/*DocumentFragment*/,v10/*Element*/,'Node|Attr|HTMLDocument|DocumentType|Entity|EntityReference|Notation|ProcessingInstruction'].join('|');
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['AbstractWorker', v11/*AbstractWorker*/]
    , ['AudioParam', 'AudioParam|AudioGain']
    , ['CSSValueList', 'CSSValueList|WebKitCSSTransformValue']
    , ['CharacterData', v8/*CharacterData*/]
    , ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList']
    , ['HTMLHtmlElement', v5/*HTMLHtmlElement*/]
    , ['DocumentFragment', v9/*DocumentFragment*/]
    , ['HTMLMediaElement', v6/*HTMLMediaElement*/]
    , ['SVGAnimationElement', v1/*SVGAnimationElement*/]
    , ['SVGComponentTransferFunctionElement', v2/*SVGComponentTransferFunctionElement*/]
    , ['SVGGradientElement', v3/*SVGGradientElement*/]
    , ['SVGTextPositioningElement', v0/*SVGTextPositioningElement*/]
    , ['SVGTextContentElement', v4/*SVGTextContentElement*/]
    , ['SVGElement', v7/*SVGElement*/]
    , ['Element', v10/*Element*/]
    , ['Entry', 'Entry|DirectoryEntry|FileEntry']
    , ['EntrySync', 'EntrySync|DirectoryEntrySync|FileEntrySync']
    , ['Node', v12/*Node*/]
    , ['EventTarget', [v11/*AbstractWorker*/,v12/*Node*/,'EventTarget|DOMApplicationCache|EventSource|MessagePort|Notification|SVGElementInstance|WebSocket|DOMWindow|XMLHttpRequest|XMLHttpRequestUpload'].join('|')]
    , ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection']
    , ['SVGStylable', 'SVGStylable|SVGFilterPrimitiveStandardAttributes']
    , ['UIEvent', 'UIEvent|CompositionEvent|KeyboardEvent|MouseEvent|SVGZoomEvent|TextEvent|TouchEvent|WheelEvent']
    , ['Uint8Array', 'Uint8Array|Uint8ClampedArray']
  ];
  $dynamicSetMetadata(table);
})();
//  ********** Globals **************
function $static_init(){
  $globals._firstMeasurementRequest = true;
  $globals._DefaultObserver__hashNum = (0);
  $globals._ReceivePortImpl__nextFreeId = (1);
  $globals._nextMeasurementFrameScheduled = false;
  $globals.AlphabetInvasion_playfieldheight = (0);
}
var const$0000 = Object.create(_DeletedKeySentinel.prototype, {});
var const$0001 = Object.create(NoMoreElementsException.prototype, {});
var const$0002 = Object.create(EmptyQueueException.prototype, {});
var const$0003 = Object.create(UnsupportedOperationException.prototype, {_message: {"value": "", writeable: false}});
var const$0004 = Object.create(GameState.prototype, {_str: {"value": "paused", writeable: false}});
var const$0005 = Object.create(ObservableException.prototype, {message: {"value": "Invalid milliseconds value.", writeable: false}});
var const$0007 = Object.create(ObservableException.prototype, {message: {"value": "Parameter 'next' must be a Function f(n) or an IObserver.", writeable: false}});
var const$0010 = Object.create(_SimpleClientRect.prototype, {left: {"value": (0), writeable: false}, top: {"value": (0), writeable: false}, width: {"value": (0), writeable: false}, height: {"value": (0), writeable: false}});
var const$0011 = Object.create(IllegalAccessException.prototype, {});
var const$0012 = ImmutableList.ImmutableList$from$factory([]);
var const$0013 = Object.create(EmptyElementRect.prototype, {client: {"value": const$0010, writeable: false}, offset: {"value": const$0010, writeable: false}, scroll: {"value": const$0010, writeable: false}, bounding: {"value": const$0010, writeable: false}, clientRects: {"value": const$0012, writeable: false}});
var const$0015 = Object.create(NotImplementedException.prototype, {});
var const$0016 = ImmutableList.ImmutableList$from$factory([(60), (1300)]);
var const$0017 = ImmutableList.ImmutableList$from$factory([(55), (1200)]);
var const$0018 = ImmutableList.ImmutableList$from$factory([(50), (1100)]);
var const$0019 = ImmutableList.ImmutableList$from$factory([(50), (1000)]);
var const$0020 = ImmutableList.ImmutableList$from$factory([(45), (800)]);
var const$0021 = ImmutableList.ImmutableList$from$factory([(40), (650)]);
var const$0022 = ImmutableList.ImmutableList$from$factory([(35), (500)]);
var const$0023 = ImmutableList.ImmutableList$from$factory([(30), (450)]);
var const$0024 = ImmutableList.ImmutableList$from$factory([(25), (400)]);
var const$0025 = ImmutableList.ImmutableList$from$factory([(20), (400)]);
var const$0026 = ImmutableList.ImmutableList$from$factory([(15), (350)]);
var const$0027 = ImmutableList.ImmutableList$from$factory([(11), (350)]);
var const$0028 = ImmutableList.ImmutableList$from$factory([(9), (350)]);
var const$0029 = ImmutableList.ImmutableList$from$factory([(7), (350)]);
var const$0030 = ImmutableList.ImmutableList$from$factory([(5), (350)]);
var const$0032 = Object.create(GameState.prototype, {_str: {"value": "playing", writeable: false}});
var const$0033 = Object.create(NullPointerException.prototype, {});
var const$0034 = Object.create(GameState.prototype, {_str: {"value": "stopped", writeable: false}});
var const$0035 = Object.create(ObservableException.prototype, {message: {"value": "Parameter \"high\" must be > parameter \"low\"", writeable: false}});
var const$0036 = Object.create(ObservableException.prototype, {message: {"value": "Parameter \"intervalHigh\" must be > parameter \"intervalLow\"", writeable: false}});
var const$0037 = Object.create(ObservableException.prototype, {message: {"value": "timer interval parameters must be >= 1", writeable: false}});
var const$0039 = new JSSyntaxRegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
var const$0031 = _constMap(["Level 1 - Rookies", const$0016, "Level 2 - Tenderfoots", const$0017, "Level 3 - Militia", const$0018, "Level 4 - Privates", const$0019, "Level 5 - Corporals", const$0020, "Level 6 - Sergeants", const$0021, "Level 7 - Master Sergeants", const$0022, "Level 8 - Lieutenants", const$0023, "Level 9 - Captains", const$0024, "Level 10 - Majors", const$0025, "Level 11 - Colonels", const$0026, "Level 12 - Generals", const$0027, "Level 13 - Special Forces", const$0028, "Level 14 - Black Ops", const$0029, "Level 15 - Ninjas", const$0030]);
startRootIsolate(main);
